import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGripLines, FaTimes, FaShoppingCart, FaUser, FaBook } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const [MobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileNav(false);
  }, [location]);

  const isActive = (url) => location.pathname === url;

  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "All Books", url: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role === "user") {
      links.push({ title: "Cart", url: "/cart", icon: FaShoppingCart });
      links.push({ title: "Profile", url: "/profile", icon: FaUser });
    }

    if (role === "admin") {
      links.push({ title: "Dashboard", url: "/profile" });
    }
  }

  return (
    <>
      <nav 
        className={`
          sticky top-0 z-50 text-white transition-all duration-300
          ${scrolled 
            ? 'bg-zinc-900/95 backdrop-blur-lg shadow-2xl border-b border-zinc-700/50' 
            : 'bg-linear-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-700/30'
          }
        `}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-orange-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                
                <div className="relative w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center ring-2 ring-yellow-500/30 group-hover:ring-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                  <FaBook className="text-white text-xl md:text-2xl" />
                </div>
              </div>
              
              <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-yellow-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                StorySeeker
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex gap-1">
                {links.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.url);

                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`
                        relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group
                        ${
                          active
                            ? "text-white bg-zinc-700/70"
                            : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
                        }
                      `}
                    >
                      {Icon && <Icon className="text-lg" />}
                      <span>{item.title}</span>
                      
                      {active && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-linear-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-full"></div>
                      )}
                      
                      {!active && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full group-hover:w-1/2 transition-all duration-300"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {!isLoggedIn && (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 border-2 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 hover:border-yellow-500"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <button
              className="lg:hidden text-2xl hover:text-yellow-400 transition-colors duration-300 p-2 hover:bg-zinc-700/50 rounded-lg"
              onClick={() => setMobileNav(!MobileNav)}
              aria-label="Toggle menu"
            >
              {MobileNav ? <FaTimes /> : <FaGripLines />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300
          ${MobileNav ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            MobileNav ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileNav(false)}
        ></div>

        <div
          className={`
            absolute top-0 right-0 h-full w-80 max-w-[85vw] 
            bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 
            shadow-2xl border-l border-zinc-700/50
            transform transition-transform duration-300 ease-out
            ${MobileNav ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full">
            
            <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <FaBook className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">
                  StorySeeker
                </span>
              </div>
              
              <button
                onClick={() => setMobileNav(false)}
                className="text-2xl text-zinc-400 hover:text-white p-2 hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-2">
                {links.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.url);

                  return (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`
                        flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-all duration-300
                        ${
                          active
                            ? "bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                            : "text-zinc-300 hover:text-white hover:bg-zinc-700/50"
                        }
                      `}
                      onClick={() => setMobileNav(false)}
                    >
                      {Icon && <Icon className="text-xl" />}
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-zinc-700/50 space-y-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block text-center px-6 py-3.5 border-2 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 font-semibold rounded-xl transition-all duration-300"
                    onClick={() => setMobileNav(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center px-6 py-3.5 bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
                    onClick={() => setMobileNav(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  to="/logout"
                  className="block text-center px-6 py-3.5 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-semibold rounded-xl transition-all duration-300"
                  onClick={() => setMobileNav(false)}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;