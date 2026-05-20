# Supabase Access Needed

To connect real login, Tiger AI only needs public frontend auth credentials first.

## Please Provide

1. Supabase Project URL
   - Looks like: `https://xxxx.supabase.co`
2. Supabase anon public key
   - This is safe for frontend use.
   - Do not send the service role key.
3. Login methods you want enabled
   - Email + password
   - Magic link
   - Google login
4. Admin email address
   - The first email that should route to the admin dashboard.

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

## Suggested Tables

1. `profiles`
2. `ai_companies`
3. `ai_employees`
4. `demo_links`
5. `leads`
6. `subscriptions`

