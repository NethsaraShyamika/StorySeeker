# 📚 StorySeeker 
**📖 Where Stories Find Their Readers**

This repository contains the **full-stack implementation** of **StorySeeker**, an online bookstore.  
The backend is built with **Node.js, Express, and MongoDB**, and the frontend uses **React with Vite**.


## Features

- ✅ RESTful APIs for books, users, and orders 
- 🔒 JWT authentication 
- ✍️ CRUD operations for books and users 
- 🛒 Order management 
- 🖥️ Frontend home page with navigation bar, hero section, and footer 
- 📄 Additional pages: All Books, Login, Sign Up, Cart, Profile, About Us 
- 🌐 Responsive design with Tailwind CSS
  

## 📁 Project Structure

<pre>
StorySeeker/
├── backend/       # Node.js + Express backend
├── frontend/      # React frontend with Vite
│   ├── public/   # Images and static assets
│   ├── src/
│   │   ├── components/  # Reusable components (Navbar, Footer, Hero, etc.)
│   │   └── pages/       # Page components (Home, AllBooks, Login, SignUp, Cart, Profile, AboutUs)
└── README.md
</pre>


## 💻 Frontend Details

- **Hero Component**: Featured on the home page with promotional text and call-to-action button.
- **Navbar**: Includes navigation links, Sign In / Sign Up buttons, and responsive hover effects.
- **Pages**: Home, AllBooks, Login, SignUp, Cart, Profile, AboutUs.
- **Styling**: Tailwind CSS for responsive and modern UI design.
  

## ⚙️ Setup

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

◽Start the frontend
```bash
npm install
npm run dev
```


## 📝 Notes 
 
>.env and node_modules are ignored via .gitignore  
>Frontend and backend are set up separately; the frontend interacts with backend APIs to fetch and send data.
>Hero section and navigation bar are designed to be responsive across devices.
