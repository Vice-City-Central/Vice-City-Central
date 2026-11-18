# Vice City Central

Vice City Central is an independent, fan-made GTA V and GTA VI fan hub and a personal web-development project. It is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive.

## What is here

- A responsive, neon-inspired home dashboard with original CSS artwork
- GTA V and GTA VI overview pages
- Searchable character profiles for five protagonists
- A five-question quiz with a locally saved personal best and a shareable result challenge
- Practical guides and a sourced GTA VI launch briefing
- Links to official Rockstar trailers and clearly labeled independent coverage
- A persistent color-theme switch, rotating facts, and share controls
- An About & Credits page explaining the fan-project status, creator, and AI-tool credits
- Accessible page landmarks, keyboard focus styles, reduced-motion support, page descriptions, and a custom favicon

The site uses plain HTML, CSS, and JavaScript. Visual panels are made with CSS; the project does not bundle downloaded game artwork. There is no build step, analytics, third-party JavaScript, account system, or backend. The quiz score and theme preference are stored in the visitor's browser.

## Run locally

Open the project-root `index.html` in a modern browser or serve the project root using VS Code Live Server. All site pages, styles, scripts, and assets are organized relative to this root.

## Publish

This is a static site and can be deployed to any static web host. Publish the project root with the HTML pages, `stylee.css`, `script.js`, and `vice-city-mark.svg`. There is no package installation or server-side code.

For GitHub Pages, open **Settings → Pages**, choose **Deploy from a branch**, select `master` and `/(root)`, then save. GitHub will publish the static files directly from the project root.

Before publishing:

1. Preview every page and test links, CSS artwork, search, theme, share, and quiz on desktop and mobile.
2. Do not add third-party artwork unless you have permission to publish it. A fan-site disclaimer does not grant permission.
3. Add the published URL and a public social-preview image when the final URL is known.
4. Date and source every news update. Clearly separate official information, independent reporting, and speculation. Do not republish unauthorized leaked footage.
5. Recheck release dates and platform information against Rockstar's official page before publishing updates.

## Project structure

```text
.
├── README.md
├── index.html
├── about.html
├── characters.html
├── fun-zone.html
├── gta-5.html
├── gta-6.html
├── guides.html
├── news.html
├── videos.html
├── script.js
├── stylee.css
├── vice-city-mark.svg
└── .vscode/
    └── launch.json
```

## Rights and disclaimer

Grand Theft Auto, GTA VI, GTA V, related names, characters, logos, and other intellectual property belong to their respective owners. This project does not claim ownership of that intellectual property. Review image and asset rights before publishing.
