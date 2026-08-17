# Afar SITB Web Portal (Science, Innovation & Technology Bureau)

A modern, high-performance web portal for the Afar Regional Science, Innovation & Technology Bureau built with React 19, TypeScript, Tailwind CSS, Motion animations, and full trilingual support (Afar, Amharic, English).

## 🌿 Branches

- **`main`**: Production release branch (deploys to `https://asitb.et` / `public_html/`)
- **`dev`**: Staging development branch (deploys to `https://dev.asitb.et` / `dev.asitb.et/`)

---

## 🚀 GitHub Actions CI/CD to cPanel

Automatic deployment workflows are located in `.github/workflows/`:
1. **`deploy-dev.yml`**: Triggers on push to `dev`, builds the application, and deploys artifacts to `dev.asitb.et`.
2. **`deploy-main.yml`**: Triggers on push to `main`, builds the application, and deploys artifacts to `public_html/`.

### Required GitHub Repository Secrets

Add the following under **Settings > Secrets and variables > Actions** in your GitHub repository (`naolhassen/afar-sitb`):

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `CPANEL_FTP_SERVER` | Your cPanel FTP server host / IP | `ftp.asitb.et` or IP address |
| `CPANEL_FTP_USERNAME` | Your FTP account username | `deployer@asitb.et` or cPanel user |
| `CPANEL_FTP_PASSWORD` | Your FTP account password | `YourStrongPassword` |
| `CPANEL_FTP_PORT` *(optional)* | FTP/FTPS port | `21` (default) |
| `CPANEL_DEV_DIR` *(optional)* | Target directory for dev | `dev.asitb.et/` or `public_html/dev/` |
| `CPANEL_PROD_DIR` *(optional)* | Target directory for production | `public_html/` |

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking & linting
npm run lint

# Build production bundle (generates dist/ with .htaccess)
npm run build
```

---

## 🌐 cPanel Configuration

1. **Subdomain Setup**:
   - Create subdomain `dev.asitb.et` in cPanel pointing to `public_html/dev` or `dev.asitb.et`.
2. **SPA Routing**:
   - `public/.htaccess` is automatically included in `dist/` during build to handle client-side routing on Apache/cPanel without 404 errors.
3. **Database**:
   - PostgreSQL is provisioned on cPanel and can be connected to the API / backend services.
