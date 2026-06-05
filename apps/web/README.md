# ACAT Web App

React, TypeScript, Vite, Tailwind CSS, and local shadcn/ui components for the ACAT member tracking frontend.

## Commands

```powershell
pnpm --filter @acat/web dev
pnpm --filter @acat/web check-types
pnpm --filter @acat/web lint
pnpm --filter @acat/web test
pnpm --filter @acat/web build
```

## Routes

- `/` member register
- `/add` add member form
- `/view/:id` view member details
- `/edit/:id` edit member form
- `/status/201`, `/status/204`, `/status/400`, `/status/401`, `/status/403`, `/status/404-record`, `/status/429`, `/status/500`, `/status/503`, `/status/504`
- `*` page-not-found placeholder

## Local State

Members are stored in React state through `MembersProvider` and persisted to `localStorage` for development. The app keeps `joinedAt`, `progressionApplicant`, `progressionNewMember`, and `progressionMember` as `Date` values in memory. Local persistence serializes those dates with ISO 8601 strings via `Date.toISOString()` and deserializes them back to `Date`.

## API And Auth Placeholders

The API client in `src/lib/api` is intentionally a placeholder until backend CRUD endpoints exist. The Google sign-in dialog is also a placeholder and only updates local auth state.

## Environment

Copy `.env.example` when local overrides are needed:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=
```

## Scaffold Conventions

- Shared shadcn/ui primitives live in `src/components/ui`.
- Reusable feedback states live in `src/components/feedback`.
- Member state, persistence, and form parsing live in `src/features/members`.
- Auth placeholders and route guards live in `src/features/auth`.
- Status route constants live in `src/routes/status-routes.ts`.
