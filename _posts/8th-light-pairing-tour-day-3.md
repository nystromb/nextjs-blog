---
title: "Pairing Tour: Day 3"
date: "2016-03-09"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/tim.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "Back on the Clojure travel app for a productive day tackling autocomplete features and complex SQL JOIN queries using Korma."
---

Today I am back on the travel app that I previously worked on a couple days ago. This time I worked with another craftsman on the team on another portion of the app. But I felt more confident that I could make more better contribututions to the stories that needed to get done this time around. It ended up being really productive and we completed many stories.

Unlike on Monday, we didn't do much on the front end. In the morning we worked on a feature where we had to create a custom autocomplete feature for one of the form inputs. Previously I have worked with some autocomplete libraries before, but this time the work had to be done without any more libraries. The solution for this story ended up being pretty straight forward, all we had to do is make a simple SQL call to get certain information. Much of the funcationality was there already, but we just had to change the way it worked in certain conditions.

Once we were done with that, we got working on a bigger story where the database calls were more complicated. Prior to coming to 8th Light I only knew how to make simple `SELECT` and `INSERT` statements. Since this was a big app with multiple tables, we had to `JOIN` statements and think about optimizing our SQL statements and reduce the amount of times we have to look something up in the database. Using Korma for Clojure made it really easy and high level.

After working a couple days on a Clojure application, I've been really appreciating Clojure what it is. It seems to be pretty expressive, assuming you have good naming conventions and it also allows one to work with low level things in databases at a higher level.
