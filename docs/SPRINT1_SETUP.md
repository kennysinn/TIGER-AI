# Sprint 1 Setup

Sprint 1 turns Tiger AI from a static prototype into a real SaaS data foundation.

## What This Sprint Adds

1. `profiles` table
2. Database role system: `user` / `admin`
3. `ai_companies` table
4. AI company creation from templates
5. Builder page loading real company data by `company_id`
6. User dashboard showing real AI companies for the logged-in user
7. Admin dashboard guarded by `profiles.role = 'admin'`

## Run The SQL Migration

In Supabase:

1. Open your project.
2. Go to SQL Editor.
3. Open [001_profiles_ai_companies.sql](../supabase/migrations/001_profiles_ai_companies.sql).
4. Paste the full SQL.
5. Run it.

## Set Your Account As Admin

After you create/login with `kennysinn21@gmail.com`, run this in Supabase SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'kennysinn21@gmail.com';
```

Then log out and log back in.

## Manual Test Plan

1. Create account or log in.
2. Confirm a row exists in `profiles`.
3. Go to `templates.html`.
4. Click `Build this company`.
5. Confirm a row exists in `ai_companies`.
6. Confirm redirect to `builder.html?company_id=...`.
7. Edit company setup fields and save.
8. Go to `user-dashboard.html`.
9. Confirm the AI company count and list show your real company.
10. Use another account and confirm it cannot see your company.
11. Set your profile role to `admin`.
12. Confirm `admin-dashboard.html` is accessible only as admin.

## Known Limitations

1. AI employees are not built yet.
2. Business kits are not built yet.
3. Demo links are not generated yet.
4. Knowledge upload is not built yet.
5. Payment is not connected.
6. Admin dashboard still uses mock stats.

## Sprint 2

Next sprint should add:

1. `ai_employees` table
2. Create employee form
3. Employee list and edit page
4. Rule-based business kit generator
5. Save business kit to Supabase
