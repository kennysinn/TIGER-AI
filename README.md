# Tiger AI Website

Static first-version website for Tiger AI, an AI Company Builder Platform for solopreneurs and small agencies.

## Current Version

This version is designed for GitHub Pages and uses plain HTML, CSS, and JavaScript.

Included:

1. Multi-page product flow
2. Logo-inspired dark metallic brand system
3. Commercial landing sections for positioning and conversion
4. AI company template selection
5. AI employee builder prototype
6. Business kit and demo link preview
7. Dashboard, login preview, and subscription pricing preview
8. Product planning document

## Open Locally

Open `index.html` directly in a browser.

Pages:

1. `index.html`
2. `templates.html`
3. `builder.html`
4. `demo.html`
5. `public-dashboard.html`
6. `user-dashboard.html`
7. `admin-dashboard.html`
8. `login.html`
9. `dashboard.html`

## Dashboard Roles

Current static role structure:

1. Non-registered users: `public-dashboard.html`
2. Customer users: `user-dashboard.html`
3. Admin users: `admin-dashboard.html`

`login.html` now connects to Supabase Auth for email/password and Google login. Admin routing currently uses an email allowlist.

## Supabase

See `docs/SUPABASE_ACCESS.md` for Supabase setup notes and redirect URLs.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open the repository on GitHub.
3. Go to Settings > Pages.
4. Set Source to `Deploy from a branch`.
5. Select `main` and `/root`.
6. Save.

The site will be available at:

`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Product Plan

See `docs/PLANNING.md`.
