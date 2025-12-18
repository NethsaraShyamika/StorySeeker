import React, { useState } from "react";
import { Mail, Lock, User, MapPin, AlertCircle, CheckCircle, Eye, EyeOff, Loader } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showNotification("error", "Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await axios.post("http://localhost:1000/api/v1/signup", formData);
      
      showNotification("success", "Account created successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      showNotification("error", err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-12">
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
          notification.type === "success" 
            ? "bg-emerald-500/90 border-emerald-400 text-white" 
            : "bg-red-500/90 border-red-400 text-white"
        }`}>
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-yellow-400 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-yellow-500/25">
            <User className="w-8 h-8 text-zinc-900" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-zinc-400">Join us and start your journey today</p>
        </div>

        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-2xl p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.username 
                      ? "border-red-500 focus:ring-red-500/50" 
                      : "border-zinc-700 focus:ring-yellow-500/50 focus:border-yellow-500"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-500/50" 
                      : "border-zinc-700 focus:ring-yellow-500/50 focus:border-yellow-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-500/50" 
                      : "border-zinc-700 focus:ring-yellow-500/50 focus:border-yellow-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.address 
                      ? "border-red-500 focus:ring-red-500/50" 
                      : "border-zinc-700 focus:ring-yellow-500/50 focus:border-yellow-500"
                  }`}
                />
              </div>
              {errors.address && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.address}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-zinc-900 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <button
                onClick={handleLoginRedirect}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignUp;