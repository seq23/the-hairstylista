# Repository Update Runbook — The Hairstylista Site

## Repo Identity

- Repo name: `the-hairstylista-site`
- Complexity: Level 1 static marketing site
- Deployment target: Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`

## Required Local Validation

```bash
npm run release:prepush:container
```

## Cloudflare Pages Settings

- Framework preset: None / Static
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: none

## Notes

This repo intentionally does not use env vars, auth, database, serverless functions, or a form backend.
