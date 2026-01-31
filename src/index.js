import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { ApiError } from './utils/ApiError.js';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*';
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

// HTTP request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.MORGAN_FORMAT || 'combined'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// --- Mount your routes here ---
app.use('/api', (req, res) => res.json({ message: 'API root' }));

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Not Found'));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.statuscode || 500;
  const body = {
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  };
  if (process.env.NODE_ENV === 'development') body.stack = err.stack;
  res.status(status).json(body);
});

export default app;