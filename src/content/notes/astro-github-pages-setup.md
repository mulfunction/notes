---
title: "Publishing Astro to GitHub Pages: A Complete Guide"
description: "How to configure Astro base paths, custom domains, and GitHub Actions workflows for instant automated publishing."
date: 2026-07-22
category: "Guides"
tags: ["astro", "github-pages", "devops", "ci-cd"]
draft: false
featured: true
---

# Publishing Astro to GitHub Pages: A Complete Guide

Deploying an Astro static site to GitHub Pages is fast, reliable, and free. Here is the exact setup used for this site.

## 1. Configure `astro.config.mjs`

When deploying to `https://<username>.github.io/notes/`, you **must** configure the `site` and `base` options in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/notes', // Ensure internal links use import.meta.env.BASE_URL
});
```

## 2. Dynamic Base Path Links

In Astro templates, always prefix internal routes with `import.meta.env.BASE_URL`:

```astro
---
const baseUrl = import.meta.env.BASE_URL;
---

<a href={`${baseUrl}/reports`}>Weekly Reports</a>
```

## 3. GitHub Actions Deployment Workflow

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Enjoy zero-maintenance automated publishing!
