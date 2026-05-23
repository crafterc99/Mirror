# MIRROROS — Auth & Backend Setup

## Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js 22 + ES Modules |
| Framework | Express 4 |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Auth | JWT (httpOnly cookie) + bcrypt |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |

---

## Quick Start (local)

### 1. PostgreSQL

```bash
# macOS (Homebrew)
brew install postgresql@16 && brew services start postgresql@16

# Ubuntu / Debian
sudo apt install postgresql-16
sudo pg_ctlcluster 16 main start

# Create database
sudo -u postgres psql -c "CREATE USER mirroros WITH PASSWORD 'mirroros_dev_pw';"
sudo -u postgres psql -c "ALTER USER mirroros CREATEDB;"
sudo -u postgres createdb -O mirroros mirroros_dev
```

### 2. Backend

```bash
cd backend
cp .env.example .env          # edit DATABASE_URL + JWT_SECRET if needed
npm install
npx prisma migrate dev        # creates tables
npm run dev                   # starts on http://localhost:3001
```

### 3. Frontend

Open `http://localhost:3001/prototype.html` in your browser.

The backend serves the prototype files as static assets from the same origin,
so no CORS configuration is needed and `window.MirrorAPI` connects automatically.

> **Note:** Opening `prototype.html` directly as `file://` still works for visual
> prototyping — the API client silently does nothing when `window.MirrorAPI` is
> called from a file:// origin (no network calls, no errors).

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Prisma PostgreSQL connection string | see .env.example |
| `JWT_SECRET` | Secret for signing JWTs (min 32 chars) | — |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `PORT` | Server port | `3001` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |
| `NODE_ENV` | `development` \| `production` | `development` |

---

## API Routes

### Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Sign in |
| POST | `/api/auth/logout` | — | Clear cookie |
| GET | `/api/auth/me` | ✓ | Current user |

### User

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/user/profile` | ✓ | Fetch profile |
| PATCH | `/api/user/profile` | ✓ | Update profile fields |

### Journal

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/journal` | ✓ | Save entry |
| GET | `/api/journal` | ✓ | List entries (paginated) |
| GET | `/api/journal/:id` | ✓ | Get single entry |

---

## Database Models

- **User** — auth identity (email, username, bcrypt hash)
- **UserProfile** — onboarding state, goals, emotional data, bond stage
- **JournalEntry** — text/voice entries with mood tags
- **Insight** — AI-generated insights (ready for AI layer)
- **Memory** — episodic memory objects (ready for AI layer)

---

## Railway Deployment

1. Add a PostgreSQL plugin to your Railway project
2. Set environment variables in Railway dashboard:
   - `DATABASE_URL` — Railway provides this automatically from the Postgres plugin
   - `JWT_SECRET` — generate with `openssl rand -base64 64`
   - `NODE_ENV=production`
   - `FRONTEND_URL` — your Railway app URL
3. Set start command: `cd backend && npx prisma migrate deploy && node src/server.js`
4. The backend serves both the API (`/api/*`) and the prototype static files

---

## What's Next

- [ ] Apple / Google OAuth (Phase 2)
- [ ] AI conversation routes (`/api/ai/chat`, `/api/ai/reflect`)
- [ ] Voice transcript storage (`/api/journal` with `type: 'voice'`)
- [ ] Memory vector indexing (Pinecone)
- [ ] Weekly report generation (Trigger.dev + Claude Opus)
