# Standard Operating Procedure (SOP): Deploying to Vercel with `notes.muldanhamid.com`

## Overview
This document outlines the step-by-step procedure to connect and deploy the **Notes Hub** repository (`mulfunction/notes`) to **Vercel** under your custom domain `notes.muldanhamid.com`.

---

## 1. Project Configuration Summary

The repository has been updated for Vercel deployment:
- **Astro Config:** `site: 'https://notes.muldanhamid.com'` set in [`astro.config.mjs`](file:///c:/Users/ASUSC/Documents/Projects/notes/astro.config.mjs).
- **Base Path:** Removed `base: '/notes'` so all routes resolve directly at the domain root (`/`).
- **Obsidian Sync & Plugins:** Updated [`src/plugins/remark-obsidian.mjs`](file:///c:/Users/ASUSC/Documents/Projects/notes/src/plugins/remark-obsidian.mjs) and [`src/pages/rss.xml.ts`](file:///c:/Users/ASUSC/Documents/Projects/notes/src/pages/rss.xml.ts) to match the new root domain.

---

## 2. Vercel Project Setup Steps

### Step 1: Import Project into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Select your GitHub repository: `mulfunction/notes`.

### Step 2: Configure Framework Preset
- **Framework Preset:** `Astro` (Vercel will auto-detect this).
- **Build Command:** `npm run build` *(runs Obsidian sync + Astro build)*.
- **Output Directory:** `dist` *(default for Astro)*.
- Click **Deploy**.

---

## 3. Assign Custom Subdomain (`notes.muldanhamid.com`)

Since `muldanhamid.com` was purchased directly on Vercel:

1. In the Vercel Dashboard, navigate to your newly deployed project.
2. Go to **Settings** -> **Domains**.
3. Type `notes.muldanhamid.com` into the domain input box and click **Add**.
4. Vercel will automatically configure the DNS records and issue an SSL certificate (since the parent domain `muldanhamid.com` is hosted on Vercel DNS).

---

## 4. Verification Checklist

- [ ] Visit `https://notes.muldanhamid.com/` in your browser.
- [ ] Test navigation links (e.g., `/notes`, `/reports`, `/tags`).
- [ ] Confirm RSS feed loads at `https://notes.muldanhamid.com/rss.xml`.
- [ ] Check Obsidian internal wikilinks resolve correctly.
