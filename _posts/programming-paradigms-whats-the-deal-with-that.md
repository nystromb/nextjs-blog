---
title: "Programming Paradigms? What's the deal with that?!"
date: "2016-01-21"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/tim.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "A comparison of imperative and functional programming paradigms — using Java and Clojure examples to explore mutability, expressions, and when each approach shines."
---


Recently I have been introduced to the interesting world of the functional programming by learning how to program in Clojure. Functional programming is an entirely different paradigm than it's imperative counterpart, it's good to know what they are useful for. If you are used to thinking about your code in classes and objects, like me, learning a functional language might challenge the way you think, in a good way.

In the Imperative programming paradigm, you will have classes that encapsulate data fields, which then gets modified using methods that the classes define. By changing the data fields, these objects are mutable. Since most of my experience in Java, this is what I have been used to.

On the other hand, functional languages work quite differently, given the fact that functional languages generally avoid containing mutable data, and instead operate by performing a series of mathematical transformations on data.

Learning to think in a "functional" way might take some getting used to, but after spending some time learning Clojure, I'm starting to force myself to approach problems a little differently. In the functional paradigm everything is essentially a ...function, and every expression has a return value. This results in a file that contains many micro functions.

 I find that it helps to see the difference through a simple example, by trying to write a function in both an imperative language, like Java, and a functional one, like Clojure. Below I have created a function that will add all the numbers starting from 0 to a given number:

```clojure
    (defn add-up-to [n]
      (reduce + (range n)))

    user=> (add-up-to 3)
    3
```

To do the same thing in Java, you would do something like this:

```java
    public int addUpTo(int num) {
      int sum = 0;

      for (int i = 0; i < num; i++) {
        sum += i;
      }

      return sum;
    }

    System.out.println(addUpTo(3));
    => 3
```


You'll notice that in the Java example, you must set the variables `sum` and `i` in order to loop through the given number. On the other hand, in the Clojure example, you'll see that it is short and seemingly simple, but I'll explain a bit of whats happening there anyway. First you'll probably notice all the parentheses, but this just basically says in what order things are evaluated in. In this function, you pass in a number, and based on that it returns the sum of every number up to that number. In order to do this, it uses 3 functions: `range`, `reduce`, and `+`. First it will get a list of ranges from in, like so:

```clojure
    user=> (range 3)
    (0 1 2)
```

Then it will use a reduce function, which takes two parameters, a function and a collection. So I pass it the `+` function and a range of values `(0 1 2)` and uses the `+` on each of those numbers and returns the result of applying + to every number in the list.

I think that functional programming has it's place in distributed, concurrent systems. By creating immutable data structures, you won't run into certain bugs that will be caused by accessing some shared state. One benefit I have come to realize of an imperative style approach is that thinking of objects makes your software act like it is a real life object. For example, in a Tic Tac Toe game, you might have a `Board` object that during the course of the game, the board changes, until some end game condition. If you were using a functional approach, you might want to return a new game every time you want to call the function to put a move on the board.

I have highlighted some of the main differences of both of these programming paradigms. In one example, you don't save any data, just input -> transform -> output, while the other was longer and contained some stored variables. It's long debated whether one is better than the other, but I think they have their specific applications, and you should always use the right tool for the job. However, one of the best things about the beauty of Clojure is that it allows for Java interop. That means the Clojure can actually use Java classes to perform functions. This sort of hybrid-OO language makes for a extremely powerful language.
