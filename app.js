import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import transactionRouter from "./routes/transactionRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import tasksRouter from "./routes/tasksRoutes.js";
import swaggerUi from 'swagger-ui-express';

import { openapiSpec } from './docs/swaggers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());





// Routes
app.use('/api/transactions', transactionRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/tasks', tasksRouter);

// Swagger docs
app.get('/api-docs.json', (req, res) => {
  res.json(openapiSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// root - serve only exact GET /
app.get(['/', '/api'], async (req, res) => {
  try {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const updatedContent = indexContent.replace("% add %", "Api is running successfully!");
    res.status(200).send(updatedContent);
  } catch (err) {
    res.status(500).json({ message: 'Error loading index.html', error: err.message });
  }
});

// 404 handler - serve HTML page for non-API routes
app.use(async (req, res) => {
  try {
    const notFoundPath = path.join(__dirname, 'public', 'pageNotFound.html');
    const notFoundContent = await fs.readFile(notFoundPath, 'utf-8');
    res.status(404).send(notFoundContent);
  } catch (err) {
    res.status(500).json({ message: 'Error loading pageNotFound.html', error: err.message });
  }
});


export default app;