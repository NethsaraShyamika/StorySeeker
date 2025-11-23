import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const links = [
        {title: "Home", url: "/"},
        {title: "About", url: "/about"},
        {title: "All Books", url: "/all-books"},
        {title: "Cart", url: "/cart"},
        {title: "Profile", url: "/profile"},
    ];
  return (
    <div className="flex bg-zinc-800 text-white px-10 py-4 items-center justify-between">
      <Link to="/" className="flex items-center justify-between">
        <img
        className="w-10 h-10 inline mr-2 rounded" 
        src="https://png.pngtree.com/template/20190727/ourlarge/pngtree-open-book-icon-simple-illustration-of-open-book-vector-icon-image_283605.jpg" 
        alt="" />
        <h1 className="text-2xl font-semibold">StorySeeker</h1>
        </Link>
      <div className="nav-links-storyseeker flex items-center justify-between gap-6">
        <div className="flex gap-6 text-lg font-medium">
            {links.map((items, index) => (
            <Link to={items.url}
            className="hover:text-blue-500 transition-all duration-300" 
            key={index}
            > 
            {items.title} {" "}
            </Link>
            ))}
        </div>
        <div className="flex gap-6">
            <Link to="/login" className="border border-blue-500 hover:bg-blue-700 text-white hover:text-blue-500 font-bold py-1 px-2 rounded transition-all duration-300">Sign In</Link>
            <Link to="/signup" className="bg-white hover:bg-zinc-700 text-zinc-800 hover:text-white font-bold py-1 px-2 rounded transition-all duration-300">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
