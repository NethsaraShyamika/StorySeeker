import React, { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/user-information",
          { headers }
        );
        // expect response.data.data to be the user object
        if (response?.data?.data) {
          setProfile(response.data.data);
        } else {
          console.error("Unexpected profile response:", response);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // clear possible invalid auth and keep user on login route
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
      }
    };

    fetch();
  }, [headers]);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 text-white gap-6">
      {!Profile && (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}

      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={Profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
