import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import transactionRouter from "./routes/transactionRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

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

// root
app.use('/', async (req, res) => {
  try {
   
    const indexPath = path.join(__dirname, 'public', 'index.html');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const updatedContent = indexContent.replace("% add %", "Api is running successfully!");
    res.status(200).send(updatedContent);
  } catch (err) {
    res.status(500).json({ message: 'Error loading index.html', error: err.message });
  }
});


export default app;