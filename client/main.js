$(document).ready(function () {
  $('#form').submit(function (event) {
    event.preventDefault();
    const prompt = $('#prompt').val();
    const temperature = $('#temperature').val();
    const max_tokens = $('#max_tokens').val();
    
    $.ajax({
      type: 'POST',
      url: '/api/completions',
      data: {
        prompt: prompt,
        temperature: temperature,
        max_tokens: max_tokens
      },
      success: function(response) {
        document.getElementById("response").innerHTML = response.result.replace(/\n/g, '<br />');
        $('#save-post').removeClass('d-none'); // Show the save post button
      }
    });
  });

  // Handle click event for the save post button
  $('#save-post').on('click', function() {
    const content = document.getElementById("response").innerHTML;

    // Send a POST request to the server to create a new post
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      data: { content: content },
      success: function(response) {
        console.log(response);
        alert('Post created successfully!');
      },
      error: function(error) {
        console.error(error);
        alert('Error creating post!');
      }
    });
  });
});
