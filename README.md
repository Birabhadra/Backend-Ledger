# 🏦 Backend Ledger

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) 
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v16+-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Security](#-security)
- [Contributing](#-contributing)

---

## 🎯 Overview

**Backend Ledger** is a modern, secure, and scalable backend application for managing financial transactions, user accounts, and ledger operations. Built with Node.js and Express.js, it provides a robust API for transaction management with enterprise-grade security features.

> 💡 A comprehensive ledger system designed for modern financial applications with authentication, account management, and transaction tracking capabilities.

---

## ✨ Features

✅ **User Authentication & Authorization**
- Secure JWT-based authentication
- Password encryption with bcryptjs
- Cookie-based session management

✅ **Account Management**
- Create, read, update, and delete accounts
- User profile management
- Account balance tracking

✅ **Transaction Tracking**
- Record and manage financial transactions
- Transaction history and reporting
- Real-time transaction updates

✅ **Email Notifications**
- Automated email notifications via Nodemailer
- Transaction confirmations
- Account alerts

✅ **Security First**
- Password hashing and encryption
- JWT token-based API security
- Secure cookie handling
- Environment variable protection

✅ **Developer Friendly**
- RESTful API design
- Comprehensive error handling
- Modular code architecture
- Easy to extend and customize

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5.2.1 |
| **Database** | MongoDB + Mongoose v9.3.0 |
| **Authentication** | JWT (jsonwebtoken v9.0.3) |
| **Security** | bcryptjs v3.0.3 |
| **Email** | Nodemailer v8.0.2 |
| **Utilities** | Cookie Parser v1.4.7, Dotenv v17.3.1 |
| **Development** | Nodemon v3.1.14 |

---


---

## ⚙️ Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or Cloud - Atlas)
- **npm** or **yarn** package manager

### Step-by-Step Setup

1. **Clone the Repository**
```bash
git clone https://github.com/Birabhadra/Backend-Ledger.git
cd Backend-Ledger
```
Install Dependencies
```bash
npm install
```
Configure Environment Variables Create a .env file in the root directory:
.env
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/backend-ledger
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development
```
Start the Server
```bash
# Development mode (with hot-reload)
npm run dev

# Production mode
npm start
Server runs on: http://localhost:3000
```


## ✨ Features

✅ **User Authentication & Authorization**
- Secure JWT-based authentication
- Password encryption with bcryptjs
- Cookie-based session management

✅ **Account Management**
- Create, read, update, and delete accounts
- User profile management
- Account balance tracking

✅ **Transaction Tracking**
- Record and manage financial transactions
- Transaction history and reporting
- Real-time transaction updates

✅ **Email Notifications**
- Automated email notifications via Nodemailer
- Transaction confirmations
- Account alerts

✅ **Security First**
- Password hashing and encryption
- JWT token-based API security
- Secure cookie handling
- Environment variable protection

✅ **Developer Friendly**
- RESTful API design
- Comprehensive error handling
- Modular code architecture
- Easy to extend and customize

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5.2.1 |
| **Database** | MongoDB + Mongoose v9.3.0 |
| **Authentication** | JWT (jsonwebtoken v9.0.3) |
| **Security** | bcryptjs v3.0.3 |
| **Email** | Nodemailer v8.0.2 |
| **Utilities** | Cookie Parser v1.4.7, Dotenv v17.3.1 |
| **Development** | Nodemon v3.1.14 |

---

## 📁 Project Structure

```
Backend-Ledger/
├── src/
│   ├── app.js                 # Express app configuration
│   │
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Account.js
│   │   └── Transaction.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── accountController.js
│   │   └── transactionController.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── accountService.js
│   │   └── transactionService.js
│   │
│   └── templates/
│       └── emailTemplates.js
│
├── server.js                  # Application entry point
├── package.json              # Dependencies
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or Cloud - Atlas)
- **npm** or **yarn** package manager

### Step-by-Step Setup

1. **Clone the Repository**
```bash
git clone https://github.com/Birabhadra/Backend-Ledger.git
cd Backend-Ledger
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment Variables**
Create a `.env` file in the root directory (see Environment Variables section below)

4. **Start the Server**
```bash
# Development mode (with hot-reload)
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:3000`

---

## 🔌 API Endpoints

### 🔐 Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /register | Register new user | ❌ No |
| POST | /login | User login | ❌ No |
| POST | /logout | User logout | ✅ Yes |
| GET | /verify | Verify token | ✅ Yes |

**Register Example:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Login Example:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

---

### 💳 Account Routes (`/api/account`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /create | Create new account | ✅ Yes |
| GET | /all | Get all accounts | ✅ Yes |
| GET | /:id | Get account by ID | ✅ Yes |
| PUT | /:id | Update account | ✅ Yes |
| DELETE | /:id | Delete account | ✅ Yes |
| GET | /:id/balance | Get account balance | ✅ Yes |

**Create Account Example:**

```json
{
  "accountName": "Savings Account",
  "accountType": "savings",
  "initialBalance": 10000,
  "currency": "USD"
}
```

---

### 💰 Transaction Routes (`/api/transaction`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /create | Create transaction | ✅ Yes |
| GET | /all | Get all transactions | ✅ Yes |
| GET | /:id | Get transaction by ID | ✅ Yes |
| PUT | /:id | Update transaction | ✅ Yes |
| DELETE | /:id | Delete transaction | ✅ Yes |
| GET | /account/:accountId | Get account transactions | ✅ Yes |

**Create Transaction Example:**

```json
{
  "accountId": "64a3f2e8b9c1d2e3f4g5h6i7",
  "type": "deposit",
  "amount": 5000,
  "description": "Monthly salary",
  "date": "2026-03-19"
}
```

---

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/backend-ledger
DB_NAME=backend-ledger

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Email Settings
SENDER_NAME=Backend Ledger
SENDER_EMAIL=noreply@backendledger.com

# Session
SESSION_SECRET=your_session_secret_key
COOKIE_EXPIRE=7

# API Configuration
API_VERSION=v1
API_PREFIX=/api
```

> ⚠️ **Never commit `.env` file to version control!** Use `.env.example` instead.

---

## 🚀 Usage

### Development Mode
```bash
npm run dev
```
- Automatically restarts on file changes
- Useful for development and testing

### Production Mode
```bash
npm start
```
- Optimized for performance
- Recommended for production deployments

### Testing
```bash
npm test
```
- Run test suite (when configured)

---

## 🔒 Security Features

### Password Security
```javascript
// Passwords are hashed using bcryptjs with salt rounds
bcryptjs with 10 salt rounds
```

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Automatic token expiration (7 days default)
- **Refresh Tokens**: Support for token refresh mechanism

### Data Protection
- ✅ Environment variable protection
- ✅ Secure cookie handling with HttpOnly flag
- ✅ CORS configuration for API security
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (via Mongoose)

### Best Practices
- 🔐 Never expose sensitive data in responses
- 🔐 Always use HTTPS in production
- 🔐 Implement rate limiting on API endpoints
- 🔐 Keep dependencies updated regularly
- 🔐 Use strong, unique JWT secrets

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Steps to Contribute

1. **Fork the Repository**
```bash
Click "Fork" button on GitHub
```

2. **Clone Your Fork**
```bash
git clone https://github.com/YOUR_USERNAME/Backend-Ledger.git
cd Backend-Ledger
```

3. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make Your Changes**
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic

5. **Commit Your Changes**
```bash
git commit -m "feat: add your feature description"
```

6. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request**
- Go to the original repository
- Click "New Pull Request"
- Describe your changes clearly

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Write ES6+ JavaScript

### Commit Message Format
```
feat: add new feature
fix: fix bug description
docs: update documentation
refactor: refactor code
test: add tests
```

---


## 👨‍💻 Author

**Birabhadra** - [GitHub Profile](https://github.com/Birabhadra)

---


## 🙏 Acknowledgments

- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing library
- **Nodemailer** - Email service

---

<div align="center">

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

**Last Updated**: March 19, 2026 | **Version**: 1.0.0

</div>
```

---
