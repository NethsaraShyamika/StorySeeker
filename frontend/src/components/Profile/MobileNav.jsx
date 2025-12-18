import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaClockRotateLeft,
  FaGear,
  FaBoxesStacked,
  FaBookMedical,
} from "react-icons/fa6";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const userMenuItems = [
    { to: "/profile", label: "Favourites", icon: FaHeart },
    { to: "/profile/order-history", label: "Orders", icon: FaClockRotateLeft },
    { to: "/profile/settings", label: "Settings", icon: FaGear },
  ];

  const adminMenuItems = [
    { to: "/profile", label: "All Orders", icon: FaBoxesStacked },
    { to: "/profile/add-book", label: "Add Book", icon: FaBookMedical },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  if (role !== "user" && role !== "admin") return null;

  return (
    <div className="w-full my-6 lg:hidden md:hidden">
      <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-zinc-700/50">
        <div className="flex gap-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`
                relative flex-1 flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl font-medium text-xs transition-all duration-300
                ${
                  isActive(item.to)
                    ? "bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }
              `}
            >
              {isActive(item.to) && (
                <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-xl animate-pulse"></div>
              )}
              <item.icon
                className={`text-xl z-10 transition-transform duration-300 ${
                  isActive(item.to) ? "scale-110" : ""
                }`}
              />
              <span className="z-10 font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-700/50 shadow-2xl z-50">
        <div className="flex justify-around items-center py-4 px-2 max-w-md mx-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300
                ${
                  isActive(item.to)
                    ? "text-blue-400 scale-110"
                    : "text-zinc-500 hover:text-zinc-300"
                }
              `}
            >
              <item.icon
                className={`text-2xl ${
                  isActive(item.to) ? "animate-bounce" : ""
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive(item.to) && (
                <div className="absolute -bottom-1 w-12 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="relative bg-linear-to-br from-zinc-900 to-zinc-800 rounded-2xl p-1.5 shadow-xl border border-zinc-700/50">
        <div className="relative flex gap-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`
                relative flex-1 text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden
                ${
                  isActive(item.to)
                    ? "text-zinc-900 shadow-lg"
                    : "text-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              {isActive(item.to) && (
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl"></div>
              )}
              <div className="relative z-10 flex items-center justify-center gap-2">
                <item.icon className="text-lg" />
                <span className="hidden sm:inline">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
