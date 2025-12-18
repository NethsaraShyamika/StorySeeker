import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Image,
  BookOpen,
  User,
  DollarSign,
  Globe,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowLeft,
  Save,
} from "lucide-react";

const UpdateBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!data.url.trim()) {
      newErrors.url = "Image URL is required";
    } else if (!/^https?:\/\/.+/.test(data.url)) {
      newErrors.url = "Please enter a valid URL";
    }

    if (!data.title.trim()) {
      newErrors.title = "Book title is required";
    } else if (data.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!data.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!data.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(data.price) || parseFloat(data.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!data.language.trim()) {
      newErrors.language = "Language is required";
    }

    if (!data.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    } else if (data.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

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
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        data,
        { headers }
      );

      showNotification("success", "Book updated successfully!");

      setTimeout(() => {
        navigate(`/view-book-details/${id}`);
      }, 2000);
    } catch (error) {
      showNotification(
        "error",
        error.response?.data?.message || "Failed to update book"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/view-book-details/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: id,
        };
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`,
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        showNotification("error", "Failed to load book data");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [id]);

  if (isFetching) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 animate-pulse">
            <div className="h-8 bg-zinc-700/50 rounded w-1/3 mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-zinc-700/50 rounded w-1/4 mb-2"></div>
                  <div className="h-12 bg-zinc-700/50 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4 md:p-8">
      {notification.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-500/90 border-emerald-400 text-white"
              : "bg-red-500/90 border-red-400 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Details
            </button>
            <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Update Book
            </h1>
            <p className="text-zinc-400 mt-2">
              Edit the book information below
            </p>
          </div>
        </div>

        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-2xl p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Book Cover Image
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Image className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="url"
                  placeholder="https://example.com/book-cover.jpg"
                  value={data.url}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.url
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.url && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.url}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Book Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BookOpen className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={data.title}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.title && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Author
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={data.author}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.author
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.author && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.author}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Language
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    name="language"
                    placeholder="e.g., English"
                    value={data.language}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.language
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                    }`}
                  />
                </div>
                {errors.language && (
                  <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.language}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={data.price}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.price
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.price}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g., Fiction, Non-Fiction, Science"
                  value={data.category}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.category && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                  <FileText className="w-5 h-5 text-zinc-500" />
                </div>
                <textarea
                  name="description"
                  placeholder="Enter a detailed description of the book..."
                  value={data.description}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-900/50 border rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.description && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Book
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
