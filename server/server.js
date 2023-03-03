import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message:'Its working, this is THE TEST',
    })
});

app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const temperature = req.body.temperature || 0.5;  
      const max_tokens = req.body.max_tokens || 100;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: parseFloat(temperature),
        max_tokens: parseInt(max_tokens),
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0

      })

      res.status(200).send({
        result: response.data.choices[0].text
      })
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

app.listen(5000, () => console.log('server is running on port http://localhost:5000'));


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    
<script>
    
$(document).ready(function () {
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

  $('#genre,#theme,#mood,#tempo').change(generatePrompt);

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

  $("#duration").slider({
    change: generatePrompt
  });

  $('#form').submit(function (event) {
    event.preventDefault();

    // Show the loader
    $('#loader').show();

    var prompt = $('#prompt').val();
    var temperature = $('#temperature').slider('value');
    var max_tokens = $('#max_tokens').slider('value');

    $.ajax({
      type: 'POST',
      url: '/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        prompt: prompt,
        model: 'text-davinci-003',
        temperature: parseFloat(temperature),
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0
      }),
      success: function (response) {
        // Hide the loader
        $('#loader').hide();

        $('#response').html(response.result.replace(/\n/g, '<br />'));
      }
    });
  });
});
</script>
