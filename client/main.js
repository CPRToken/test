 function generatePrompt() {
            var prompt = 'write a[genre][theme][mood]with a duration of [duration] [tempo]';
            var genre = $('#genre').val();
            var theme = $('#theme').val();
            var mood = $('#mood').val();
            var tempo = $('#tempo').val();
            var duration = $('#duration').slider('value');

            prompt = prompt.replace('[genre]', genre !== '' ? ' ' + genre + ' song ' : ' song ');

            prompt = prompt.replace('[theme]', theme !== '' ? 'about ' + theme + ' ' : '');

            prompt = prompt.replace('[mood]', mood !== '' ? 'and in a ' + mood + ' mood, ' : '');

            prompt = prompt.replace('[tempo]', tempo !== '' ? ' in a ' + tempo + ' tempo' : '');

            prompt = prompt.replace('[duration]', duration + ' minutes');

            $('#prompt').val(prompt.replaceAll('  ', ' '));
        }

        $(document).ready(function () {
            $('#genre,#theme,#mood,#tempo').change(generatePrompt);

          

            var duration_handle = $("#duration_handle");
            $("#duration").slider({
                min: 1,
                max: 4,
                value: 2.5,
                step: 0.5,
                create: function () {
                    duration_handle.text($(this).slider('value'));
                },
                slide: function (event, ui) {
                    duration_handle.text(ui.value);
                }
            });
          
          
          
          
            var maxTokensHandle = $("#max_tokens_handle");
            $("#max_tokens").slider({
                min: 100,
                max: 2048,
                value: 2048,
                step: 2,
                create: function () {
                    maxTokensHandle.text($(this).slider('value'));
                },
                slide: function (event, ui) {
                    maxTokensHandle.text(ui.value);
                }
            });

            var temperatureHandle = $("#temperature_handle");
            $("#temperature").slider({
                min: 0,
                max: 1,
                value: 0.5,
                step: 0.1,
                create: function () {
                    temperatureHandle.text($(this).slider('value'));
                },
                slide: function (event, ui) {
                    temperatureHandle.text(ui.value);
                }
            });

            


            $("#duration").slider({
                change: generatePrompt
            });
  $('#form').submit(function (event) {
    event.preventDefault();
    const prompt = $('#prompt').val();
    const temperature = $('#temperature').val();
    const max_tokens = $('#max_tokens').val();
    
    $.ajax({
    type: 'POST',
  url: 'https://test-0lnl.onrender.com/',
  dataType: 'json',
  contentType: 'application/json',
  data: JSON.stringify({
    prompt: prompt,
    temperature: temperature,
    max_tokens: max_tokens
      },
     success: function(response) {
    $('#response').html(response.result.replace(/\n/g, '<br />'));
      }
      
error: function(jqXHR, textStatus, errorThrown) {
    console.log('Error:', errorThrown);



      
    });
  });
});
