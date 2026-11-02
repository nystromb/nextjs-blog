## NystromProjects Blog

A simple static blog built with Next.js and Markdown for publishing personal posts and grouped writing.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Purpose of this repository

This repo is a lightweight content-based blog. Posts live in `_posts` and are organized by folder and front matter, making it easy to keep writing without a database or CMS.

## Deploy a release

```bash
git checkout main
git pull
# make your changes and commit them
git tag v1.0.0
git push origin v1.0.0
```

This pushes the tag and triggers the GitHub Action.

## What the automation does

When a tag matching `v*` is pushed, the workflow automatically:

1. checks out the repo
2. installs dependencies
3. builds the static site
4. uploads the generated `out/` folder to the configured S3 bucket
5. invalidates CloudFront if a distribution ID is configured

This keeps deploys intentional and avoids deploying from every `main` push.

## Required GitHub repo variables

Set these in GitHub repository variables:

- `AWS_ROLE_ARN`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID` (optional)

Once those are set, creating and pushing a version tag is all that is needed to deploy.
