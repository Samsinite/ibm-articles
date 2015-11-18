Keep Consumer Trust While Delivering Deep Insights
=========================

Every day on the inter-webs, users are exposed to more and more customization and content targeting based off of historical usage, patterns, and communication. But consumers, especially older consumers, worry about their personal information and data falling into the hands of large corporations and government.  Yet, data from customers can be valuable and offer deeper insights about their personality and habits, providing an avenue for software to customize itself to the interests of each individual customer. Gaining consumer insights while maintaining their trust and respecting their privacy, can provide both a competitive advantage and reduce the risk of private customer data accidentally falling into the wrong hands.

In this article, we will talk about how to utilize Watson's Services to help gain deep insights from customers, while discussing techniques that can increase information security and reduce risk of private data falling into the wrong hands.

## Watson Services
The IBM Watson Developer Cloud offers developers a sophisticated set of services for gaining deep insights around an applications users. The Personality Insights API, Concept Expansion API, and the Concept Insights API allow developers to rapidly design and develop applications that can combine user data to make deterministic and educated decisions around  users personality and interests.

The [Personality Insights service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html) can help businesses have advanced insights into the characteristics and needs of its clients. By providing the service with text to analyze, it will infer personality and social characteristics using three types of information: personality traits (code-named "Big 5", intrinsic needs, and values in general. These insights can be invaluable in helping increase customer retention, procurement, engagement, and conversion.

For example, using Node.JS and the `watson-developer-cloud` sdk, examining quotes from Darth Vader can be done like so:

```js
var fs = require('fs');
var watson = require('watson-developer-cloud');
	
var personality_insights = watson.personality_insights({
  username: '<your-username>',
  password: '<your-password>',
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
```

For brevity the personality insights response of these quotes can be seen here. Also, for better statistical analysis, the Personality Insights service recommends to use a minimum of 3,500 words, and preferably at least 6,000. When analyzing the Darth Vader quotes, many different personality traits, needs, and values are identified, along with a "percentage" (actually more of a ratio), and sampling error.

The [Concept Expansion service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-expansion.html) expands upon familiar concept sets to learn about and identify similar and additional terminology that users didn't know existed. Using seed lists, this service runs a fast pattern-matching algorithm that  grows an initial set of similar terminology to a larger and more expanded set of terminology. For example, starting with the following terms: *x-men*, *spider man*, *the incredible hulk*. The Personality Insights API can discover related terms such as: *avengers*, *star wars*, *uncanny x-force*, and more. This service is best suited for scenarios in which there is unstructured text, such as notes, customer feedback, email, and other less-formal communications that doesn't always contain well-formed language.

Communicating with the Concept Expansion service can be done in a similar fashion to the Personality Insights service:

```js
var fs = require('fs');
var watson = require('watson-developer-cloud');

var concept_expansion = watson.concept_expansion({
  username: '<your-username>',
  password: '<your-password>',
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
```

As expected, the Concept Expansion service returned Star Wars related terminology such as: *vader*, *luke skywalker*, *princess leia*, *chewbacca*, and more.

The [Concept Insights service](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-insights.html) enables applications to identify associations related to concepts contained inside of text documents. Once concepts have been computed and stored by the Concept Insight service, they can be later used to search other documents to identify other ideas that are conceptually related. This allows developers to build applications that can display rich and insightful navigation and analysis systems for documents.

Finally, the Concept Insights service can be used inside of a Node.JS application like so:

```js
var fs = require('fs');
var watson = require('watson-developer-cloud');

var concept_insights = watson.concept_insights({
  username: '<your-username>',
  password: '<your-password>',
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
```

This example code asks Watson to identify concepts that are present in the Star Wars related text that was provided, such as: "Darth Vader", "Death Star", "Return of the Jedi", and "Emperor (band)".

## Collecting Data
Using cognitive services to gather insights about users can only be successful if the appropriate data is collected and analyzed. Data such as e-commerce navigation and purchase history, social media activity, comments and reviews, and e-mail communication can contain data that when analyzed can provide deep insight into a users personality and social characteristics, and provide better context around optimizing and targeting the users ideal application usage. It is often easiest to start by determining what insights would be most helpful for the software to identify.

In online public event management systems, users are often trying to find events that match their interests, but do not want to search through the other thousands of upcoming events, and would prefer to have events be automatically filtered based off of their interests. By connecting to users social networking accounts, upcoming events could then be filtered by analyzing past social media posts and likes for related interests. The filtered content could then be analyzed even further by occasionally prompting customers to answer surveys in an attempt to find associated interests.

In an online e-commerce site, while browsing through products, users could be shown related inventory that is commonly purchased by other users who also showed interested in a similar product. E-commerce product reviews could also be analyzed to provide further insight. Negative product review feedback could be automatically analyzed to detect notify vendors of potential issues with some of their products. A similar strategy could benefit customers as well. By analyzing negative product feedback, customers could be alerted about alternative products that have positive reviews around the concepts that have been identified by the customer as inadequate during the review.

In customer service software, the system could also process customer issues to try to automatically detect related issues and when possible, alert the user of existing solutions to the problems that they are encountering before a representative is able to respond. Similarly issues could also be analyzed, and automatically increase visibility when related issues are reported more frequently.

## Informed Consent
Before collecting user data, it is important to notify users about any data that might be collected, data that will be collected, and data that will not be collected. It is also important to express to users how the system will be using their data for computational analysis and why. Requiring user consent before collecting and analyzing user information is equally important. Users will be thankful for the clear transparency surrounding their data, and consent can also protect entities from potential legal trouble.

Before requesting consent from customers though, it is important that all informed consent is clear and transparent. If informed consent is difficult or complex for the user to evaluate, it could mean that that user did not completely understand the implications of their consent, and render the consent invalid. There can also be a degree to which parts of the consent can only be inferred based upon previous knowledge, or observation. Thus, having well written and clear consent forms can build customer trust and protect business liability.

## Anonymize Data
The best method for protecting stored user  information and data is by anonymizing as much data as possible. If there is a data breach, anonymous data cannot be linked back to any specific customer. For example, storing information associated with searches can be useful to later provide insights about the data or documents being searched, but recording who is actually searching through the data can often times provide little value and could be storing information about the user that they considered private and personal. Depending on the system, if that data was somehow leaked, hacked or stolen, it could put some users in a bit of a pickle that they otherwise assumed was kept private or hidden.

## Store Insights, Not Details
Immediately transforming user data into insights can also protect the private of a systems users. This provides applications with the user insight needed, and in the context that is most useful for the system to analyze. While details among the translated insight could still be considered private, data that the application finds useless can then be discarded. Not only does this strategy mask raw user information, but it also can be efficient and use less memory. For example, sites that ask users to complete surveys in an attempt to gain further insight into their customers, can immediately discard all of the original survey answers once they have been processed. Once the original content has been discarded, less information is available that could potentially fall into the wrong hands.

Another strategy that can effectively limit storing user information can be done by analyzing customer information via services on demand. When user information can be temporarily accessed and maintained via services such as social networking, request temporary access tokens and use the requested data immediately without persisting any user content. Whenever possible, read or request private and personal data on demand, and instead let someone else worry about securely storing user information.

Not all data though can be protected by anonymizing the source, or by immediately processing into insights. Some data is always considered secure, no matter the context from which it was provided, such as credit cards, social security numbers, or security related information. When possible, it is important to avoid storing information that if stolen or compromised, could be used to cause great harm or inconveniences.

## Avoid the uncanny valley
While there is great power in using cognitive processing to gather user insights, doing too much with these insights can alienate users. A system that acts as if it knows the exact personality of it users can feel invasive and too personal. Users do not want to feel as if the system intimately understands them and knows about their personal life. This doesn't mean that the system should attempt to avoid learning about its users, but should instead avoid actions that make the user feel as if their comfort zone has been broken.

The audience for the application should be considered as well, as these boundaries can be fluctuate and change across various communities and users. Younger generations that have become more familiar with technology, could potentially feel more comfortable establishing more intimate relationships with applications than older generations. Communities in Europe could feel more comfortable filling out private online surveys than communities in Africa that have traditionally been exposed to less technology. Before deciding where to draw a line in the sand, research and understand the applications core users.

## Conclusion
In this article, we briefly looked at how Watson's computing platform can help provide better user insight and analysis, and can be used to improve application functionality and efficiency. Next, we discussed methods for collecting user data, and clearly communicating with users the types of data that are being collected. We then discussed strategies that can help protect collected information. Finally, we discussed how to avoid alienating users by doing too much with these insights.