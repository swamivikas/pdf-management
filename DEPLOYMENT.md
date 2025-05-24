# Deployment Guide - PDF Management & Collaboration System

This guide will help you deploy your application using free hosting services.

## Architecture
- **Backend + Database**: Render (Free tier - Node.js + PostgreSQL)
- **Frontend**: Vercel (Free tier - React static hosting)

---

## Step 1: Prepare Your Code for Deployment

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pdf-management.git
   git push -u origin main
   ```

---

## Step 2: Deploy Backend on Render

1. **Create a Render account**: Go to [render.com](https://render.com) and sign up with GitHub.

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `pdf-management-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - **Name**: `pdf-management-db`
   - **Database Name**: `pdf_management_db`
   - **User**: `pdfuser`
   - Copy the **Internal Database URL** after creation

4. **Configure Environment Variables** in your web service:
   ```
   NODE_ENV=production
   DATABASE_URL=<paste_your_database_internal_url>
   JWT_SECRET=<generate_a_long_random_string>
   UPLOAD_DIR=uploads
   EMAIL_FROM=no-reply@yourdomain.com
   ```

5. **Deploy**: Click "Create Web Service" and wait for deployment.

6. **Run Database Migration**:
   - Go to your web service dashboard
   - Click "Shell" tab
   - Run: `npm run migrate`

7. **Note your backend URL**: `https://pdf-management-backend-xxx.onrender.com`

---

## Step 3: Deploy Frontend on Vercel

1. **Update frontend URLs**: 
   - Open `frontend/src/api.js`
   - Replace `https://your-backend-domain.onrender.com` with your actual Render URL
   
   - Open `frontend/src/pages/InviteView.jsx`
   - Replace `https://your-backend-domain.onrender.com` with your actual Render URL

2. **Create Vercel account**: Go to [vercel.com](https://vercel.com) and sign up with GitHub.

3. **Deploy**:
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

4. **Note your frontend URL**: `https://your-project-name.vercel.app`

---

## Step 4: Update CORS and Share Links

1. **Update Backend CORS**:
   - Edit `backend/src/app.js`
   - Replace `https://your-frontend-domain.vercel.app` with your actual Vercel URL
   - Redeploy the backend

2. **Update Frontend Share Links**:
   - Edit `frontend/src/pages/FileView.jsx`
   - Replace `https://your-frontend-domain.vercel.app` with your actual Vercel URL
   - Redeploy the frontend

---

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Create an account
3. Upload a PDF
4. Generate a share link
5. Test commenting functionality

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
DATABASE_URL=<your_render_postgres_url>
JWT_SECRET=<long_random_string>
UPLOAD_DIR=uploads
EMAIL_FROM=no-reply@yourdomain.com
```

### Frontend (Vercel)
No environment variables needed for basic deployment.

---

## Troubleshooting

**Backend Issues**:
- Check Render logs in the dashboard
- Ensure DATABASE_URL is correct
- Verify all environment variables are set

**Frontend Issues**:
- Check Vercel deployment logs
- Ensure backend URLs are correctly updated
- Test API endpoints manually

**CORS Issues**:
- Verify frontend URL is added to backend CORS configuration
- Check browser developer tools for CORS errors

---

## Free Tier Limitations

**Render Free Tier**:
- Apps sleep after 15 minutes of inactivity
- 750 hours per month (about 31 days)
- Shared resources

**Vercel Free Tier**:
- 100GB bandwidth per month
- 100 deployments per day
- No limits on projects

---

## Next Steps (Optional)

1. **Custom Domain**: Add your own domain on Vercel
2. **Email Service**: Configure SMTP for invite emails
3. **File Storage**: Move uploads to cloud storage (AWS S3, Cloudinary)
4. **Monitoring**: Add error tracking (Sentry)
5. **Analytics**: Add usage analytics

---

Your PDF Management & Collaboration System is now live! 🎉 