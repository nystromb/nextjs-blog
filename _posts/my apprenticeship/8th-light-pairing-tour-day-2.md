---
title: "Pairing Tour: Day 2"
date: "2016-03-08"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "Day two of the pairing tour on a CoffeeScript and C# project, wrestling with a mysterious Jenkins build failure that passed locally."
---

This is my second day on my pairing tour, and I am working on a different, but more familiar project. Today I worked on a project that is written in Coffeescript on the front end, that uses C# for it's back end. I felt a bit more comfortable on this project simply because before I started my pairing tour, I had already worked on some parts of this app for a month.

My pair and I didn't dive too deep into the code right away. Instead, in the morning we had to attend a IPM until about noon to talk about the stories that need to be completed for the sprint. It was simply talking about some particular stories and figuring out estimations for them. Admittedly, sometimes it's not the most exciting part of the day, but estimation and having goals for iterations are an extremely important to software development. As an apprentice however, it's always good to have experience with attending meetings for various projects, because they aren't always the same across projects.

After lunch we picked up a story and started coding. We just picked something that could be done easily before the end of the day. Things were going pretty well until we were trying to push our changes. The Jenkins build did not pass. It was weird because on our local machines our tests passed and the changes worked fine. So, since our Jenkins was running on a windows machine, we decided to bring out a Windows machine to attempt to reproduce the problem. As developers we primarily like to work on a Linux/Unix environment, so we had to do some configuring to get things working. We found out that our tests were running fine here, which seemed odd at the time. After some struggling we decided to call it a day and pick up on the problem the next day.

