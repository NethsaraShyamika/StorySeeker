import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Heart, 
  ShoppingCart, 
  Edit3, 
  Trash2, 
  User, 
  Tag, 
  Globe, 
  DollarSign,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader,
  BookOpen,
  Star
} from "lucide-react";

const ViewBookDetails = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [actionLoading, setActionLoading] = useState("");
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const { id } = useParams();
  const navigate = useNavigate();

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 4000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        
      } catch (error) {
        showNotification("error", "Failed to load book details");
        console.error("Error fetching book data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFav = async () => {
    setActionLoading("fav");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
      const response = await axios.put("http://localhost:1000/api/v1/add-favourite", {}, { headers });
      
      showNotification("success", "Added to favourites successfully!");
    } catch (error) {
      showNotification("error", error.response?.data?.message || "Failed to add to favourites");
    } finally {
      setActionLoading("");
    }
  };

  const handleCart = async () => {
    setActionLoading("cart");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
      const response = await axios.put("http://localhost:1000/api/v1/add-cart", {}, { headers });
      
      showNotification("success", "Added to cart successfully!");
    } catch (error) {
      showNotification("error", error.response?.data?.message || "Failed to add to cart");
    } finally {
      setActionLoading("");
    }
  };

  const deleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return;
    }
    
    setActionLoading("delete");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
      const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers });
      
      showNotification("success", "Book deleted successfully!");
      setTimeout(() => {
        navigate("/all-books");
      }, 2000);
    } catch (error) {
      showNotification("error", "Failed to delete book");
    } finally {
      setActionLoading("");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-zinc-400">Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4 md:px-10 py-8">
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

      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-5/12">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-6 shadow-2xl sticky top-8">
              <div className="relative group">
                <img
                  src={data.url}
                  alt={data.title}
                  className="w-full h-[500px] object-cover rounded-xl shadow-lg transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-zinc-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  4.5
                </div>
              </div>

              {isLoggedIn && role === "user" && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={handleFav}
                    disabled={actionLoading === "fav"}
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-50"
                  >
                    {actionLoading === "fav" ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        <span className="hidden sm:inline">Favourite</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCart}
                    disabled={actionLoading === "cart"}
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50"
                  >
                    {actionLoading === "cart" ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {isLoggedIn && role === "admin" && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={() => navigate(`/update-book/${id}`)}
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  <button
                    onClick={deleteBook}
                    disabled={actionLoading === "delete"}
                    className="flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-50"
                  >
                    {actionLoading === "delete" ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Delete</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-7/12">
            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50 p-8 shadow-2xl">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {data.title}
                  </h1>
                  <p className="text-zinc-400">Available now</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <User className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">Author</p>
                      <p className="text-white font-medium">{data.author}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Tag className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">Category</p>
                      <p className="text-white font-medium">{data.category}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Globe className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">Language</p>
                      <p className="text-white font-medium">{data.language}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">Price</p>
                      <p className="text-white font-bold text-xl">Rs. {data.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-700/50 pt-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  Description
                </h2>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {data.description}
                </p>
              </div>

              {isLoggedIn && role === "user" && (
                <div className="mt-8 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-2xl mb-1">
                        Rs. {data.price}
                      </p>
                      <p className="text-zinc-400 text-sm">Ready to add to your collection?</p>
                    </div>
                    <button
                      onClick={handleCart}
                      disabled={actionLoading === "cart"}
                      className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 flex items-center gap-2"
                    >
                      {actionLoading === "cart" ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Buy Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;