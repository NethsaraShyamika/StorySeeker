import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBook, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/login",
        formData
      );
      
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.data.role));
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }
               
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
      
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Invalid credentials. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-4 shadow-lg">
            <FaBook className="w-10 h-10 text-zinc-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400 text-lg">Sign in to continue your reading journey</p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-700">
          {errors.submit && (
            <div className="mb-6 bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3 animate-fade-in">
              <FaExclamationCircle className="text-xl shrink-0" />
              <span className="text-sm">{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg bg-zinc-900 text-zinc-100 placeholder-zinc-500 border-2 transition-colors focus:outline-none ${
                    errors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-yellow-500"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-lg bg-zinc-900 text-zinc-100 placeholder-zinc-500 border-2 transition-colors focus:outline-none ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-transparent focus:border-yellow-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle className="text-xs" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-zinc-400 text-sm">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-linear-to-r from-yellow-400 to-yellow-500 text-zinc-900 font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-800 text-zinc-500">OR</span>
            </div>
          </div>

          <p className="text-center text-zinc-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-zinc-500 text-sm">
            By signing in, you agree to our{" "}
            <button className="text-zinc-400 hover:text-zinc-300 underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-zinc-400 hover:text-zinc-300 underline">
              Privacy Policy
            </button>
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-lg mb-2 border border-zinc-700">
              <FaBook className="text-yellow-400 text-xl" />
            </div>
            <p className="text-zinc-400 text-xs">10K+ Books</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-lg mb-2 border border-zinc-700">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>
            <p className="text-zinc-400 text-xs">Verified</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-lg mb-2 border border-zinc-700">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-zinc-400 text-xs">Easy Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;