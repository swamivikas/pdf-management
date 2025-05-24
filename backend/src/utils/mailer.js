import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function sendMail({ to, subject, html }) {
  const fromAddress = process.env.EMAIL_FROM || 'no-reply@example.com';
  return transporter.sendMail({ from: fromAddress, to, subject, html });
} 