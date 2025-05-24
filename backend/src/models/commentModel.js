import { query } from '../config/db.js';

export async function createComment({ fileId, authorId = null, inviteId = null, content, parentCommentId = null }) {
  const result = await query(
    `INSERT INTO comments (file_id, author_id, invite_id, content, parent_comment_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [fileId, authorId, inviteId, content, parentCommentId]
  );
  return result.rows[0];
}

export async function getCommentsByFile(fileId) {
  const result = await query(
    `SELECT c.*, u.name AS author_name
     FROM comments c
     LEFT JOIN users u ON c.author_id = u.id
     WHERE c.file_id=$1
     ORDER BY c.created_at ASC`,
    [fileId]
  );
  return result.rows;
} 