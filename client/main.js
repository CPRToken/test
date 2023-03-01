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
        $('#download-btn').removeClass('d-none'); // Show the download button
      }
      
    });
  });

  // Handle click event for the download button
  $('#download-btn').on('click', function() {
    const content = document.getElementById("response").innerHTML;
    const filename = "generated_post.txt";
    const filetype = "text/plain";

    // Create a blob with the text content
    const blob = new Blob([content], { type: filetype });

    // Create a temporary URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a link element with the URL and download attributes
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);

    // Append the link element to the document body
    document.body.appendChild(link);

    // Simulate a click event on the link element
    link.click();

    // Remove the link element from the document body
    document.body.removeChild(link);

    // Show the create post button
    $('#create-post-btn').removeClass('d-none');
  });

  // Handle click event for the create post button
  $('#create-post-btn').on('click', function() {
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
$(document).ready(function () {

  // ...

  // Handle click event for the download button
  $('#download-btn').on('click', function() {
    const content = document.getElementById("response").innerHTML;
    const filename = "generated_post.txt";
    const filetype = "text/plain";

    // Create a blob with the text content
    const blob = new Blob([content], { type: filetype });

    // Create a temporary URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a link element with the URL and download attributes
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);

    // Append the link element to the document body
    document.body.appendChild(link);

    // Simulate a click event on the link element
    link.click();

    // Remove the link element from the document body
    document.body.removeChild(link);

    // Show the create post button
    $('#create-post-btn').removeClass('d-none');
  });

  // Handle click event for the create post button
  $('#create-post-btn').on('click', function() {
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
