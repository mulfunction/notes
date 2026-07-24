# Standard Operating Procedure (SOP): Publishing Markdown Notes & Reports to GitHub Pages

**Project:** Custom Astro Content Hub  
**Repository Path:** `/home/muldan/Projects/web_apps/notes-hub`  
**GitHub Pages Target:** `https://<username>.github.io/notes/`  

---

## 1. Overview & Publishing Workflow

This site uses **Astro Content Collections** to compile Markdown (`.md`) and MDX (`.mdx`) files into static HTML pages.

Every time you commit and push to your `main` (or `master`) branch on GitHub, GitHub Actions will automatically:
1. Run `npm run build`
2. Generate static HTML files in `./dist/`
3. Publish your site to GitHub Pages automatically.

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
cd /home/muldan/Projects/web_apps/notes-hub
npm run dev
```
Open `http://localhost:4321/notes/` in your browser.

To verify the production build locally:
```bash
npm run build
npm run preview
```

---

## 5. One-Time GitHub Repository Setup

To connect this repository to your GitHub Pages:

1. Create a new repository on GitHub (e.g. named `notes`).
2. Push your local project code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Astro notes hub"
   git branch -M main
   git remote add origin git@github.com:<your-username>/notes.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings > Pages**.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. Your site will automatically build and publish to `https://<username>.github.io/notes/`!
