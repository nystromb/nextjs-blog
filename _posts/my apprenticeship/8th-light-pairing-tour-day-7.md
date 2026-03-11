---
title: "Pairing Tour: Day 7"
date: "2016-03-16"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "Jumping into Android development paired with a Bluetooth device — learning to test with Robolectric and Mockito, and getting introduced to Screaming Architecture."
---

Today I started pairing on a new project I haven't been on throughout my pairing tour. I'm excited because It's mainly a Android application that also communicates with a bluetooth device. I was always interested in both the software and the hardware side of things, so working on this is extremely interesting. Previously, before coming to 8th Light, mobile applications is something I have taken a keen interest on. While I have had some experience creating some Android applications, but they were either hobby projects or school projects. However, today I got to see what it's like to work on a professionally developed mobile application.

Since I started my apprenticeship, I didn't get too much time to create mobile apps, but I did get a good introduction to developing an iOS application when I worked with a another apprentice on a project. One thing that was especially interesting about today was that I had to learn a little bit about testing Android applications, which is something I haven't done before. Using roboelectric and mockito was easy ways to make to stub out methods. However, roboelectric really slows down your test suite, but once it gets up and running, your tests are executed at a reasonable pace. Because of this, you should use caution and think whether you really need to use this framework for a certain test case.

Another thing that I learned about was a way of structuring packages bigger applications. If you are familiar with web applications and used many frameworks like ASP.NET or Rails, you have probably heard of Model-View-Controller (MVC). There is another application structure I was introduced to today, called [Screaming Architecture](https://blog.8thlight.com/uncle-bob/2011/09/30/Screaming-Architecture.html). This way of structing your application tells the person looking at the structure about what things that it does, as opposed to MVC where you have generic package of Models or View or Controllers. This doesn't really tell you too much about what's going on, so you'd have to dive into the code to be able to know what's going on.

Overall, today was pretty fun. Although I was a little rusty on my Android since I haven't worked with it in a while, it was refreshing to get back into it. Tomorrow I will have the opportunity to spend another day on this project, and I'm looking forward to contributing more!
