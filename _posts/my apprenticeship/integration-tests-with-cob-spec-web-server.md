---
title: "How I Tested A Web Server That I Built From Scratch"
date: "2015-11-19"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "Lessons learned building an HTTP server in Java from scratch and testing it against the Cob Spec test suite — including when to write spike code and how to pick the right design patterns."
---

Over the past few weeks I have been working on implementing an HTTP server in Java, which is being tested against the Cob Spec test suite. If you read my last blog post on TDD, I mentioned that this was something that was pretty unknown to me in many ways. Although I have some experience with sending requests to a server and receiving response data in return, I never really looked to how the [HTTP Protocol](https://sourcemaking.com/design_patterns) works in complete detail. With that said, while working through some of my issues, I realized some important things that I should know more about and work on in regards to my development process.

One of the first issues that I had to understand in order to get started was to understand how Cob Spec is interacting with my server. Basically, Cob Spec will act as a client who will send requests to your server. The way it works is that it will use values that are formatted into a human readable table to test against the response that your server should send back. It is not an exhaustive test of the entire HTTP protocol, but it will force you to be pretty familiar with it. The tests are informative enough to know the bare requirements to pass the test, if you actually take the time to understand what it means. Below is an example of a Cob Spec test table:

![Cob Spec Test](/images/cob-spec-test.png)

To break it down a little bit, the test table basically says that it will start up the browser client, connect to localhost on port 5000, and then it will send a GET request to the "/" path of your servers public directory. It then checks to make sure you send a 200 status code back to the client, meaning the request has been received and was successful.

Another problem I had was writing tests first for my server. The mindset that I had was so focused on the TDD process to the point where I felt I couldn't proceed with development. I quickly realized that when this happens that it's acceptable to write spike code and forget about the tests for a moment. Spike code is just experimental code you write to get something working and understand the problem at hand. When you understand your problem, you should throw out your spike code, and then begin writing tests to achieve the same functionality as your spike (and doing it better). Ideally, experimental code shouldn't be checked in to a repository, but if you need to, just put it on a new branch.

Once I had found a sense of direction with my code, it became easier to see how I could implement the next component that needs to be completed. However, as I began to get more and more tests passing, I was forced to choose from the [many design patterns](https://sourcemaking.com/design_patterns) to use in my server implementation.
