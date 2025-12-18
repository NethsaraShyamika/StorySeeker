import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";
import { BookOpen } from "lucide-react";

const BookCard = ({ data, favourite, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemoveBook = async () => {
    try {
      setIsRemoving(true);
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
      };

      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-favourite",
        {},
        { headers }
      );

      alert(response.data.message);
      onRemove();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-2">
      
      {favourite && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 p-2 rounded-full shadow-lg animate-pulse">
            <FaHeart className="text-white text-sm" />
          </div>
        </div>
      )}

      <Link to={`/view-book-details/${data._id}`} className="block">
        
        <div className="relative bg-linear-to-br from-zinc-900 to-zinc-800 rounded-t-2xl overflow-hidden aspect-3/4 flex items-center justify-center p-4">
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-700 animate-pulse"></div>
          )}

          <img 
            src={data.url} 
            alt={data.title}
            className={`relative z-10 h-full w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <FaEye className="text-yellow-400" />
              <span>View Details</span>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-yellow-500/20 to-transparent"></div>
        </div>

        <div className="p-5 space-y-3">
          
          <h2 className="text-lg font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 min-h-14">
            {data.title}
          </h2>

          <div className="flex items-center gap-2 text-zinc-400">
            <BookOpen className="w-4 h-4 text-yellow-500" />
            <p className="text-sm font-medium line-clamp-1">{data.author}</p>
          </div>

          {data.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`text-xs ${
                      i < Math.floor(data.rating) 
                        ? 'text-yellow-500' 
                        : 'text-zinc-600'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-400">({data.rating})</span>
            </div>
          )}

          <div className="border-t border-zinc-700 pt-3">
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Price</p>
                <p className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Rs.{data.price}
                </p>
              </div>

              
            </div>
          </div>
        </div>
      </Link>

      {favourite && (
        <div className="px-5 pb-5">
          <button 
            className="w-full py-3 px-4 bg-zinc-700 hover:bg-red-500 text-zinc-300 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/remove border border-zinc-600 hover:border-red-500"
            onClick={handleRemoveBook}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Removing...</span>
              </>
            ) : (
              <>
                <FaHeart className="group-hover/remove:animate-pulse" />
                <span>Remove from Favourites</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;