# Conference League or Interpol

English README for the project in this repository.

## Project overview ✅
"Conference League or Interpol" is a small web game built with Svelte (v5 + Vite). The player sees a photo and must guess whether the person is a Conference League football player or an Interpol criminal. The app includes localization, local streak tracking, share modal, settings, and a completion modal when the dataset is exhausted.

## Key features ✨
- Single-player guessing game (player vs. criminal)
- Local streak and max-streak persistence (localStorage)
- Multi-language support (i18n) with fallback
- Static JSON-based datasets located in `public/api/` (players & criminals)
- Firebase hosting-ready configuration
- Accessible, animation-aware UI and responsive layout

## Tech stack & dependencies 🔧
- Svelte 5 + Vite
- TypeScript (small typed files)
- Firebase (hosting analytics entry present)
- Project scripts: `dev`, `build`, `preview`, `deploy`

## Project structure (high level) 📁
- `public/api/` — static JSON datasets and images used by the game
- `src/` — main source code
  - `lib/components/` — Svelte UI components (GameCard, ResultCard, modals, etc.)
  - `lib/services/apiService.ts` — loads JSON datasets and provides random person selection
  - `lib/firebase/` — Firebase initialization (client-side analytics)
  - `lib/stores/` — i18n store
  - `types/` — `Player`, `Criminal`, `Person` types
- `firebase.json` — hosting configuration (serves `dist`)

## How the data and game logic work 💡
- Static JSON data for players and criminals live in `public/api/` (multiple language variants exist: `players.en.json`, `players.fr.json`, etc.).
- `apiService.getRandomPerson()` merges players + criminals and returns a random item; `excludeIds` prevents repeats.
- `App.svelte` manages streaks, UI state, and uses `apiService` to fetch persons.

## Local development — run the app 🔁
1. Install dependencies:
   npm install

2. Start dev server:
   npm run dev

3. Build for production:
   npm run build

4. Preview production build locally:
   npm run preview

## Deploying to Firebase Hosting 🚀
This project already contains `firebase.json` configured to serve `dist/`.
- Build and deploy with the npm script:
  npm run deploy

Make sure you are logged in with `firebase login` and have the correct Firebase project selected (`firebase use`), if needed.

## Localization / i18n 🌐
- Current language selection is stored in a Svelte store (`src/lib/stores/i18n.ts`).
- The API service requests translated JSON files (falls back to `players.json` / `criminals.json` when translation is missing).

## Important files to review 🔎
- `src/lib/services/apiService.ts` — data loading & random selection
- `src/App.svelte` — main game flow, UI state, streak logic
- `public/api/` — dataset & images
- `src/lib/firebase/firebase.config.ts` — Firebase client config (analytics)

## Notes & recommendations ⚠️
- `.firebase/` is now ignored in `.gitignore` (local Firebase state should not be committed).
- The Firebase web config is included for client initialization (safe to be public for frontend apps). Do **not** place server secrets here.
- If you plan to expand datasets, keep images under `public/api/images/` and update the JSON files accordingly.

## Contributing & next steps 👍
- Add new players/criminals in `public/api/` (keep IDs unique).
- Add tests or E2E checks if you need release safety.
- Add a license if you want to publish this publicly (none specified in package.json).

---

If you want, I can:
- Open a PR with README + .gitignore changes (done locally) or
- Add a short `CONTRIBUTING.md` and a `LICENSE` file — tell me which license to use.
