## Summary
Software developers are no longer throwing their software over the wall to other departments to be tested and run. They are testing and deploying their own code multiple times a day. These developers now demand their applications provide deep insights into their own operation. Learn how Watson’s cognitive services can provide insights to help developers test and maintain critical code in the cloud.

This article will start by exploring how Watson’s Tradeoff Analytics can help make decision around application performance. By feeding conflicting constraints into Tradeoff Analytics such as host memory, disk space, network latency, and database response times, DevOps engineers can decide how optimizing one constraint affects the others in regards to cloud instance performance.

The next technique the article covers is using Watson’s Concept Expansion to understand activity in server application logs. In many DevOps environments, logs from multiple applications built on different platforms are compiled into a single log store such as S3 or Elasticsearch. Concept Expansion can help DevOps engineers link one platform’s log terminology to another’s and simplify analysis about what is actually happening in the system. Concept Expansion can also parse user-provided input to detect possible malicious intent against the system.

Outline:

        Introduction
        Tradeoff Analytics for Performance Tradeoff Decisions
        Concept Expansion for Log File Analysis
        Summary
--------------------------------------




DevOps and Cognitive Computing
=======================

Software developers are no longer throwing their software over the wall to other departments to tested and run. Instead, they are testing their own code and deploying multiple times a day. These developers now demand that their application help provide deep insights into its operation.