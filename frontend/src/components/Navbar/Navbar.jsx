import React from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "All Books", url: "/all-books" },
    { title: "Cart", url: "/cart" },
    { title: "Profile", url: "/profile" },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === false) {
    links.splice(3, 2);
  }

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-10 py-4 items-center justify-between">
        <Link to="/" className="flex items-center justify-between">
          <img
            className="w-10 h-10 inline mr-2 rounded"
            src="https://png.pngtree.com/template/20190727/ourlarge/pngtree-open-book-icon-simple-illustration-of-open-book-vector-icon-image_283605.jpg"
            alt=""
          />
          <h1 className="text-2xl font-semibold">StorySeeker</h1>
        </Link>
        <div className="nav-links-storyseeker block md:flex items-center justify-between gap-6">
          <div className="hidden md:flex gap-6 text-lg font-medium">
            {links.map((items, index) => (
              <>
                {items.title === "Profile" ? (
                  <Link
                    to={items.url}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={index}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.url}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={index}
                  >
                    {items.title}{" "}
                  </Link>
                )}
              </>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-6">
              <Link
                to="/login"
                className="border border-blue-500 hover:bg-blue-700 text-white hover:text-blue-500 font-bold py-1 px-2 rounded transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-white hover:bg-zinc-700 text-zinc-800 hover:text-white font-bold py-1 px-2 rounded transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-5 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, index) => (
          <Link
            to={items.url}
            className="text-white text-2xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            key={index}
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            {items.title}{" "}
          </Link>
        ))}

        {isLoggedIn === false ? (
          <>
            <Link
              to="/login"
              className={`${MobileNav} border border-blue-500 hover:bg-blue-700 text-white hover:text-blue-500 font-bold py-2 px-8 mb-8 rounded transition-all duration-300`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={`${MobileNav} bg-white hover:bg-zinc-700 text-zinc-800 hover:text-white font-bold py-2 px-8 mb-8 rounded transition-all duration-300`}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/logout"
              className={`${MobileNav} border border-red-500 hover:bg-red-700 text-white hover:text-red-500 font-bold py-2 px-8 mb-8 rounded transition-all duration-300`}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
