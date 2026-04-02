# 🚀 Deploying to Shared Web Hosting (cPanel)

This guide provides step-by-step instructions for deploying your Next.js e-commerce website to shared web hosting with cPanel.

---

## 📋 Prerequisites

- cPanel hosting account with **Node.js support** (look for "Setup Node.js App" in cPanel)
- FTP/SFTP client (e.g., FileZilla, WinSCP)
- MySQL database created in cPanel
- Domain or subdomain configured in cPanel
- Node.js version **18.x or 20.x** available in cPanel

---

## 📁 Step 1: Prepare Your Project Locally

### 1.1 Build the Production Version

```bash
npm run build
```

This creates the optimized `.next` folder for production.

### 1.2 Create Required Files

Create a `server.js` file in your project root (if not already exists):

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
```

### 1.3 Create `.env.production`

```env
NODE_ENV=production
MYSQL_HOST=your_database_host
MYSQL_PORT=3306
MYSQL_USER=your_cpanel_db_user
MYSQL_PASSWORD=your_database_password
MYSQL_DATABASE=your_database_name
```

---

## 🗄️ Step 2: Set Up MySQL Database in cPanel

### 2.1 Create Database

1. Log in to **cPanel**
2. Go to **MySQL® Databases**
3. Create a new database (e.g., `username_urban_threads`)
4. Create a new database user with a strong password
5. Add the user to the database with **ALL PRIVILEGES**

### 2.2 Import/Seed Data

Upload your `scripts/seed.js` file and run it via SSH, or import SQL locally:

```bash
# Option A: Run seed script via SSH/cPanel Terminal
cd /home/username/public_html
node scripts/seed.js

# Option B: Export local DB and import via phpMyAdmin
# 1. Export from localhost using phpMyAdmin or mysqldump
# 2. Go to cPanel → phpMyAdmin
# 3. Select your database → Import → Upload .sql file
```

---

## 📤 Step 3: Upload Files to cPanel

### 3.1 Files to Upload

Upload the following to your `public_html` or domain folder:

```
✅ .next/
✅ node_modules/
✅ public/
✅ src/
✅ scripts/
✅ package.json
✅ package-lock.json
✅ server.js
✅ next.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ jsconfig.json
✅ .env.production
```

### 3.2 Upload Methods

**Method A: File Manager**
1. Go to **cPanel → File Manager**
2. Navigate to `public_html`
3. Click **Upload** and select all files

**Method B: FTP (Recommended for large projects)**
1. Connect via FileZilla/WinSCP
2. Upload entire project folder
3. Wait for transfer to complete (~5-10 minutes)

---

## ⚙️ Step 4: Configure Node.js App in cPanel

### 4.1 Create Node.js Application

1. Go to **cPanel → Setup Node.js App**
2. Click **+ Create Application**
3. Fill in the details:

| Field | Value |
|-------|-------|
| **Node.js version** | 18.x or 20.x (match your local version) |
| **Application mode** | Production |
| **Application root** | `/home/username/public_html` |
| **Application URL** | `yourdomain.com` |
| **Application startup file** | `server.js` |

4. Click **Create**

### 4.2 Set Environment Variables

In the Node.js App interface:

1. Click on your application
2. Scroll to **Environment Variables**
3. Add each variable from your `.env.production`:

```
NODE_ENV = production
MYSQL_HOST = localhost
MYSQL_PORT = 3306
MYSQL_USER = username_dbuser
MYSQL_PASSWORD = your_password
MYSQL_DATABASE = username_dbname
```

4. Click **Save**

### 4.3 Install Dependencies

1. In the Node.js App interface, click **Run NPM Install**
2. Wait for installation to complete (check logs if it fails)

---

## 🌐 Step 5: Configure .htaccess (Optional)

For proper routing, create/edit `.htaccess` in your application root:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Redirect all traffic to Node.js app
RewriteRule ^$ http://localhost:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Access Your Site

Visit `https://yourdomain.com` in a browser.

### 6.2 Check Logs

If something fails:

1. Go to **cPanel → Setup Node.js App**
2. Click your application
3. Click **View Logs** or check **Error Log** in File Manager

### 6.3 Common Test Checklist

- [ ] Homepage loads correctly
- [ ] Product pages display
- [ ] Admin login works (`/admin`)
- [ ] Database connections succeed
- [ ] Images and static assets load
- [ ] Forms submit properly

---

## 🛠️ Troubleshooting

### Issue: "Cannot find module 'next'"

**Solution:**
```bash
# Via SSH or cPanel Terminal
cd /home/username/public_html
npm install
```

### Issue: "ECONNREFUSED" Database Error

**Solution:**
- Ensure MySQL user has correct privileges
- Check database credentials in environment variables
- Verify MySQL host is `localhost` (not remote)

### Issue: "Port already in use"

**Solution:**
1. In cPanel Node.js App, stop the application
2. Wait 30 seconds
3. Start the application again

### Issue: "502 Bad Gateway"

**Solution:**
- Check if Node.js app is running
- Verify `server.js` startup file path
- Check error logs for specific errors

### Issue: Static files not loading

**Solution:**
- Ensure `public/` folder was uploaded correctly
- Check file permissions (should be 644 for files, 755 for folders)

---

## 📝 Alternative: Static Export (If Node.js Not Available)

If your cPanel doesn't support Node.js apps:

### 1. Modify `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2. Build Static Site

```bash
npm run build
```

### 3. Upload `out/` Folder

Upload contents of the `out/` folder to `public_html`.

> ⚠️ **Note:** This disables server-side features like API routes, database queries, and authentication. Only suitable for static content.

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use strong passwords** for database users
3. **Enable SSL** (cPanel → SSL/TLS → Let's Encrypt)
4. **Set proper file permissions** (644 for files, 755 for directories)
5. **Keep Node.js updated** in cPanel
6. **Regular backups** (cPanel → Backup)

---

## 📞 Support Resources

- [cPanel Documentation - Node.js](https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node-js-application/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [MySQL Error Codes](https://dev.mysql.com/doc/mysql-errors/en/)

---

**Last Updated:** April 2026  
**Compatible With:** Next.js 14.x, Node.js 18.x/20.x, cPanel with Node.js support
