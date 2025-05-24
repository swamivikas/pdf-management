import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile, listFiles, getFileDetails, shareFile } from '../controllers/fileController.js';
import { authenticate } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

function pdfFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed'), false);
}

const upload = multer({ storage, fileFilter: pdfFilter });

router.get('/', authenticate, listFiles);
router.get('/:id', authenticate, getFileDetails);
router.post('/upload', authenticate, upload.single('pdf'), uploadFile);
router.post('/:id/share', authenticate, shareFile);

export default router; 