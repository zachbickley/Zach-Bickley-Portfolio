# Zach Bickley's E-Portfolio

A fast, clean personal portfolio site built with **HTML/CSS/JavaScript** and deployed on **GitHub Pages**.  
Includes a project gallery powered by a simple JSON file (`data/projects.json`) so adding projects is easy and consistent.

---

## Live Site
- GitHub Pages URL: `https://zachbickley.github.io/Zach-Bickley-Portfolio/`  

---

## Features
- Responsive layout (mobile + desktop)
- Dark/light theme toggle (saved in `localStorage`)
- Projects section generated from `data/projects.json`
- Project filters (CAD / Prototyping / Research / Software)
- Resume link (PDF)
- Contact form using `mailto:` (no backend required)

---

## Quick Start (Local)
Because the site loads `data/projects.json`, you should run a small local server (opening `index.html` directly may block fetch in some browsers).

### Option A: VS Code Live Server
1. Open this folder in VS Code
2. Install **Live Server**
3. Right click `index.html` → **Open with Live Server**

### Option B: Python
```bash
python -m http.server 8000
