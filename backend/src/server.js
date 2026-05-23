import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import journalRoutes from './routes/journal.routes.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.resolve(__dirname, '../..'); // backend/src -> backend -> Mirror

const app = express();
const PORT = process.env.PORT || 3001;

// ── Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── CORS — allow the prototype (file:// or localhost:3000) + Railway
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];
app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS: origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());

// ── Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'mirroros-backend', time: new Date().toISOString() });
});

// ── Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/journal', journalRoutes);

// ── Serve static prototype files (same-origin, no CORS needed)
app.use(express.static(FRONTEND_DIR, {
  index: 'prototype.html',
  extensions: ['html'],
}));

// ── SPA fallback for non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(FRONTEND_DIR, 'prototype.html'));
});

// ── 404 (API only)
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found' });
});

// ── Global error handler
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message;
  res.status(status).json({ ok: false, message });
});

app.listen(PORT, () => {
  console.log(`\n  MIRROROS backend running on http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health\n`);
});

export default app;
