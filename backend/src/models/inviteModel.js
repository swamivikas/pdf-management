import { query } from '../config/db.js';

export async function createInvite({ fileId, email, token, expiresAt }) {
  const result = await query(
    `INSERT INTO invites (file_id, email, token, expires_at)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [fileId, email, token, expiresAt]
  );
  return result.rows[0];
}

export async function findByToken(token) {
  const result = await query('SELECT * FROM invites WHERE token=$1', [token]);
  return result.rows[0];
} 