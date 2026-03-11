---
title: "Pairing Tour: Day 4"
date: "2016-03-10"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "A day of front-end CoffeeScript work, fixing a phone number formatting bug, and going down a rabbit hole setting up an Android emulator to reproduce a mobile issue."
---

Today I go back to working on front-end stuff on the same team that I worked with on Tuesday, so I'm basically back into Coffeescript land for today.

The morning was basically spent doing the daily routine stand up. My pair wanted to finish something up quickly before picking up a new story, so we went to work on that. The issue was pretty basic and it took only a short while to fix it and push the changes. The problem ended up being that we were concatenating something to a string when we really needed to create a new string.

After this we were asked for help on a particular piece of code that another member of the team wasn't very familiar on. So then we spent a good amount of the day attempting to add and make sure a new end point for this application works. We were running into issues being able to build this project after adding the new end point. Eventually, after trying it out on various environments, we got something to work and everything was good again.

We only had a couple hours left of the work day, so we went ahead and pulled another card that we thought we could get completed by the time we left. This was a story that had a bug that didn't format phone numbers correctly in a form in a form. Since we weren't familiar with the code base, we had to do some digging to be able to understand the code that was causing the issue and find a way to reproduce the problem.

The problem that was reported was on mobile device, we had some problems trying to replicat the issue. At first, we tried to just make the browser view height and width to be the same as the problem device, but that didn't work either. Then I suggested that we get an Android device emulator using Android Studio. We both agreed that this seemed like a little much considering the problem. We had to download, install, and get working an emulator. So, before doing all that, we decided to ask other members of the team if there was a simpl way to reproduce this issue so that we could fix the problem and also demo it to make sure that it is fixed. However, after some time waiting, we just decided to try it, but without many issues getting Android Virtual Device installed. This took up a lot of our time, so we had to end the day for the story to be picked up th next day.
