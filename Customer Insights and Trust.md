Keep Consumer Trust While Delivering Deep Insights
=========================

Every day on the interwebs, users are exposed to more and more customization and content targeting based off of historical usage, patterns, and communication. But consumers, especially older consumers, worry about their personal information and data falling into the hands of large corporations and government.  Yet, data from customers can be valuable and offer deeper insights about their personality and habits, providing an avenue for software to customize itself to the interests of each individual customer. Gaining consumer insights while maintaining their trust and respecting their privacy, can provide both a competitive advantage and reduce the risk of private customer data accidentally falling into the wrong hands.

In this article, we will talk about how to utilize Watson's Services to help gain deep insights from customers, while discussing techniques that can increase information security and reduce risk of private data falling into the wrong hands.

## Watson Services
The IBM Watson Developer Cloud offers developers a sophisticated set of services for gaining deep insights around an application's users. The Personality Insights API, Concept Expansion API, and the Concept Insights API allow developers to rapidly design and develop applications that can combine user data to make deterministic and educated decisions around  users personality and interests.

The [Personality Insights service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html) can help businesses have advanced insights into the characteristics and needs of its clients. By providing the service with text to analyze, it will infer personality and social characteristics using three types of information: personality traits (code-named "Big 5", intrinsic needs, and values in general. These insights can be invaluable in helping increase customer retention, procurement, engagement, and conversion.

Using Node.JS and the [Watson Developer Cloud SDK](https://github.com/watson-developer-cloud/node-sdk), lets create an example script that uses the Personality Insights service to analyze user data from twitter to generate insights based off of the user's last 200 tweets. Before starting to write code, we must initialize a new node application, and install the dependent libraries that will be used.

First, open the terminal, navigate the new project directory, run `$ npm init`, and walk through the initial `package.json` setup.

Next, install the required libraries:

```sh
$ npm install --save watson-developer-cloud
$ npm install --save twitter
```

Then, create the `index.js` file, include the dependent libraries, and initialize them with the required credentials:

```js
var watson = require('watson-developer-cloud');
var Twitter = require('twitter');

var personality_insights = watson.personality_insights({
 username: '<personality insights username>',
 password: '<personality insights password>',
 version: 'v2'
});

var twitterClient = new Twitter({
  consumer_key: '<twitter consumer key>',
  consumer_secret: '<twitter consumer secret>',
  access_token_key: '<application access token key>',
  access_token_secret: '<application access token secret>'
});
```

Credentials for the Watson Personality Insights service can be obtained by [creating a new bluemix account](https://console.ng.bluemix.net/registration) or [logging to an existing account](https://console.ng.bluemix.net/home/auth/bluemix), and then [creating a new Personality Insights service](https://console.ng.bluemix.net/catalog/services/personality-insights/). After the Tradeoff Analytics services has been created, credentials for the new service can be view by selecting the created service from the dashboard, and then clicking on the "Service Credentials" tab.

[Insert Personality Insights Credentials Image]

Next, setup the twitter API arguments to query the last 200 tweets from a username that is passed in via command line arguments, and create a function that uses these arguments to pull down these tweets.

```js
function getLast200Tweets(callback) {
  var params = { screen_name: process.argv[2], count: 200 };

  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      callback(tweets.map(function(tweet) { return tweet.text; }));
    } else {
      console.log('Error: ', tweets);
    }
  });
}
```

Then, create another routine that handles the personality insight response, and prints out the personality insights.

```js
function outputPersonality(insightsResp) {
  insightsResp.tree.children.forEach(function(personalityChild) {
    console.log('#### ', personalityChild.name);
    personalityChild.children.forEach(function(child) {
      console.log(' - ', child.name, ' ', Math.floor(child.percentage * 100), '%');

      if (child.children) {
        child.children.forEach(function(subChild) {
          console.log('   - ', subChild.name, ' ', Math.floor(subChild.percentage * 100), '%');
        });
      }
    });
  });
}
```

Finally, tie the previous code together by calling the `getLast200Tweets` routine that upon success communicates with the Personality Insights API, then calls the `outputPersonality` function created above to process and output the final results.

```js
getLast200Tweets(function(tweets) {
  var text = tweets.join('\n');

  personality_insights.profile(
    {
      text: text,
      language: 'en'
    },
    function (err, response) {
      if (err) {
        console.log('Error: ', err);
      } else {
        outputPersonality(response);
      }
    }
  );
});
```

For better statistical analysis, the Personality Insights service recommends to use a minimum of 3,500 words, and preferably at least 6,000. After analyzing the user's twitter quotes, many different personality traits, needs, and values are identified, along with a "percentage" (actually more of a ratio), and sampling error. An example Output of the script can be seen below.

```sh
$ node index.js "IBMWatson"

####  Big 5
 -  Openness   95 %
   -  Openness   95 %
   -  Conscientiousness   83 %
   -  Extraversion   16 %
   -  Agreeableness   5 %
   -  Emotional range   9 %
####  Needs
 -  Liberty   4 %
   -  Challenge   17 %
   -  Closeness   9 %
   -  Curiosity   4 %
   -  Excitement   5 %
   -  Harmony   5 %
   -  Ideal   19 %
   -  Liberty   4 %
   -  Love   5 %
   -  Practicality   5 %
   -  Self-expression   47 %
   -  Stability   6 %
   -  Structure   17 %
####  Values
 -  Self-enhancement   94 %
   -  Conservation   38 %
   -  Openness to change   31 %
   -  Hedonism   6 %
   -  Self-enhancement   94 %
   -  Self-transcendence   25 %
```

The Watson [Concept Expansion service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-expansion.html) expands upon familiar concept sets to learn about and identify similar and additional terminology that users didn't know existed. Using seed lists, this service runs a fast pattern-matching algorithm that  grows an initial set of similar terminology to a larger and more expanded set of terminology. For example, starting with the following terms: *x-men*, *spider man*, *the incredible hulk*. The Personality Insights API can discover related terms such as: *avengers*, *star wars*, *uncanny x-force*, and more. This service is best suited for scenarios in which there is unstructured text, such as notes, customer feedback, email, and other less-formal communications that doesn't always contain well-formed language.

Using the Watson Concept Expansion service, let's create another console based application that accepts input concepts, and outputs expanded concepts that could be later used for further analysis. Similar to before, open the terminal and navigate to a new project directory. Then run $ npm init, and walk through the initial package.json setup. After walking through the package.json setup, run `$ npm install --save watson-developer-cloud`.

Again, we need to initialize a new [Concept Expansion service using Bluemix](https://console.ng.bluemix.net/catalog/services/concept-expansion/) and access the new credentials. Now, create the `index.js` application file, and setup the service with the new credentials.

```js
var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
 username: process.env.CONCEPT_EXPANSION_USERNAME,
 password: process.env.CONCEPT_EXPANSION_PASSWORD,
 version: 'v1-beta'
});
```

Next, snag the input arguments, create the request data, and expand upon the concept set. After the concept set has expanded, then output the resulting data to the console.

```
var initialiConceptSet = process.argv.slice(2);

var params = {
  seeds: initialiConceptSet.slice(1),
  dataset: 'example-batch',
  label: initialiConceptSet[0]
};

concept_expansion.expand(params, function (err, response) {
  if (err) {
    console.log('error:', err);
  } else {
    console.log("#### Results");
    response.return_seeds.forEach(function(expandedConcept) {
      console.log(expandedConcept.result, ' ', Math.floor(expandedConcept.prevalence * 100), '%');
    });
  }
});
```

An example output of the above application should look similar to the following:

```sh
$ node index.js "Sam's Profile" "web" "sofware development" "Node.JS" "Ruby"

#### Results
frontend   64 %
web application framework   63 %
php frameworks   61 %
web framework   61 %
jifty   60 %
jruby   59 %
refinerycms   59 %
building web applications   59 %
php/mysql   59 %
( x)html   59 %
;} coveo   59 %
python   59 %
rails app   59 %
web application   58 %
net ajax   58 %
nettuts   58 %
net web   58 %
ruby programming language   58 %
javabridge   58 %
language bindings   58 %
```

Finally, the Watson [Concept Insights service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-insights.html) enables applications to identify associations related to concepts contained inside of text documents. Once concepts have been computed and stored by the Concept Insight service, they can be later used to search other documents to identify other ideas that are conceptually related. This allows developers to build applications that can display rich and insightful navigation and analysis systems for documents.

Let's modify the previous twitter application to also retrieve concepts from merged tweets. For the last example, we again need to initialize another service. Create a new [Concept Insights service using Bluemix](https://console.ng.bluemix.net/catalog/services/concept-insights/) and access the new credentials similar to before. Then initialize the service inside of the javascript code as show below.

```js
var concept_insights = watson.concept_insights({
  username: '<concept insights username>',
  password: '<concept insights password>',
  version: 'v2'
});
```

Finally, reuse the `getLast200Tweets` routine from before to combine the tweet results into a series of text. Then call the [graphs annotate text](https://watson-api-explorer.mybluemix.net/apis/concept-insights-v2#!/graphs/annotateText) endpoint with the initialize twitter text and output the results to the console.

```js
getLast200Tweets(function(tweets) {
  var params = {
    graph: '/graphs/wikipedia/en-latest',
    text: tweets.join("\n")
  };

  // Retrieve the concepts for input text
  concept_insights.graphs.annotateText(params, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      var topConcepts = res.annotations.filter(function(concept) {
        return concept.score > 0.75;
      });

      var topConceptStrings = topConcepts.map(function(concept) {
        return concept.concept.label + ' at ' + concept.text_index[0] + ' - ' + concept.text_index[0];
      });

      console.log(topConceptStrings.join("\n"));
    }
  });
});
```
Results from running the code above, should look similar to the output below.

```sh
$ node index.js "IBMWatson"
...
Twitter at 5325 - 5325
Watson (computer) at 7402 - 7402
Watson (computer) at 7540 - 7540
Watson (computer) at 15102 - 15102
Watson (computer) at 10638 - 10638
Internet of Things at 31 - 31
Internet of Things at 47 - 47
...
```

## Collecting Data
Using cognitive services to gather insights about users can only be successful if the appropriate data is collected and analyzed. Data such as e-commerce navigation and purchase history, social media activity, comments and reviews, and e-mail communication can contain data that when analyzed can provide deep insight into a user's personality and social characteristics, and provide better context around optimizing and targeting the users ideal application usage. It is often easiest to start by determining what insights would be most helpful for the software to identify.

In online public event management systems, users are often trying to find events that match their interests, but do not want to search through the other thousands of upcoming events, and would prefer to have events be automatically filtered based off of their interests. By connecting to users social networking accounts, upcoming events could then be filtered by analyzing past social media posts and likes for related interests. The filtered content could then be analyzed even further by occasionally prompting customers to answer surveys in an attempt to find associated interests.

In an online e-commerce site, while browsing through products, users could be shown related inventory that is commonly purchased by other users who also showed interested in a similar product. E-commerce product reviews could also be analyzed to provide further insight. Negative product review feedback could be automatically analyzed to detect notify vendors of potential issues with some of their products. A similar strategy could benefit customers as well. By analyzing negative product feedback, customers could be alerted about alternative products that have positive reviews around the concepts that have been identified by the customer as inadequate during the review.

In customer service software, the system could also process customer issues to try to automatically detect related issues and when possible, alert the user of existing solutions to the problems that they are encountering before a representative is able to respond. Similarly issues could also be analyzed, and automatically increase visibility when related issues are reported more frequently.

## Informed Consent
Before collecting user data, it is important to notify users about any data that might be collected, data that will be collected, and data that will not be collected. It is also important to express to users how the system will be using their data for computational analysis and why. Requiring user consent before collecting and analyzing user information is equally important. Users will be thankful for the clear transparency surrounding their data, and consent can also protect entities from potential legal trouble.

Before requesting consent from customers though, it is important that all informed consent is clear and transparent. If informed consent is difficult or complex for the user to evaluate, it could mean that that user did not completely understand the implications of their consent, and render the consent invalid. There can also be a degree to which parts of the consent can only be inferred based upon previous knowledge, or observation. Thus, having well written and clear consent forms can build customer trust and protect business liability. 

Before finalizing customer consent forms though, it is crucial to obtain legal consultation. Legal advice and professional advice can help create user consent forms follow local and national laws.

## Anonymize Data
The best method for protecting stored user information and data is by anonymizing as much data as possible. If there is a data breach, anonymous data cannot be linked back to any specific customer. For example, storing information associated with searches can be useful to later provide insights about the data or documents being searched, but recording who is actually searching through the data can often times provide little value and could be storing information about the user that they considered private and personal. Depending on the system, if that data was somehow leaked, hacked or stolen, it could put some users in a bit of a pickle that they otherwise assumed was kept private or hidden.

## Store Insights, Not Details
Immediately transforming user data into insights can also protect the private of a systems users. This provides applications with the user insight needed, and in the context that is most useful for the system to analyze. While details among the translated insight could still be considered private, data that the application finds useless can then be discarded. Not only does this strategy mask raw user information, but it also can be efficient and use less memory. For example, sites that ask users to complete surveys in an attempt to gain further insight into their customers, can immediately discard all of the original survey answers once they have been processed. Once the original content has been discarded, less information is available that could potentially fall into the wrong hands.

Another strategy that can effectively limit storing user information can be done by analyzing customer information via services on demand. When user information can be temporarily accessed and maintained via services such as social networking, request temporary access tokens and use the requested data immediately without persisting any user content. Whenever possible, read or request private and personal data on demand, and instead let someone else worry about securely storing user information.

Not all data though can be protected by anonymizing the source, or by immediately processing into insights. Some data is always considered secure, no matter the context from which it was provided, such as credit cards, social security numbers, or security related information. When possible, it is important to avoid storing information that if stolen or compromised, could be used to cause great harm or inconveniences.

## Avoid the uncanny valley
While there is great power in using cognitive processing to gather user insights, doing too much with these insights can alienate users. A system that acts as if it knows the exact personality of it users can feel invasive and too personal. Users do not want to feel as if the system intimately understands them and knows about their personal life. This doesn't mean that the system should attempt to avoid learning about its users, but should instead avoid actions that make the user feel as if their comfort zone has been broken.

The audience for the application should be considered as well, as these boundaries can be fluctuate and change across various communities and users. Younger generations that have become more familiar with technology, could potentially feel more comfortable establishing more intimate relationships with applications than older generations. Communities in Europe could feel more comfortable filling out private online surveys than communities in Africa that have traditionally been exposed to less technology. Before deciding where to draw a line in the sand, research and understand the applications core users.

## Conclusion
In this article, we briefly looked at how Watson's computing platform can help provide better user insight and analysis, and can be used to improve application functionality and efficiency. Next, we discussed methods for collecting user data, and clearly communicating with users the types of data that are being collected. We then discussed strategies that can help protect collected information. Finally, we discussed how to avoid alienating users by doing too much with these insights.
