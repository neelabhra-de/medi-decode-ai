# MediDecode AI Backend

## Quick Start

1. Copy `.env.example` to `.env`.
2. Optional: set `GEMINI_API_KEY` and `MONGODB_URI`.
3. Run:

```bash
npm install
npm run dev
```

Server: `http://localhost:5000`

## API Endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/upload/report` (auth + multipart field `file`)
- `POST /api/upload/medicine` (auth + multipart field `file`)
- `POST /api/chat/report` (auth)
- `GET /api/history/reports` (auth)
- `GET /api/history/medicines` (auth)
- `GET /api/profile` (auth)

## Demo Mode

If Mongo/Gemini are missing, backend still works with in-memory data and safe mock AI summaries.
