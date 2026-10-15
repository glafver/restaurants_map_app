# Tasty Malmö — Restaurants Map App

An application where users can see restaurants in Malmö on the map and in a list.

Users can click on a marker on the map (or an entry in the list) to see short
information about a restaurant, and follow the **"More info"** link to open the
restaurant's page with full details. Users can also:

- see their **own position** on the map,
- see the **distance in meters** from their position to every restaurant,
- see the **route** to a selected restaurant,
- **suggest** new restaurants to the admins.

> Live demo: [https://tasty-malmo.netlify.app/](https://tasty-malmo.netlify.app/)

---

## Features

- 🗺️ Interactive Google Map with restaurant markers, search and "go to my location"
- 📋 Restaurant list with filters and sorting
- 🔎 Restaurant detail page with photos and a route/directions link
- 👤 Authentication (sign up, log in, forgot password, update profile)
- 🛠️ Admin area: create / edit restaurants, approve photos, manage suggestions and users
- 📤 Suggest a restaurant (upload photos via drag & drop)
- 📱 Responsive layout (Bootstrap)

## Tech stack

- **Frontend:** React 18, Vite, React Router v6, React Query
- **Backend / data:** Firebase (Authentication, Firestore, Storage)
- **Maps:** Google Maps JavaScript API + Google Places Autocomplete
- **UI:** Bootstrap 5, Sass, React Icons, Font Awesome, react-toastify
- **Tests:** Vitest + React Testing Library

This is a **static single-page application**. There is no dedicated backend
service — all data and auth live in Firebase.

---

## Getting started

### Prerequisites

- Node.js 18+ and npm

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (`<project>.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project id |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id |
| `VITE_FIREBASE_APP_ID` | Firebase app id |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key (enable Maps JS API + Places API) |

> You can find the Firebase values in the Firebase console under
> **Project settings → General → Your apps → SDK setup and configuration**.

### 3. Run locally

```bash
npm run dev
```

The app is served on [http://localhost:3000](http://localhost:3000) (see `vite.config.js`).

### 4. Run tests

```bash
npm test
# with coverage
npm run coverage
```

---

## Deployment to Google Cloud Run

The app is packaged as a Docker image (nginx serving the built static files) and
deployed to Cloud Run automatically by GitHub Actions.

### How it works

- `Dockerfile` — two-stage build:
  1. `node` builds the Vite bundle (the `VITE_*` values are baked in at build time),
  2. `nginx` serves `dist/` with an SPA fallback (any route returns `index.html`).
- `docker/nginx/default.conf.template` — nginx config; `${PORT}` is replaced by
  Cloud Run's `PORT` env var at container start.
- `.github/workflows/deploy.yml` — builds the image, pushes it to
  **Artifact Registry**, and deploys to **Cloud Run** on every push to `master`
  (or manually via `workflow_dispatch`).

### One-time setup

**Google Cloud** (project `glafira-se` in `europe-west1` by default):

1. Make sure the **Cloud Run API** and **Artifact Registry API** are enabled
   for your project.
2. Create a service account (or reuse your existing one) with at least these roles:
   - `Cloud Run Admin` (`roles/run.admin`)
   - `Artifact Registry Writer` (`roles/artifactregistry.writer`)
   - `Service Account User` (`roles/iam.serviceAccountUser`)
3. Create a JSON key for the service account and copy its contents.

**GitHub** (repository `glafver/restaurants_map_app`):

4. Add the following **repository secrets** under
   **Settings → Secrets and variables → Actions**:

   | Secret | Value |
   | --- | --- |
   | `GCP_SA_KEY` | The service account JSON key from step 3 |
   | `VITE_FIREBASE_API_KEY` | Firebase web API key |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase project id |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id |
   | `VITE_FIREBASE_APP_ID` | Firebase app id |
   | `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |

   > `VITE_FIREBASE_*` and `VITE_GOOGLE_MAPS_API_KEY` are client-side values that
   > end up in the browser bundle; storing them as secrets just keeps them out of
   > the repository. Restrict the Maps API key by HTTP referrer to your domains.

5. If your GCP project / region / service differ, update the `env` block at the
   top of `.github/workflows/deploy.yml` (`PROJECT_ID`, `REGION`, `SERVICE`).

### After the first deploy

- The workflow prints the Cloud Run URL (`.run.app`) at the end of each run.
- **Google Maps key:** add the new Cloud Run URL (`https://*.run.app`) to the
  key's HTTP referrer restrictions.
- **Firebase:** add the Cloud Run domain to
  **Authentication → Settings → Authorized domains**, and to Firestore/Storage
  rules if you restrict them by origin.

### Deploying

Push to `master` (or run the workflow manually from the **Actions** tab). That's
it — the image is built and the service is deployed automatically.

---

## Project structure

```
src/
  assets/          # images, icons, SCSS
  components/      # React components (map, forms, cards, auth guards, ...)
  contexts/        # AuthContext
  firebase/        # Firebase app initialization (auth, db, storage)
  hooks/           # data-fetching / mutation hooks (React Query + Firestore)
  pages/           # route-level pages
  test/            # test setup
  utils/           # test utilities
  App.jsx          # routes
  main.jsx         # entry point
```

## Authors

Wiktoria Dobrzewinska, Glafira Veretennikova, Alexander Kocman
