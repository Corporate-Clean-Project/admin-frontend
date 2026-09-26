# admin-frontend

Admin CMS console for **Top Pristine Luxury Craft** — React + Vite + Tailwind CSS.
Authenticates against `common-backend` with JWT (access + refresh tokens, auto-refresh
on 401) and manages inquiries, CMS content, and the internal team.

## Pages
- `/login`, `/forgot-password`, `/reset-password`, `/accept-invite`
- `/` — Dashboard (essential stats, inquiries requiring action, quick shortcuts)
- `/inquiries` — Inquiries list + detail + email reply
- `/content/about-us` — About Us CMS manager
- `/team` — Team list + invite team member modal

## Getting started

```bash
cp .env.example .env
npm install
npm run dev      # http://localhost:5174
```

The first login uses the account created by `common-backend`'s `npm run seed`
(default: `admin@toppristine.com` / see backend `.env`).

## Build & preview

```bash
npm run build
npm run preview
```

## Deployment

Static build output (`dist/`) is deployed to a **separate** Amazon S3 bucket behind
its own CloudFront distribution (e.g. `admin.toppristine.com`), kept apart from the
public `web-frontend` bucket for access-control reasons. See
`/.github/workflows/admin-frontend.yml` at the repo root.
