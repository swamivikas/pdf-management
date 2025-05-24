import express from 'express';
import { accessSharedFile } from '../controllers/inviteController.js';

const router = express.Router();

router.get('/:token', accessSharedFile);

export default router; 