# Sthirix CMS

Strapi CMS backend for Sthirix application.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

Create a `.env` file in the cms directory with the following variables:

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## 🌐 Deployment

This CMS can be deployed independently to:
- AWS EC2
- Railway
- Render
- Heroku
- DigitalOcean

## 📚 Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Tutorials](https://strapi.io/tutorials)

