---
title: "Getting Started Driving Your Code Through Tests"
date: "2015-10-28"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "How following the three laws of TDD transformed my approach to writing software — leading to better design, testable code, and the confidence to refactor freely."
---
When I started my apprenticeship at 8th Light, I only had a vague idea of what Test Driven Development was, which pretty much only amounted to: "Writing tests before you write code". Although this is a relatively simple concept, I still struggled trying to wrap my head around the idea of writing tests for code that isn't there yet. After reading [a helpful blog post](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd) and familiarizing myself with the three laws of TDD, I quickly became familiar of the enormous advantages of TDD by writing test after test. I have found that TDD forces you to take a step back and think about the problem you're trying to solve in smaller steps, which will ultimately lead you down a path to natural code evolution, better design, and testable code that you know works.

#### Think: Red, Green, Refactor

The TDD cycle involves three steps:

1. Writing just enough code to create a failing test
2. Writing the most simple thing that could possibly work in order to pass that test, even if you know the code isn't ideal.
3. Continously refactor and remove code smells, while still keeping your tests green.

When I started following TDD and writing tests, I started practicing on a program that I was already pretty familiar with, Tic Tac Toe, which made things easier since I had a concrete idea of what each component needed to do and their relationships between each other. On the other hand, when I started started writing tests for a Cob Spec HTTP Server, which was unfamiliar territory for me in many ways, I realized the importance of spending time early on thinking about how you can design your code so that it is testable. Because before writing a test, it helps to have a pretty solid idea of what requirements and functionality your system needs.

#### Writing Tests

Writing and structuring tests itself took me a little bit to understand at first, but it didn't really become clear to me until I paired with others to see the TDD cycle in action. Tests should be both independent of each other and, as a good rule of thumb, they should be written in a `"given (some input) -> when (something happens) -> expect (some value(s))"` type format. Some might call this the [BUILD-OPERATE-CHECK](https://blog.8thlight.com/micah-martin/2006/11/12/boc.html) test pattern. I find it always helps to see an actual example of what I'm talking about, so I provided a code snippet for how I tested some I/O in Java using JUnit:

```java
    @Test
    public void testIfPromptsForGameModeUponCreation() {
        //given a view
        view = new CommandLineInterface(new Scanner(), System.out);

        //when the application runs
        app = new GameApplication(view);

        //expect the output string to prompt the user for a game mode
        assertTrue(stream.toString().contains("Please select a game mode:"));
    }
```

#### Practice makes Perfect

So far during my apprenticeship at 8th Light I have practiced TDD by writing a Tic Tac Toe application. Each time I wrote the wrote the game, I attempted to take a different approach to testing. In my Ruby Tic Tac Toe implementation, I first started testing using more of a "London" style TDD approach, where I started writing tests based on the user interaction and mocking the I/O of my program. Then when I wrote it again in Java I used a more "Classic" TDD approach, where I started at a core component of my program that eventually brought myself to a solid design through tests. I went from numerous if-else statements, to loops, then created data structures and objects where I could. In both methods it was really interesting to see how my code progressed from bad to good using different approaches to TDD. If you are interested in the differences between these techniques, I would recommend reading [this blog post](http://codemanship.co.uk/parlezuml/blog/?postid=987).

Basically, TDD is a proven approach to writing "clean code that works", as Kent Beck explains in [TDD by Example](http://www.amazon.com/Test-Driven-Development-By-Example/dp/0321146530). By keeping your code tested, you will know your system always works and will immediately know if there is a problem with any portion of your program. This will reduce fear in changing any part of the code. Even though following TDD might slow you down, it will ultimately make your code better in the long run.
