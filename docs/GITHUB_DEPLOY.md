# GitHub Pages Deployment

This project is a static website. It can be hosted for free on GitHub Pages.

## Option A: Deploy From GitHub Website

1. Create a new GitHub repository.
2. Upload or push these files to the repository.
3. Open the repository on GitHub.
4. Go to Settings > Pages.
5. Under Build and deployment, choose `Deploy from a branch`.
6. Select branch `main`.
7. Select folder `/root`.
8. Save.

GitHub will publish the site at:

`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Option B: Deploy From This Local Repo

After creating an empty GitHub repository, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages from Settings > Pages.

## Recommended First Backend Later

Keep this frontend on GitHub Pages and add Supabase for:

1. User login
2. User workspaces
3. AI company templates
4. AI employee records
5. Business kit storage
6. Demo link records

Do not put OpenAI API keys or payment secrets into frontend code.

