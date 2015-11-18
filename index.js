var fs = require('fs');
var watson = require('watson-developer-cloud');
var env    = require('node-env-file');

// Load .env environmental variables
env(__dirname + '/.env');

var personality_insights = watson.personality_insights({
  username: process.env.PERSONALITY_INSIGHTS_USERNAME,
  password: process.env.PERSONALITY_INSIGHTS_PASSWORD,
  version: 'v2'
});

fs.readFile('./data/darth-vader.txt', 'utf8', function(err, text) {
  if (err) {
    throw err;
  } else {
    personality_insights.profile(
      {
        text: text,
        language: 'en'
      },
      function (err, response) {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log(JSON.stringify(response, null, 2));
        }
      }
    );
  }
});

var concept_expansion = watson.concept_expansion({
  username: process.env.CONCEPT_EXPANSION_USERNAME,
  password: process.env.CONCEPT_EXPANSION_PASSWORD,
  version: 'v1-beta'
});

var params = {
  seeds: ['jedi', 'Darth Vader', 'Millennium Falcon'],
  dataset: 'star-wars',
  label: 'Star Wars'
};

concept_expansion.expand(params, function (err, response) {
  if (err) {
    console.log('error:', err);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
});

var concept_insights = watson.concept_insights({
  username: process.env.CONCEPT_INSIGHTS_USERNAME,
  password: process.env.CONCEPT_INSIGHTS_PASSWORD,
  version: 'v2'
});

var params = {
  graph: '/graphs/wikipedia/en-latest',
  text: "Darth Vader kills the Emperor by throwing him down the Death Star's reactor shaft in \"Return of the Jedi\"."
};

// Retrieve the concepts for input text
concept_insights.graphs.annotateText(params, function(err, res) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(JSON.stringify(res, null, 2));
  }
});
