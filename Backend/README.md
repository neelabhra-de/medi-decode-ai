# MediDecode AI Backend

Production-structured, hackathon-ready backend with:
- Node.js + Express
- MongoDB Atlas (Mongoose)
- Gemini API integration
- JWT auth + secure middleware stack

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev server: `npm run dev`

## Required Env
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `CLIENT_URL`

## API Routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/reports/upload`
- `GET /api/reports/history`
- `GET /api/reports/:id`
- `DELETE /api/reports/:id`
- `POST /api/medicines/scan`
- `GET /api/medicines/history`
- `GET /api/medicines/:id`
- `POST /api/chat/report-chat`
- `GET /api/user/profile`
- `PUT /api/user/update-profile`
- `GET /api/dashboard/overview`

## Notes
- AI responses are awareness-only and include medical disclaimer.
- Gemini model fallback is enabled for demo stability.
- Routes use standardized response format: `{ success, message, data }`.
