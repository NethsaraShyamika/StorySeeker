# 📚 StorySeeker 
**📖 Where Stories Find Their Readers**

This repository contains the **full-stack implementation** of **StorySeeker**, an online bookstore.  
The backend is built with **Node.js, Express, and MongoDB**, and the frontend uses **React with Vite**.

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-yellow?logo=mongodb)](https://www.mongodb.com/)  
[![Vite](https://img.shields.io/badge/Build-Vite-red?logo=vite)](https://vitejs.dev/)  
[![NPM](https://img.shields.io/badge/NPM-v10.9.2-red?logo=npm)](https://www.npmjs.com/) 


## Features

- ✅ RESTful APIs for books, users, and orders 
- 🔒 JWT authentication for secure login
- ✍️ CRUD operations for books and users 
- 🛒 Order management 
- 🖥️ Responsive frontend: Home, All Books, Login, Sign Up, Cart, Profile, About Us
- 📄 Additional UI components: Hero section, Navbar, Recently Added Books, Book Details, Loader
- 🌐 Fully responsive design with Tailwind CSS
  

## 📁 Project Structure

<pre>
StorySeeker/
├── backend/                  # Node.js + Express backend
│   ├── models/               # MongoDB models (Book, Order, User)
│   ├── routes/               # API routes (user.js, auth.js)
│   └── app.js                # Express server setup
├── frontend/                 # React frontend with Vite
│   ├── public/               # Images and static assets
│   ├── src/
│   │   ├── assets/           # Images (Hero.png, etc.)
│   │   ├── components/       # Reusable components
│   │   │   ├── BookCard/     
│   │   │   ├── Home/         # Hero.jsx, RecentlyAdded.jsx
│   │   │   ├── Loader/       
│   │   │   ├── Profile/      # Sidebar, Settings, Favourites, UserOrderHistory
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ViewBookDetails/
│   │   └── pages/            # Home, AllBooks, Login, SignUp, Cart, Profile, AboutUs
│   └── store/                # Redux store (auth.js, index.js)
└── README.md

</pre>


## 💻 Frontend Details

- **Hero Component**: Featured section on the home page with call-to-action button
- **Recently Added Books**: Carousel/section showcasing new books
- **Navbar**: Responsive navigation with hover effects, Sign In / Sign Up buttons
- **Profile Page**: User profile with Sidebar, Favourites, Settings, and Order History
- **ViewBookDetails**: Page to display book info and add to cart
- **ScrollToTop**: Smooth scrolling when navigating between pages
  

## ⚙️ Setup

◽Backend
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
  PORT=PORT_NUM  # Replace PORT_NUM with the port you want the server to run on
</pre>

◽Start the backend server:
```bash
npm run dev
```

◽Frontend
```bash
cd frontend
npm install
npm run dev
```


## 📝 Notes 
 
>.env and node_modules are ignored via .gitignore  
>Backend and frontend run separately; frontend interacts with backend APIs
>Responsive design ensures a smooth experience across devices
>New components added: BookCard, RecentlyAdded, Loader, Profile subcomponents, ViewBookDetails, ScrollToTop
