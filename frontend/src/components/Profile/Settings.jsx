import React, { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";
import { UserProfileContext } from "../../pages/Profile";

const Settings = () => {
  const { profile, setProfile } = useContext(UserProfileContext);
  const [Value, setValue] = useState({ address: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    if (profile) {
      setValue({ address: profile.address || "" });
    }
  }, [profile]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = { address: Value.address };
      const resp = await axios.put(
        "http://localhost:1000/api/v1/update-user",
        payload,
        { headers }
      );
      if (resp?.data?.data) {
        setProfile(resp.data.data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert(resp?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {profile === null && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {profile && (
        <div className="h-full p-0 md:p-6 text-zinc-100 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-zinc-200 to-zinc-500 mb-2">
              Account Settings
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">
              Manage your profile information and preferences
            </p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 animate-fade-in">
              <FaCheckCircle className="text-green-500 text-xl" />
              <span className="text-green-400 font-medium">
                Profile updated successfully!
              </span>
            </div>
          )}

          <div className="bg-linear-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl border border-zinc-700/50 overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <div className="group">
                <label className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-3">
                  <FaUser className="text-blue-400" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={profile.username}
                    disabled
                    className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 font-semibold text-zinc-300 cursor-not-allowed focus:outline-none"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-zinc-700/0 via-zinc-700/5 to-zinc-700/0 pointer-events-none"></div>
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-3">
                  <FaEnvelope className="text-purple-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 font-semibold text-zinc-300 cursor-not-allowed focus:outline-none"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-zinc-700/0 via-zinc-700/5 to-zinc-700/0 pointer-events-none"></div>
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-zinc-400 text-sm font-medium mb-3">
                  <FaMapMarkerAlt className="text-green-400" />
                  Delivery Address
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-4 rounded-xl bg-zinc-800/80 border border-zinc-700/50 font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none hover:border-zinc-600/50"
                    rows="5"
                    placeholder="Enter your delivery address..."
                    name="address"
                    value={Value.address}
                    onChange={(e) =>
                      setValue({ ...Value, address: e.target.value })
                    }
                  ></textarea>
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-pink-500/5 pointer-events-none transition-all duration-300"></div>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  This address will be used for order deliveries
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border-t border-zinc-700/50 px-6 md:px-8 py-4 flex justify-between items-center">
              <p className="text-xs text-zinc-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="group relative px-6 py-3 bg-linear-to-r from-yellow-600 to-yellow-700 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 group-hover:via-yellow-400/30 transition-all duration-300"></div>
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="z-10">Updating...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="z-10 group-hover:scale-110 transition-transform duration-300" />
                    <span className="z-10">Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <p className="text-blue-400 text-sm">
              <strong>Note:</strong> Username and email cannot be changed.
              Contact support if you need to update these fields.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
