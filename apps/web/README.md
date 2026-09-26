# SafeRoute Frontend

Frontend-only implementation of SafeRoute, an AI-powered, risk-aware urban navigation experience.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui component conventions
- TanStack Query + Zustand
- React Hook Form + Zod
- Mapbox GL JS with a local fallback map when no token is available
- Recharts-ready frontend stack, Motion, Lucide React

## Run

```bash
cd apps/web
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Optional Mapbox setup: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_MAPBOX_TOKEN`. If omitted, the application automatically uses its self-contained demo map.

## Demo behavior

All routes, risk factors, traffic, flood, crime, weather, alerts, history, and profile information are local TypeScript mock data. There are no API calls, backend connections, authentication services, database operations, ML calls, or secrets in this frontend package.

## Pages

- `/` — landing page
- `/login` — frontend-only login form
- `/dashboard` — dashboard
- `/route` — route planning and map/risk comparison
- `/alerts` — alerts
- `/history` — route history
- `/settings` — preferences
