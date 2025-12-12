import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import {Link} from "react-router-dom"

const Settings = () => {

  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

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

        // backend returns { success: true, data: user }
        const user = response?.data?.data;
        if (user) {
          setProfileData(user);
          setValue({ address: user.address || "" });
        } else {
          console.error("Unexpected user-information response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetch();
  }, [headers]);

  return (
    <>
      {ProfileData === null && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex flex-col gap-8">
            <div className="">
              <label htmlFor="">User Name</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p> 
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p> 
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea 
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={(e) => setValue({ ...Value, address: e.target.value })}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={async () => {
                try {
                  const payload = { address: Value.address };
                  const resp = await axios.put(
                    "http://localhost:1000/api/v1/update-user",
                    payload,
                    { headers }
                  );
                  if (resp?.data?.data) {
                    setProfileData(resp.data.data);
                    alert("Profile updated successfully");
                  } else {
                    alert(resp?.data?.message || "Update failed");
                  }
                } catch (err) {
                  console.error("Update error:", err);
                  alert(err.response?.data?.message || "Update failed");
                }
              }}
              className="bg-yellow-700 text-zinc-900 font-emibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings