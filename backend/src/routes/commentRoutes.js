import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

// Authenticated or invite token user can fetch comments; no auth so open
router.get('/:fileId', getComments);

// For adding comment, support both: if JWT present, authenticate; else rely on invite token in header.
router.post('/', authenticateOptional, addComment);

// Custom middleware to allow optional auth
function authenticateOptional(req, res, next) {
  // If Authorization header present attempt to authenticate, else continue
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return authenticate(req, res, next);
  }
  next();
}

export default router; 