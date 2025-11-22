# StorySeeker Backend
**Where Stories Find Their Readers**

This repository contains the backend for **StorySeeker**, an online bookstore built with Node.js, Express, and MongoDB.  
The frontend is not yet implemented and will be added later.

## Features

- RESTful APIs for books, users, and orders
- JWT authentication
- CRUD operations for books and users
- Order management

## Setup

git clone <repo-url>
cd backend
npm install
npm install --save-dev nodemon


Create a .env file in the backend folder with your MongoDB connection and JWT secret, for example:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Start the server in development mode:
npm run dev

Notes

Backend only. Frontend will be added later.
.env and node_modules are ignored via .gitignore
