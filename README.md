# PDF Management & Collaboration System

This repository contains a **Node.js + PostgreSQL** implementation of a PDF Management & Collaboration platform. Users can sign-up, upload and share PDF files, and collaborate in real-time via comments.

---

## Tech Stack

* **Backend**: Node.js, Express
* **Database**: PostgreSQL
* **Authentication**: JSON Web Tokens (JWT) & BCrypt
* **File Storage**: Local (using `multer`) 
* **E-mail**: Nodemailer (configurable SMTP)

---

## Getting Started

### 1. Prerequisites

* Node.js ≥ 18
* PostgreSQL ≥ 14 (running locally or remotely)

### 2. Clone & Install

```bash
# Clone repo
$ git clone <repo-url>
$ cd pdf-management

# Install backend deps
$ cd backend && npm install
```

### 3. Environment Variables

Duplicate `.env.example` → `.env` in `backend/` and fill in your values:

```env
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/pdf_management_db
JWT_SECRET=<super-secret>
UPLOAD_DIR=uploads
EMAIL_FROM=no-reply@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=smtp-user
SMTP_PASS=smtp-pass
```

### 4. Database

Create the database and run the initial schema:

```bash
# inside backend/
$ createdb pdf_management_db   # or psql -c "CREATE DATABASE pdf_management_db;"
$ npm run migrate
```

### 5. Run the Server

```bash
$ npm run dev
```

Server will start on `http://localhost:4000`.

---

## Deployment

This application can be deployed for free using:
- **Backend + Database**: Render (Node.js + PostgreSQL)
- **Frontend**: Vercel (React hosting)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## Project Structure

```
backend/
  ├─ migrations/
  ├─ src/
  │   ├─ config/
  │   │   └─ db.js
  │   ├─ controllers/
  │   ├─ middleware/
  │   ├─ models/
  │   ├─ routes/
  │   └─ server.js
  └─ uploads/            # created at runtime
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/signup | Register new user |
| POST   | /api/auth/login  | Login & obtain JWT |
| GET    | /api/files       | List own PDFs (searchable) |
| POST   | /api/files/upload| Upload PDF |
| POST   | /api/files/:id/share | Share via invite link |
| GET    | /api/files/:id   | Get PDF metadata + comments |
| POST   | /api/comments    | Add comment (auth or invite token) |

Full route definitions live in `src/routes/`.

---

## Future Enhancements

* Password reset & account recovery
* E-mail invites & notifications
* Rich-text comments & replies
* Real-time collaboration (WebSockets)
* Cloud storage (AWS S3, GCP)

---
