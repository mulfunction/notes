# Standard Operating Procedure (SOP): Publishing Markdown Notes & Reports to Vercel

**Project:** Custom Astro Content Hub  
**Live Target Domain:** `https://notes.muldanhamid.com`  

---

## 1. Overview & Publishing Workflow

This site uses **Astro Content Collections** to compile Markdown (`.md`) and MDX (`.mdx`) files into static HTML pages, synced with Obsidian vault media.

Every time you commit and push to your `main` branch on GitHub, Vercel will automatically:
1. Trigger a production deployment build.
2. Run `npm run sync-obsidian` to copy Obsidian media files into `public/images/`.
3. Run `astro build` to generate static HTML files in `./dist/`.
4. Deploy the updated site live to **`https://notes.muldanhamid.com`**.

---

## 2. Adding a New Weekly Report

To publish a new weekly report:

1. Create a new `.md` file in `src/content/reports/`:
   ```bash
   src/content/reports/2026-w31-weekly-report.md
   ```
2. Add the required YAML frontmatter at the top of the file:
   ```yaml
   ---
   title: "Weekly Report #31 (August 2026)"
   description: "Summary of weekly deliverables and status updates."
   date: 2026-08-01
   weekNumber: 31
   category: "Weekly Report"
   tags: ["weekly-report", "status-update"]
   draft: false
   ---
   ```
3. Write your report in standard Markdown underneath the frontmatter block.

---

## 3. Adding a Tech Note or Guide

To publish a tech note, snippet, or architecture guide:

1. Create a new `.md` file in `src/content/notes/`:
   ```bash
   src/content/notes/my-new-tech-note.md
   ```
2. Add the YAML frontmatter:
   ```yaml
   ---
   title: "Understanding Micro-Frontend Architecture"
   description: "Key principles behind isolated micro-frontends and state sharing."
   date: 2026-08-02
   category: "Guides" # Choices: 'Notes' | 'Guides' | 'Thoughts'
   tags: ["architecture", "frontend", "web-dev"]
   draft: false
   featured: true # Set to true to highlight on home page
   ---
   ```

---

## 4. Local Preview & Testing

To run the site locally before pushing:

```bash
npm run dev
```
Open `http://localhost:4321/` in your browser.

To verify the production build locally:
```bash
npm run build
npm run preview
```

---

## 5. Vercel & GitHub Integration

This repository is connected directly to Vercel:

- **Repository:** `mulfunction/notes`
- **Branch:** `main`
- **Domain:** `notes.muldanhamid.com`

Any `git push origin main` automatically deploys the latest version to `https://notes.muldanhamid.com` without manual build commands!
