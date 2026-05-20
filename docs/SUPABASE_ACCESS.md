# Supabase Auth Setup

Supabase frontend auth is connected with the provided Project URL and publishable key.

## Current Config

1. Project URL: `https://frtvuwslnuuwcgqwszra.supabase.co`
2. Key type: publishable frontend key
3. Login methods in code:
   - Email + password
   - Google login
4. Admin access:
   - controlled by `profiles.role = 'admin'`

## Supabase Dashboard Settings Needed

In Supabase, enable:

1. Authentication > Providers > Email
2. Authentication > Providers > Google

For Google login and email confirmation, add the production redirect URL:

`https://kennysinn.github.io/TIGER-AI/login.html`

For forgot password, also add:

`https://kennysinn.github.io/TIGER-AI/reset-password.html`

Also add the local URL later if testing locally with a server.

## Do Not Send

1. Supabase service role key
2. Database password
3. Any private API secret

## Role Model

Suggested profile role values:

1. `public`
2. `user`
3. `admin`

After login:

1. `user` routes to `user-dashboard.html`
2. `admin` routes to `admin-dashboard.html`
3. logged-out visitors see `public-dashboard.html`

Admin routing now checks `profiles.role`. Row Level Security should remain enabled for all real user data.

## Suggested Tables

1. `profiles`
2. `ai_companies`
3. `ai_employees`
4. `demo_links`
5. `leads`
6. `subscriptions`

## Security Note

Static HTML pages are not a real security boundary. Sensitive admin data should never be placed directly in static files. When real data is added, protect it with Supabase Auth, role checks, and Row Level Security policies.
