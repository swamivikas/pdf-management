import { findByToken } from '../models/inviteModel.js';
import { findById } from '../models/fileModel.js';

export async function accessSharedFile(req, res) {
  try {
    const { token } = req.params;
    const invite = await findByToken(token);
    if (!invite) return res.status(404).json({ message: 'Invalid link' });

    const file = await findById(invite.file_id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    res.json({
      file: {
        id: file.id,
        original_name: file.original_name,
        stored_name: file.stored_name,
        mime_type: file.mime_type,
        size: file.size,
        created_at: file.created_at,
      },
      invite,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
} 