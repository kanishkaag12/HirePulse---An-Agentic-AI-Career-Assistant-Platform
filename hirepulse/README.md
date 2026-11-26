# HirePulse – Frontend

AI Resume & Job Description matching platform (frontend prototype).

## Run
```bash
npm install
npm run dev
```

## Stack
React + Vite, Tailwind CSS, React Router, Lucide React, Recharts.

## Demo mode
All analysis results are **simulated** in `src/utils/mockAnalysis.js`.
No resume text is extracted and no NLP model runs.
History, profile and settings are stored in `localStorage`.

## Connecting the FastAPI backend
1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
2. `src/services/api.js` will then POST `multipart/form-data`
   (`resume`, `job_description`, `job_title`, `company`) to `/api/analyze`.
3. The backend should return the same JSON shape that `generateMockAnalysis()` returns.
