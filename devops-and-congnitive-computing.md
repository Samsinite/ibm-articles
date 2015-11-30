DevOps and Cognitive Computing
=======================

Software developers are no longer throwing their software over the wall to other departments to tested and run. Instead, they are testing their own code and deploying multiple times a day. These developers now demand that their application help provide deep insights into its operation. Using IBM's Watson services provides sophisticated cognitive computation systems can help developer and system engineers better understand performance and system constraints, as well as tame and analyze application logs for easier consumption, thus increasing efficiency and saving time and energy.

## Tradeoff Analytics for Performance Tradeoff Decisions

Watson's Tradeoff Analytics is an API centered around helping filter decisions when balancing multiple and conflicting objectives. The user identifies objectives and options, their preferences and priorities, and the service will apply mathematical filtering techniques to identify the top options available. The service can then generate smart visualizations that can help the user understand, compare, and explore their best tradeoffs before making a decision, saving crucial time and energy, and reducing the potential for mis-interpreting vast amounts data.


When designing software, performance choices often come down to a game of tradeoffs. Performance optimizations often have competing constraints instead of being strictly orthogonal, forcing engineers into making decisions that can have costly side-effects when mistakes are made. Watson's Tradeoff Analytics service can help developers identify the best tradeoffs when comparing multiple and conflicting performance choices, such as memory, disk space, network latency, and database response times. For example, constraints such as memory, disk space, network latency, and database response times can be examined by DevOps engineers to help them decide how to best optimize different systems or cloud instances.

With Node.JS, using the Tradeoff Analytics API is fairly straight forward. First, [create a bluemix account](https://console.ng.bluemix.net/registration) or [login to an existing account](https://console.ng.bluemix.net/home/auth/bluemix) and [create a new Tradeoff Analytics service](https://console.ng.bluemix.net/catalog/services/tradeoff-analytics/) Next, install the `watson-developer-cloud` library by running the following command inside of an existing Node.JS project in the terminal:

```
$ npm install --save-dev watson-developer-cloud
```

Then, include the `watson-developer-cloud` library in the application, and specify the authentication credentials obtained from the new Bluemix Tradeoff Analytics service:

```js
var watson = require('watson-developer-cloud');
 
var tradeoff_analytics = watson.tradeoff_analytics({
  username: '<username>',
  password: '<password>',
  version: 'v1'
});
```

Next, create a problem domain that follows the [Tradeoff Analytics API specifications](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/inout.shtml). Next, use the `tradeoff_analytics` service previously created to calls the dilemmas API with the problem set:

```js
tradeoff_analytics.dilemmas(params, function(err, results) {
  if (err) {
    // Handle Error
  } else {
    // Examine Results
  }
});
```

The output can then be read, and is formatted according to the [output specifications](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/inout.shtml#output) and the services analysis of each option in the context of the passed objectives can be examined. For the objectives that have the `generate_visualization` parameter set to true (minimum of 3 objectives), a two-dimensional map will be produced that contains the positioning of each option for the relative map.

The Tradeoff Analytics service also has a [widget library](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/client.shtml) that can used in the browser to provide an interactive and powerful interface that can be used to examine the output from the dilemmas API. This API requires a proxy from which to delegate calls through to the actual service. The proxy is required by the widget library to prevent exposing secret keys to your service. Creating a proxy using the express framework and the `watson-developer-cloud` SDK can be done like so:

```js
app.post('/api/dilemmas/', function(req, res) {
  tradeoff_analytics.dilemmas(req.body, function(err, dilemma) {
    if (err) 
      return res.status(Number(err.code) || 502).send(err.error || err.message || 'Error processing the request');
    else
      return res.json(dilemma);
  });
});
```

To use the widget library, first create a container to house the widget interface, then include the library into the desired HTML page:

```html
<body>
  <div id="widget-container"></div>
  <script type="text/javascript" src="http://ta-cdn.mybluemix.net/v1/TradeoffAnalytics.js"></script>
</body>
```

Next, initialize the client using the [constructor](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/client.shtml#constructor) inside your client side javascript file:

```js
var taClient = new TA.TradeoffAnalytics(
  { dilemmaServiceUrl: 'api/dilemmas' }, // path to proxy above
  'widget-container' // element div#widget-container above to display widget in
);
```

Now that the client service is initialized, start the client, create a new problem set, and request the desired [problem input set](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/tradeoff-analytics/inout.shtml#input) to be shown:

```js
function tradeoffAnalyticsStared() {
  
}
taClient.start(function() {
  var problemSet = // create problem set...
  
  taClient.show(problemSet, function() {
    // Results are ready, widget is updated, do any additional work.
  });
});
```

## Concept Expansion for Log File Analysis

Rarely anymore are applications composed of single services. Instead, most applications integrate and combine many different services and platforms together to help provide a superior product. Analyzing these logs individually is often difficult on its own. Analyzing logs between multiple integrations and services quickly becomes cumbersome and unwieldy. IBM's Watson Concept Expansion service can analyze concepts from one systems log and expand upon these concepts to help identify related terminology across other sets of logs on different platforms and services.

For the Concept Expansion service to be useful, the engineer must first identify terms or concepts that they are interested expanding. Without a good initial concept set from which to expand from, the service could return unexpected results or noise. 

After a good initial set of concepts have been created, communicating with the Concept Expansion service is quite simple. Using Node.JS and the `watson-developer-cloud` SDK, import the SDK and initialize the service with the applications provisioned credentials:

```js
var watson = require('watson-developer-cloud');
 
var concept_expansion = watson.concept_expansion({
  username: '<username>',
  password: '<password>',
  version: 'v1-beta'
});
```

Next, build an array of concepts, and request the service to expand upon these concepts:

```js

var initialConceptSet = [ ... ]; // Set of initial concepts to expand from

concept_expansion.expand(initialConceptSet, function (err, response) {
  if (err) {
    // Handle Errors
  } else {
    var results = JSON.stringify(response);
    
    // Proccess Results
  }
});
```

The results can then be processed and are formatted according to the [API documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/apis/#!/concept-expansion/result).

It can be hard to parse log files to easily identify concepts, but Watson's Concept Insight service can help. This service provides a graphs API that can identify and extract concepts, find concepts that relate to a set of provided concepts, and find labels related to a specified concept. It also provides a corpora API that allows its users to upload documents and build new graphs around uploaded documents. These documents are automatically indexed and annotated, allowing uploaded documents to be analyzed further, and be searched and compared for related concepts. 

Creating documents around the concepts that are included inside of log files can help increase the ability to identify and extract concepts contained inside of log text. Without uploading new documents, only the concepts identified in other public corpora can be used for concept insights. Uploading logs from multiple services can also help identify related concepts between two or more logs.

Though, before creating documents around log files, it is important to categorize, sort, and structure application log information. Uploading raw log data would likely be more detrimental than helpful, and it is best to structure content around specific subjects before uploading. This will allow the Concept Insights Corpora API to be used as it is intended thus be more beneficial to its user.

Using the Watson Concept Insights service is fairly straight forward using the `watson-developer-cloud` Node.JS SDK. Again, to begin, import and initialize the service with the application credentials:

```js
var concept_insights = watson.concept_insights({
  username: '<username>',
  password: '<password>',
  version: 'v2'
});
```

To analyze log text and identify concept mentions present in a piece of text, the [Concept Insights Graph API](https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2#!/graphs/annotateText) can be used like so:

```js

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
```

To analyze, compare, and search documents the [Concept Insights Corpora API](https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2#!/corpora) must be used. To start uploading new documents, first, query the account id, then, once complete, use the account id to create a new corpus:

```js
concept_insights.accounts.getAccountsInfo({}, function(err, res) {
  if (err) {
    console.log("Error fetching account info: ", err);
  } else {
    createCorpus(res.accounts[0].account_id);
  }
});
  
function createCorpus(accountId) {
  var corpusName = "/corpora/" + accountId + "/starwarsCrawls";

  concept_insights.corpora.createCorpus({
    corpus: corpusName,
    access: 'private'
  }, loadCorpus(corpusName));
}
``` 

Then, once the new corpus has be created, use it to upload a new document (an existing corpus can be used as well):

```js
var corpusName;

function loadCorpus(corpusName) {
  return function(err, res) {
    if (err) {
      console.log("Error loading corpus: ", err);
    } else {
      console.log("Corpus created");
      corpusName = corpusName; // Save corpus name for later use
      createDocument(corpusName, "newHopeCrawlDocument");
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
  }, function(err, res) {
    if (err) {
      console.log("Error creating document: ", err);
    } else {
      console.log("Document Created");
    }
  });
}
```

HTML and XWiki document parts can be analyzed as well.

Using the previously created corpus, and previously identified concept mentions, documents inside of the corpus can then be searched for conceptual relevance by using the [Concept Insight Corpora Conceptual Search API](https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2#!/corpora/conceptualSearch)):

```js
conceptInsights.corpora.getRelatedDocuments(
  {
    corpus: corpusName,
    ids: [
    	/* Extracted concept ids
    	 * Example id: "/graphs/wikipedia/en-20120601/concepts/Watson_(computer)"
    	 * See https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2#!/graphs/annotateText
    	 * or the example above for details on identifying concepts in text.
    	 */
    ]
  },
  function(err, data) {
    if (err) {
      console.log("Error searching related corpus documents: ", err);
    } else {
      // Handle results
    }
  }
);
```

The Tradeoff Analytics, Concept Expansion, and Concept Insights services can be valuable assets for developers and system engineers. These services provide functionality that can be used to examine system and software constraints, and be used to find related concepts across many different systems. Furthermore, the Concept Insights service can extract new concepts, build document graphs, and search and compare documents for related concepts, and text. As a result, using Watson cognitive computing systems can help development and operations engineers gain further insight into the stability and efficiency of their systems, thus become more productive  and build more scalable systems. 