import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Use a single client connection with explicit credentials (fallback to env variables if provided)
const client = new pg.Client({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres@123',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
  database: process.env.PGDATABASE || 'pdf_management_db',
});

client.connect();

export const query = (text, params) => client.query(text, params); 