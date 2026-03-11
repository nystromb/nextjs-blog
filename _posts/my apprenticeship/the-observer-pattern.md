---
title: "The Observer Pattern: To Observe Or Not To Observe"
date: "2016-02-04"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "A walkthrough of the Observer design pattern — understanding Subjects and Observers, how they relate to MVC, and how to wire them together in a Java application."
---


In my time as a developer, pretty much all of the applications that I have created has had some type of user viewable result, whether it was a basic terminal screen, a web page, or the display on a clock. The Observer pattern is a pattern that I've begun to find use for in many of my applications. The Observer pattern is a behavior design pattern that is used in cases where you have one or many "Observer" objects that are notified when another class changes state. The Observer Pattern is a good pattern to understand because it is a pattern that can be used in many GUI applications, and it's a key part in the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) architecture that is used in many web frameworks.

The main goal of the Observer pattern is to focus on one core component of your application that may need to notify other components of your system of any changes in it's state. In the observer pattern, the objects being notified are called the "Observers" and the object that does the notifying is called the the Subject. To implement this pattern, you need to identify and understand these two things in your application:

**1. The Subject**

The Subject can be thought of as the meat of your application. This is the part of your application where your core logic and data is stored that runs in your application. In the context of a tic tac toe application, a class called `Board` might be considered the Subject, because it would be the class that knows about the state of the board. To picture this better, I will provide a sample of what this `Subject` abstraction should look like:

```java
   public class Subject {
        List<Observers> listOfObservers = new List();

        public void addObserver(Observer observer) {
            listOfObservers.add(observer);
        }

        public void notifyObservers(Object object) {
            for(Observer observer : listOfObservers) {
                observer.update(object);
            }
        }
    }

```

The `Subject` abstraction simply holds a list of observers, and when `notifyObservers(Board board)` is called, it simply loops through each observer in the list and calls update on every Observer.

```java
    public class Board extends Subject {
        String[] board = new String[8];

        public void makeMove(int space, String piece) {
            board[space] = piece;
            notifyObservers(this);
        }
    }
```

Given the example of a Tic Tac Toe game, the board is changed whenever somebody makes a move. So naturally, whenever `makeMove()` is called, it should notify the Observers that it has changed state. Also there may be many different Observers that all handle the `Board` object differently.

**2. The Observer(s)**
The Observers, which are the view components in many GUI applications, is simply a visual representation of the Subject. An example observer in a tic tac toe game might be a class called `TerminalView` that is notified when the `Board` changes. In Java, an observer object would be implemented by use of an interface which specifies a single method with the signature `void update(Object object)`.

An `Observer` interface might look like:

```java
    public interface Observer {
        void update(Object object);
    }
```

Since using an interface leaves it up to the concrete class that is implementing the `Observer` interface to to handle how a `Board` is updated, you can have multiple views to update the `Board` in different ways. For example:

```java
    public class TerminalView implements Observer {

        public void update(Board board) {
          //logic that displays three spots and a newline
        }
    }
```

The `TerminalView` class prints displays the board in a way that works for a Command Line view.

```java
    public class HTMLView implements Observer {

        public void update(Board board) {
          //logic that displays the board in a way that adds HTML markup
        }
    }
```

The `HTMLView` displays the board in a way that adds proper HTML to display it on a web page.

Having different implementations of your view objects makes it easy add new views. In my Tic Tac Toe application, I currently only use something akin to the `TerminalView`, but If I ever wanted to add a Java Swing GUI, It would be as simple as adding the view to the Subject  and displaying the board

### Bringing it Together

 Once you have these components identified and created, you must explicitly register the `Observer` to the `Subject` in the application level of your program.

```java
   public class Application {
        public void main(String [] args) {
            Board board = new Board();
            Observer view = new TerminalView();

            board.addObserver(view);

            board.makeMove(1, "X");
            board.makeMove(2, "O");
        }
    }
```


Now that the board has an observer, and when we call `makeMove()` on the board, the board should automatically update the view object to display the board.

In the implementation I have provided, nothing is triggering the change in the `Board` object besides explicit calls to `makeMove`, which doesn't make for a very exciting program. This is where the idea of Model-View-Controller comes in to play. The `Subject` and `Observable` objects would be akin to the Model and View respectively in Model-View-Controller. Ideally, there would be some kind of additional controller object comes in to play here, which takes input from the user of the application in order to trigger the change in the Subject (model), and in turn, updates the view.
