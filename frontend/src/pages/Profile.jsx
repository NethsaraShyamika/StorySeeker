import React, { useEffect, useState, useMemo, createContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
import { AlertCircle, RefreshCw } from "lucide-react";
import api from "../api/axios";

export const UserProfileContext = createContext();

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get(
        "/user-information",
        { headers }
      );
      
      if (response?.data?.data) {
        setProfile(response.data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile. Please try again.");
      
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [headers]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="px-4 md:px-12 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/6">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-6 animate-pulse">
                <div className="w-24 h-24 bg-zinc-700/50 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-zinc-700/50 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-zinc-700/50 rounded w-1/2 mx-auto mb-6"></div>
                <div className="space-y-3">
                  <div className="h-10 bg-zinc-700/50 rounded-lg"></div>
                  <div className="h-10 bg-zinc-700/50 rounded-lg"></div>
                  <div className="h-10 bg-zinc-700/50 rounded-lg"></div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-5/6">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 animate-pulse">
                <div className="h-8 bg-zinc-700/50 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-zinc-700/50 rounded w-full"></div>
                  <div className="h-4 bg-zinc-700/50 rounded w-5/6"></div>
                  <div className="h-4 bg-zinc-700/50 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-zinc-400 mb-6">{error}</p>
          <button
            onClick={fetchProfile}
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, fetchProfile }}>
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="px-4 md:px-12 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/6">
              <div className="sticky top-8">
                <div className="hidden md:block bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:border-zinc-600/50">
                  <Sidebar data={profile} />
                </div>
                <div className="md:hidden">
                  <MobileNav />
                </div>
              </div>
            </div>

            <div className="w-full md:w-5/6">
              <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl overflow-hidden">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserProfileContext.Provider>
  );
};

export default Profile;