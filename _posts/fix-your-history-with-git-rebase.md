---
title: "Fixing your History with Git Rebase"
date: "2016-03-01"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/tim.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
excerpt: "A practical guide to git rebase — from moving local commits to the branch head, to using interactive rebase to squash, reword, and clean up your commit history."
---

Sometimes you make mistakes when you make commits, I mean, we're only human after all. And after a long day of coding, your eyes will tend to over look things that shouldn't have been committed to your GitHub. Luckily the `git rebase` command is a powerful tool built into git that allows you to alter your commit history. Be aware though, this could be dangerous if you are working on projects with other people, but I'll talk more about that later.

Running the command `git rebase` without any options allows you to move local commits to the head of a branch. For example, lets say that you checked out a project at some commit, made some changes, and are ready to push up to master branch. However, while you were making these changes, somebody else came in and pushed some changes to the master branch before you could. Now there's a conflict because there's commits in the master branch that you don't have locally. This is where you would use `git rebase` to move the commits that you have locally on top of the newest changes in the branch.

### Rebasing Interactively

The `rebase` command optionally has a `-i` or `--interactive` flag where you can interactively rebase your history starting from the `HEAD` to a certain commit in your history. This allows you to do many things like `pick`, `squash`, even change the messages or entirely delete commits in your history. Lets see how we can actually rebase interactively.

To rebase interactively you need to know how far back you would like to go in your commit history using `git log`. You can specify a specific commit to go back to or go back n number of commits by specifying `HEAD~n`. Keep in mind though that if you decide to choose a specific commit, it is not inclusive of that commit, so you will have to choose the commit before the one you actually want to go back to.

Once you know which commit you want to go back to, just run:

`git rebase -i HEAD~3`

Once you do that, you will see something like the following in your text editor:

```text
    pick f7f3f6d fixed a small typo
    pick 310154e made a big refactor
    pick a5f4a0d added some file

    commands:
    #  p, pick = use commit
    #  r, reword = use commit, but edit the commit message
    #  e, edit = use commit, but stop for amending
    #  s, squash = use commit, but meld into previous commit
    #  f, fixup = like "squash", but rdiscard this commit's log message
    #  x, exec = run command (the rest of the line) using shell
    #
    # These lines can be re-ordered; they are executed from top to bottom.
    #
    # If you remove a line here THAT COMMIT WILL BE LOST.
    #
    # However, if you remove everytheing, the rebase will be aborted.
    #
    # Note that empty commits are commented out
```

The nice thing is that when you rebase interactively, it provides documentation on what to do. So if you're new to this command, it will guide you through what will happen when you change this file. Once command that I use all the time is the `squash` command. Often times I'll find a small change or typo that doesn't deserve it's own commit or needs to be added to a previous change that I missed. Although you could `--amend` a commit, the `rebase` command would be used for when you have already pushed the change to the remote branch. So, to merge two commits, you would simply change the following:

```text
    pick f7f3f6d fixed a small typo
    s 310154e made a big refactor
    pick a5f4a0d added some file
```

This would merge the small typo commit with the big refactor into a single commit. After closing the file, another file would open up showing both commit messages. `git` doesn't know which commit message to have, so it will ask you which one to have or you can optionally supply a new commit message if needed. Again, when this file opens up, it will also have nice messages like what is shown to help guide you. Now after you specify a commit message, save the file, and push back to the remote, your history will be forever changed.

These small mistakes should be avoided as much as possible, but sometimes things happen. To avoid having to rebase, especially on the master branch, you should always do your work on another branch and have somebody else look over your code to catch any mistakes that you may have missed before moving code into the master branch.
