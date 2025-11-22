# StorySeeker 📚
**Where Stories Find Their Readers** 📖

This repository contains the **full-stack implementation** of **StorySeeker**, an online bookstore.  
The backend is built with **Node.js, Express, and MongoDB**, and the frontend uses **React with Vite**.

## Features
- RESTful APIs for books, users, and orders ✅
- JWT authentication 🔒
- CRUD operations for books and users ✍️
- Order management 🛒
- Frontend home page with navigation bar and footer 🖥️

## Project Structure

<pre>
StorySeeker/
├── backend/ # Node.js + Express backend
├── frontend/ # React frontend
└── README.md
</pre>


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
 
>.env and node_modules are ignored via .gitignore  
>Currently, the frontend and backend are set up separately, and the frontend uses the backend APIs to fetch and send data.
