import React, { useState } from "react";
import axios from "axios";
import { FaBook, FaUser, FaDollarSign, FaLanguage, FaImage, FaTags, FaFileAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const AddBooks = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Technology",
    "Other"
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Russian",
    "Other"
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!data.url.trim()) newErrors.url = "Image URL is required";
    else if (!data.url.match(/^https?:\/\/.+\..+/)) newErrors.url = "Please enter a valid URL";

    if (!data.title.trim()) newErrors.title = "Title is required";
    if (!data.author.trim()) newErrors.author = "Author is required";
    
    if (!data.price) newErrors.price = "Price is required";
    else if (isNaN(data.price) || parseFloat(data.price) <= 0) newErrors.price = "Please enter a valid price";

    if (!data.language) newErrors.language = "Language is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.description.trim()) newErrors.description = "Description is required";
    else if (data.description.length < 20) newErrors.description = "Description must be at least 20 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        data,
        { headers }
      );

      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
        category: "",
      });

      setSuccessMessage(response.data.message || "Book added successfully!");
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);

    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Failed to add book. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-2 flex items-center gap-3">
            <FaBook className="text-blue-500" />
            Add New Book
          </h1>
          <p className="text-zinc-400 text-lg">Fill in the details to add a new book to the collection</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-500/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg flex items-center gap-3 animate-fade-in">
            <FaCheckCircle className="text-2xl" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 bg-red-500/20 border border-red-500 text-red-400 px-6 py-4 rounded-lg flex items-center gap-3 animate-fade-in">
            <FaExclamationCircle className="text-2xl" />
            <span className="font-medium">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={submit} className="bg-zinc-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                <FaImage className="text-blue-400" />
                Book Cover Image URL
              </label>
              <input
                type="text"
                className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors ${
                  errors.url ? "border-red-500" : "border-transparent focus:border-blue-500"
                }`}
                placeholder="https://example.com/book-cover.jpg"
                name="url"
                value={data.url}
                onChange={change}
              />
              {errors.url && <p className="text-red-400 text-sm mt-1">{errors.url}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                <FaBook className="text-blue-400" />
                Book Title
              </label>
              <input
                type="text"
                className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors ${
                  errors.title ? "border-red-500" : "border-transparent focus:border-blue-500"
                }`}
                placeholder="Enter book title"
                name="title"
                value={data.title}
                onChange={change}
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                <FaUser className="text-blue-400" />
                Author Name
              </label>
              <input
                type="text"
                className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors ${
                  errors.author ? "border-red-500" : "border-transparent focus:border-blue-500"
                }`}
                placeholder="Enter author name"
                name="author"
                value={data.author}
                onChange={change}
              />
              {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                  <FaLanguage className="text-blue-400" />
                  Language
                </label>
                <select
                  className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors cursor-pointer ${
                    errors.language ? "border-red-500" : "border-transparent focus:border-blue-500"
                  }`}
                  name="language"
                  value={data.language}
                  onChange={change}
                >
                  <option value="">Select language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                  <FaDollarSign className="text-blue-400" />
                  Price (RS)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors ${
                    errors.price ? "border-red-500" : "border-transparent focus:border-blue-500"
                  }`}
                  placeholder="0.00"
                  name="price"
                  value={data.price}
                  onChange={change}
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                <FaTags className="text-blue-400" />
                Category
              </label>
              <select
                className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors cursor-pointer ${
                  errors.category ? "border-red-500" : "border-transparent focus:border-blue-500"
                }`}
                name="category"
                value={data.category}
                onChange={change}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-zinc-300 font-medium mb-2">
                <FaFileAlt className="text-blue-400" />
                Book Description
              </label>
              <textarea
                className={`w-full bg-zinc-900 text-zinc-100 px-4 py-3 rounded-lg outline-none border-2 transition-colors resize-none ${
                  errors.description ? "border-red-500" : "border-transparent focus:border-blue-500"
                }`}
                rows="6"
                placeholder="Enter a detailed description of the book..."
                name="description"
                value={data.description}
                onChange={change}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-red-400 text-sm">{errors.description}</p>
                ) : (
                  <p className="text-zinc-500 text-sm">
                    {data.description.length} characters (min. 20)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 px-6 md:px-8 py-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setData({
                url: "",
                title: "",
                author: "",
                price: "",
                description: "",
                language: "",
                category: "",
              })}
              className="px-6 py-3 bg-zinc-700 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Add Book
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;