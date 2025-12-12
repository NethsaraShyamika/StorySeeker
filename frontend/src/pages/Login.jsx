import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {authActions} from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.password) {
        alert("Both fields are required");
        return;
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          formData
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.data.role));
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("role", response.data.data.role);
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="bg-zinc-800 rounded-xl p-10 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-100 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 rounded bg-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded bg-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
          />
          <button
            type="submit"
            className="mt-4 bg-yellow-100 text-zinc-900 font-semibold p-3 rounded hover:bg-yellow-200 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-zinc-400 text-center">
          Don't have an account?{" "}
          <span
            className="text-yellow-100 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
