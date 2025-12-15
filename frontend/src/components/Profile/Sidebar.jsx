import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-900 p-6 rounded-xl h-full flex flex-col items-center gap-6 shadow-lg border border-zinc-800">
      <div className="flex flex-col items-center gap-2">
        <img
          src={
            data?.avatar ||
            "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
          }
          alt="avatar"
          className="rounded-full w-40 h-40 object-cover border-2 border-zinc-700 shadow-md"
        />

        <h2 className="text-white text-xl font-semibold tracking-wide">
          {data.username}
        </h2>

        <p className="text-gray-400 text-sm">{data.email}</p>
        <p className="text-gray-400 text-sm">{data.address}</p>

        <div className="w-full h-px bg-zinc-700 mt-3 hidden lg:block"></div>
      </div>

      {role === "User" && (
        <div className="w-full hidden lg:flex flex-col items-center gap-4">
          <Link
            to="/profile"
            className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            Favourites
          </Link>

          <Link
            to="/profile/order-history"
            className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full hidden lg:flex flex-col items-center gap-4">
          <Link
            to="/profile"
            className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            All Orders
          </Link>

          <Link
            to="/profile/add-book"
            className="w-full text-center py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 font-medium"
          >
            Add Book
          </Link>
        </div>
      )}

      <button
        className="bg-red-600 w-full text-white font-semibold flex items-center justify-center py-2 rounded-lg hover:bg-red-500 transition duration-300 shadow"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole());
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log Out
        <FaArrowRightFromBracket className="inline ml-3 text-lg" />
      </button>
    </div>
  );
};

export default Sidebar;
