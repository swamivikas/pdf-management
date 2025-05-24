import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import inviteRoutes from './routes/inviteRoutes.js';

dotenv.config();

const app = express();

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] // Update this after deploying frontend
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/static', express.static(path.resolve(uploadDir)));
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/comments', commentRoutes);
app.use('/share', inviteRoutes);

app.get('/', (req, res) => {
  res.send('PDF Management & Collaboration System API');
});

export default app; 