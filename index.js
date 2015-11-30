var fs = require('fs');
var watson = require('watson-developer-cloud');
var env    = require('node-env-file');

// Load .env environmental variables
env(__dirname + '/.env');

//var personality_insights = watson.personality_insights({
//  username: process.env.PERSONALITY_INSIGHTS_USERNAME,
//  password: process.env.PERSONALITY_INSIGHTS_PASSWORD,
//  version: 'v2'
//});
//
//fs.readFile('./data/darth-vader.txt', 'utf8', function(err, text) {
//  if (err) {
//    throw err;
//  } else {
//    personality_insights.profile(
//      {
//        text: text,
//        language: 'en'
//      },
//      function (err, response) {
//        if (err) {
//          console.log('Error: ', err);
//        } else {
//          console.log(JSON.stringify(response, null, 2));
//        }
//      }
//    );
//  }
//});
//
//var concept_expansion = watson.concept_expansion({
//  username: process.env.CONCEPT_EXPANSION_USERNAME,
//  password: process.env.CONCEPT_EXPANSION_PASSWORD,
//  version: 'v1-beta'
//});
//
//var params = {
//  seeds: ['jedi', 'Darth Vader', 'Millennium Falcon'],
//  dataset: 'star-wars',
//  label: 'Star Wars'
//};
//
//concept_expansion.expand(params, function (err, response) {
//  if (err) {
//    console.log('error:', err);
//  } else {
//    console.log(JSON.stringify(response, null, 2));
//  }
//});
//

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


var documentText = "A long time ago in a galaxy far, far away....\n It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. \nPursued by the Empire’s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy...";

concept_insights.accounts.getAccountsInfo({}, function(err, res) {
  if (err) {
    console.log("Error fetching account info: ", err);
  } else {
    createCorpus(res.accounts[0].account_id);
  }
});

function createCorpus(accountId) {
  var corpusName = "/corpora/" + accountId + "/testCorpus";

  concept_insights.corpora.createCorpus({
    corpus: corpusName,
    access: 'private'
  }, loadCorpus(corpusName));

  createDocument(corpusName, "testDocument");
}

var corpusName;

function loadCorpus(corpusName) {
  return function(err, res) {
    if (err) {
      console.log("Error loading corpus: ", err);
    } else {
      console.log("Corpus created");
      corpusName = corpusName;
      createDocument(corpusName, "testDocument");
    }
  };
}

function createDocument(corpusName, documentId) {
  console.log("Creating Document");
  concept_insights.corpora.createDocument({
    id: corpusName + "/documents/" + documentId,
    document: {
      label: 'Star Wars: A New Hope Crawl',
      parts: [
        {
          name: "Text part",
          "content-type": "text/plain",
          data: documentText
        }
      ]
    }
  }, documentCreated);
}

function documentCreated(err, res) {
  if (err) {
    console.log("Error creating document: ", err);
  } else {
    console.log("Document Created");
  }
}

conceptInsights.corpora.getRelatedDocuments(
  {
    corpus: corpusName,
    ids: [ /* extracted concept ids */ ]
  },
  function(err, data) {
    if (err) {
      console.log("Error searching related corpus documents: ", err);
    } else {
      // Handle results
    }
  }
);
