# Aura Infra API (server)

Node.js + Express backend, backed by Supabase (Postgres + Auth).

## Setup

1. **Run the SQL migrations**, in order, in your Supabase SQL Editor:
   - `sql/001_profiles_and_admin_roles.sql`
   - `sql/002_projects_and_storage.sql` — creates the `projects` table and the
     `project-images` storage bucket.

2. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Environment variables** — `.env` is already filled in with your project's
   keys (never commit this file — it's in `.gitignore`). If you ever need to
   recreate it, copy `.env.example` and fill in:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` — server-only, never expose this to the browser
   - `SUPABASE_ANON_KEY`

4. **Seed existing site content into Supabase** (one-time, safe to re-run):
   ```bash
   node scripts/seed.js
   ```
   This migrates the property data that was previously hardcoded in the
   frontend's `src/data/*.js` files into the `projects` table, so the site
   doesn't lose any content when it switches to fetching live data.

5. **Run the server**
   ```bash
   npm run dev
   ```
   Starts on `http://localhost:4000` by default.

## How admin auth works

- The **frontend** signs users up / logs them in directly against Supabase
  Auth (using the public `anon` key — this is safe to expose, it's what it's
  for).
- New signups get a `profiles` row with `role = 'pending'` automatically (via
  a database trigger). They are **not** admins by default.
- To make someone an admin, run this in the Supabase SQL Editor:
  ```sql
  update public.profiles set role = 'admin' where email = 'you@example.com';
  ```
- This **backend** verifies the Supabase session token on every admin-only
  request (`requireAdmin` middleware) and checks `profiles.role = 'admin'`
  before allowing anything. The service_role key (which bypasses all security
  rules) is only ever used here, server-side — never in the frontend bundle.

## Current endpoints

Public (no auth):
- `GET /api/health` — health check
- `GET /api/projects?category=residential&sector=Sector%2082` — list published
  projects, optionally filtered by category and/or sector
- `GET /api/projects/:category/:slug` — a single published project (powers
  the detail pages)
- `GET /api/projects/sectors` — distinct list of sectors with published
  projects (powers the homepage's location filter)

Admin (require a valid admin session token):
- `GET /api/auth/me` — confirms the session + admin role
- `GET /api/admin/projects?category=residential` — list all projects (incl.
  drafts) for the admin dashboard
- `GET /api/admin/projects/:id` — single project by id
- `POST /api/admin/projects` — create
- `PUT /api/admin/projects/:id` — update
- `DELETE /api/admin/projects/:id` — delete
- `POST /api/admin/upload` — upload an image (multipart, field name `image`),
  returns its public URL in Supabase Storage

## Data model

Rather than a separate table per category, `projects` has a small set of
shared columns (name, location, price, images, etc.) plus a flexible
`details` JSONB column for whatever's specific to that category — floor
plans, soil type, "why invest" bullets, and so on. See
`sql/002_projects_and_storage.sql` and `src/lib/adapters.js` (frontend) for
the exact shape each category's detail page expects.

## Security notes

- Rotate the `service_role` key in the Supabase dashboard if it's ever
  exposed outside this `.env` file (e.g. pasted in a chat, committed to git).
- Never import `config/supabaseAdmin.js` into any frontend code.