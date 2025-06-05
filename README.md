# Akshat Phumbhra Personal Website

This repository hosts the source for my portfolio website, served via GitHub Pages.

The site is a small multi‑page React application that fetches information about my public repositories directly from GitHub. It uses React Router for navigation, the AOS library for subtle animations, a Bootswatch theme and Google Fonts for styling. Everything is compiled in the browser with Babel so no build step is required.

## Structure

- `index.html` – entry point that loads React from a CDN and mounts the app.
- `style.css` – custom styles layered on top of the Bootswatch theme.
- `app.js` – React components and logic to fetch and display repositories.

## Development

Simply open `index.html` in a browser, or push changes to the `main` branch to update the live site. Editing any of the above files will immediately change the page.
