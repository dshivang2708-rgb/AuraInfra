# Aura Infra API (server)

Node.js + Express backend, backed by Supabase (Postgres + Auth).

## Setup

1. **Run the SQL migration** — open your Supabase project's SQL Editor and run
   `sql/001_profiles_and_admin_roles.sql` once. This creates the `profiles`
   table that tracks who's an admin.

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

4. **Run the server**
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

- `GET /api/health` — health check
- `GET /api/auth/me` — returns the current admin's id/email/role if the
  request has a valid admin session token, else 401/403

Project CRUD endpoints (list/create/update/delete properties per category,
description editor content) come in the next step.

## Security notes

- Rotate the `service_role` key in the Supabase dashboard if it's ever
  exposed outside this `.env` file (e.g. pasted in a chat, committed to git).
- Never import `config/supabaseAdmin.js` into any frontend code.
