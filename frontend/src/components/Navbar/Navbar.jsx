import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [MobileNav, setMobileNav] = useState("hidden");

  // 🔹 Build links dynamically (NO mutation bugs)
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "All Books", url: "/all-books" },
  ];

  if (isLoggedIn) {
    links.push({ title: "Cart", url: "/cart" });

    if (role === "user") {
      links.push({ title: "Profile", url: "/profile" });
    }

    if (role === "admin") {
      links.push({ title: "Admin Profile", url: "/profile" });
    }
  }

  return (
    <>
      {/* ================= Desktop Navbar ================= */}
      <nav className="z-50 relative flex bg-zinc-800 text-white px-10 py-4 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded"
            src="https://png.pngtree.com/template/20190727/ourlarge/pngtree-open-book-icon-simple-illustration-of-open-book-vector-icon-image_283605.jpg"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">StorySeeker</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-lg font-medium">
            {links.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          {!isLoggedIn && (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="border border-blue-500 hover:bg-blue-700 text-white hover:text-blue-500 font-bold py-1 px-3 rounded transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-white hover:bg-zinc-700 text-zinc-800 hover:text-white font-bold py-1 px-3 rounded transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-2xl hover:text-zinc-400"
          onClick={() =>
            setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
          }
        >
          <FaGripLines />
        </button>
      </nav>

      {/* ================= Mobile Navbar ================= */}
      <div
        className={`${MobileNav} bg-zinc-800 h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            className="text-white text-2xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="border border-blue-500 hover:bg-blue-700 text-white hover:text-blue-500 font-bold py-2 px-10 mb-6 rounded transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white hover:bg-zinc-700 text-zinc-800 hover:text-white font-bold py-2 px-10 rounded transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/logout"
            className="border border-red-500 hover:bg-red-700 text-white hover:text-red-500 font-bold py-2 px-10 rounded transition-all duration-300"
            onClick={() => setMobileNav("hidden")}
          >
            Logout
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
