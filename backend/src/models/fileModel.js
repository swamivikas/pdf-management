import { query } from '../config/db.js';

export async function createFile({ ownerId, originalName, storedName, path, mimeType, size }) {
  const result = await query(
    `INSERT INTO files (owner_id, original_name, stored_name, path, mime_type, size)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [ownerId, originalName, storedName, path, mimeType, size]
  );
  return result.rows[0];
}

export async function listFilesByOwner(ownerId, searchTerm = '') {
  const result = await query(
    `SELECT * FROM files WHERE owner_id=$1 AND original_name ILIKE $2 ORDER BY created_at DESC`,
    [ownerId, `%${searchTerm}%`]
  );
  return result.rows;
}

export async function findById(id) {
  const result = await query('SELECT * FROM files WHERE id=$1', [id]);
  return result.rows[0];
} 