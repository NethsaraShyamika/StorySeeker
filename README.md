# StorySeeker 📚
**Where Stories Find Their Readers** 📖

This repository contains the backend for **StorySeeker**, an online bookstore built with Node.js, Express, and MongoDB.  
The frontend is not yet implemented and will be added later.

## Features
- RESTful APIs for books, users, and orders ✅
- JWT authentication 🔒
- CRUD operations for books and users ✍️
- Order management 🛒

## Setup

```bash
git clone <repo-url>
cd backend
npm install
npm install --save-dev nodemon
```

◽Create a .env file in the backend folder with your MongoDB connection and JWT secret, for example:
<pre>
  MONGODB_URI=your_mongodb_connection_string  
  JWT_SECRET=your_jwt_secret  
  PORT=5000  
</pre>



◽Start the server in development mode:
```bash
npm run dev
```

## 📝 Notes 

>Backend only. Frontend will be added later.  
>.env and node_modules are ignored via .gitignore  
