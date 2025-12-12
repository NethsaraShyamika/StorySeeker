# 📚 StorySeeker 
**📖 Where Stories Find Their Readers**

This repository contains the **full-stack implementation** of **StorySeeker**, an online bookstore platform designed to provide readers with seamless access to books, manage their profiles, and place orders efficiently.  
The backend is built with **Node.js, Express, and MongoDB**, providing a robust and scalable API, while the frontend is built with **React with Vite**, offering a responsive and interactive user interface.

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-yellow?logo=mongodb)](https://www.mongodb.com/)  
[![Vite](https://img.shields.io/badge/Build-Vite-red?logo=vite)](https://vitejs.dev/)  
[![NPM](https://img.shields.io/badge/NPM-v10.9.2-red?logo=npm)](https://www.npmjs.com/) 


## Features

StorySeeker provides a complete reading experience with both user and admin functionalities. Key features include:  

- ✅ User Authentication: Secure login and signup with JWT, ensuring safe access to profile and order features.
- 🔒 Protected Routes: Middleware ensures that sensitive routes such as user profiles and cart data are only accessible to authenticated users.
- ✍️ CRUD Operations: Users can update profile details, manage favorites, and admins can manage book listings and user data.
- 🛒 Shopping Cart & Order Management: Users can add books to the cart, remove items, view total prices, and place orders efficiently.
- 🖥️ Responsive Frontend Components: Includes Home, All Books, Cart, Login, Sign Up, Profile, About Us, and Book Details pages.
- 🌐 Tailwind CSS Design: Fully responsive layouts that adjust seamlessly to desktop, tablet, and mobile screens.
- 📄 Additional UI Enhancements: Hero section for featured books, Recently Added books carousel, smooth scrolling, and loading animations.
- 📦 Data Integrity: Backend routes handle data validation and errors gracefully, ensuring a robust user experience.
  

## 📁 Project Structure

<pre>
StorySeeker/
├── backend/                  # Node.js + Express backend
│   ├── models/               # MongoDB models (Book, Order, User)
│   ├── routes/               # API routes (user.js, auth.js, cart.js, order.js)
│   ├── middlewares/          # Authentication middleware (authenticateToken)
│   └── app.js                # Express server configuration and route setup
├── frontend/                 # React frontend with Vite
│   ├── public/               # Static assets like images
│   ├── src/
│   │   ├── assets/           # Images used across the site (Hero, book covers)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── BookCard/     
│   │   │   ├── Home/         # Hero.jsx, RecentlyAdded.jsx
│   │   │   ├── Loader/       # Loading animation
│   │   │   ├── Profile/      # Sidebar, Favourites, Settings, UserOrderHistory
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ViewBookDetails/ # Detailed book view
│   │   └── pages/            # Page-level components: Home, AllBooks, Cart, Login, SignUp, Profile
│   └── store/                # Redux store setup (auth.js, index.js)
└── README.md

</pre>


## 💻 Frontend Details

The frontend is designed for a smooth and interactive reading experience:

- **Hero Component**: Highlights featured books with engaging call-to-action buttons.
- **Recently Added Books**: A carousel or grid view that displays the newest additions to the bookstore.
- **Navbar**: Responsive navigation bar with links to Home, All Books, Cart, Profile, Login, and Sign Up.
- **Profile Page**: Comprehensive user dashboard with Sidebar navigation, Favourites, Settings, and Order History sections.
- **ViewBookDetails**: Displays book information, description, pricing, and options to add to cart or favorites.
- **ScrollToTop**: Smooth scroll behavior for better navigation between pages.
- Loader Component: Full-screen loader for API calls, improving user experience during data fetching.

All frontend pages are fully responsive, adjusting layouts automatically for desktop, tablet, and mobile screens using Tailwind CSS utility classes.

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
 
>The .env and node_modules directories are excluded via .gitignore.
>Frontend and backend run separately; frontend communicates with backend APIs over HTTP.
>JWT authentication protects all sensitive routes to ensure secure access.
>UI is designed to handle various screen sizes, providing a consistent and enjoyable user experience.
>Additional reusable components make it easier to expand features in the future.

With StorySeeker, readers can quickly find, preview, and purchase books while admins can manage the catalog efficiently. The combination of React + Vite frontend and Node.js + MongoDB backend ensures a scalable, modern web application architecture suitable for production deployments.
