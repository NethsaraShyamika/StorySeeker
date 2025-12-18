import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket, FaHeart, FaClockRotateLeft, FaGear, FaBoxesStacked, FaBookMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole());
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  };

  const userMenuItems = [
    { to: "/profile", label: "Favourites", icon: FaHeart },
    { to: "/profile/order-history", label: "Order History", icon: FaClockRotateLeft },
    { to: "/profile/settings", label: "Settings", icon: FaGear },
  ];

  const adminMenuItems = [
    { to: "/profile", label: "All Orders", icon: FaBoxesStacked },
    { to: "/profile/add-book", label: "Add Book", icon: FaBookMedical },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div className="bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 rounded-2xl h-full flex flex-col shadow-2xl border border-zinc-700/50 backdrop-blur-sm">
      <div className="flex flex-col items-center mb-6">
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <img
            src={
              data?.avatar ||
              "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            }
            alt="avatar"
            className="relative rounded-full w-32 h-32 object-cover border-4 border-zinc-800 shadow-xl ring-2 ring-blue-500/30"
          />
        </div>

        <h2 className="text-white text-2xl font-bold tracking-wide mb-1 text-center">
          {data.username}
        </h2>

        <p className="text-zinc-400 text-sm mb-1 text-center">{data.email}</p>
        
        {data.address && (
          <p className="text-zinc-500 text-xs text-center max-w-[200px] truncate">
            {data.address}
          </p>
        )}

        {role === "admin" && (
          <span className="mt-3 px-4 py-1 bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
            ADMIN
          </span>
        )}
      </div>

      <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent mb-6 hidden lg:block"></div>

      <nav className="w-full hidden lg:flex flex-col gap-2 grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="group relative w-full text-left px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/70 transition-all duration-300 font-medium text-zinc-300 hover:text-white flex items-center gap-3 overflow-hidden border border-zinc-700/30 hover:border-zinc-600/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>
            <item.icon className="text-lg z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="z-10">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        className="mt-6 relative w-full text-white font-semibold flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden border border-red-500/30"
        onClick={handleLogout}
      >
        <div className="absolute inset-0 bg-linear-to-r from-red-400/0 via-red-400/20 to-red-400/0 group-hover:via-red-400/30 transition-all duration-300"></div>
        <span className="z-10">Log Out</span>
        <FaArrowRightFromBracket className="z-10 text-lg group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default Sidebar;