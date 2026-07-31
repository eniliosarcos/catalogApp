# catalog-no-env-leak

## Purpose
Prevent leaking real environment data (phone numbers, social handles) to GitHub.

## When This Skill Fires
- Before any `git commit` or `git push`
- When editing `environment.ts` or `environment.prod.ts`
- When adding new environment variables

## CRITICAL RULES

### NEVER commit these files with real data
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Both are in `.gitignore` — keep them there.

### Environment files in repo must use placeholders
```typescript
// environment.ts (committed — safe)
export const environment = {
  production: false,
  contact: {
    whatsapp: '+00000000000',
    whatsappDisplay: '+0 000 000 0000',
    instagram: '@tu_usuario',
    telegram: '@tu_usuario',
  },
};
```

### Real data lives in GitHub Secrets
- `WHATSAPP_NUMBER` — full number with country code
- `WHATSAPP_DISPLAY` — formatted for UI display
- `INSTAGRAM_HANDLE` — without @
- `TELEGRAM_HANDLE` — without @

### Workflow injects secrets at build time
The GitHub Actions workflow (`deploy.yml`) creates `environment.prod.ts` from secrets during build.

## Pre-commit Checklist
- [ ] Verify `.gitignore` includes `src/environments/environment.ts` and `environment.prod.ts`
- [ ] Verify environment files in repo use placeholder values only
- [ ] Never add real phone numbers or social handles to committed files
