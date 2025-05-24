import path from 'path';
import { createFile, listFilesByOwner, findById } from '../models/fileModel.js';
import { createInvite } from '../models/inviteModel.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
// import { sendMail } from '../utils/mailer.js';

dotenv.config();

export async function uploadFile(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { originalname, filename, mimetype, size, path: filePath } = req.file;
    const file = await createFile({
      ownerId: req.user.id,
      originalName: originalname,
      storedName: filename,
      path: filePath,
      mimeType: mimetype,
      size,
    });
    res.status(201).json({ file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function listFiles(req, res) {
  try {
    const search = req.query.search || '';
    const files = await listFilesByOwner(req.user.id, search);
    res.json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getFileDetails(req, res) {
  try {
    const file = await findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json({ file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function shareFile(req, res) {
  try {
    const file = await findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    if (file.owner_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { email = null } = req.body; // email ignored now
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    const invite = await createInvite({ fileId: file.id, email, token, expiresAt });

    const link = `${req.protocol}://${req.get('host')}/share/${token}`;

    // Always return link for display
    res.json({ link, invite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
} 