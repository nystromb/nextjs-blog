## NystromProjects Blog

A simple Next.js blog for writing and organizing posts in Markdown.

## Run it

```bash
npm install
npm run dev
```

## Post organization

Posts live in `/_posts`.

- Files directly in `_posts/` are ungrouped.
- Files inside a folder like `_posts/my apprenticeship/` become a named group.
- The homepage shows:
  - a `Latest` section with the newest 2 posts
  - grouped sections next
  - a fallback `See more` section for ungrouped posts

## Front matter

Example:

```yaml
---
title: "My Post"
date: "2026-11-02"
excerpt: "A short summary"
author:
  name: Brian Nystrom
  picture: /assets/blog/authors/brian.jpeg
coverImage: /assets/blog/preview/cover.jpg
ogImage:
  url: /assets/blog/preview/cover.jpg
groupRank: 1
---
```

Notes:

- `groupRank` is optional and controls group ordering.
- Lower numbers sort earlier.
- Ungrouped posts stay last.

## Adding a post

Create a Markdown file under `/_posts` or in a subfolder. The filename becomes the slug, and the folder name becomes the group label.

## Build

```bash
npm run build
```
