import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../BookCard/BookCard";
import { FaHeart, FaHeartCirclePlus, FaSpinner } from "react-icons/fa6";
import api from "../../api/axios";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get(
          "/get-favourites",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [headers]);

  const handleRemoveFromUI = (bookId) => {
    setFavouriteBooks((prev) => prev.filter((book) => book._id !== bookId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-5xl text-blue-500 animate-spin" />
          <p className="text-zinc-400 text-lg">Loading your favourites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaHeart className="text-3xl md:text-4xl text-red-500" />
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 via-pink-500 to-purple-500">
            My Favourites
          </h1>
        </div>
        {FavouriteBooks.length > 0 && (
          <p className="text-zinc-400 text-sm md:text-base ml-1">
            {FavouriteBooks.length}{" "}
            {FavouriteBooks.length === 1 ? "book" : "books"} in your collection
          </p>
        )}
      </div>

      {FavouriteBooks.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-linear-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-2xl border border-zinc-700/50 p-12 max-w-md w-full">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-red-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <FaHeartCirclePlus className="relative text-7xl text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-200 mb-2">
                  No Favourites Yet
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Start building your collection by adding books you love to
                  your favourites!
                </p>
              </div>
              <button className="mt-4 px-6 py-3 bg-linear-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50 hover:scale-105">
                Browse Books
              </button>
            </div>
          </div>
        </div>
      ) : (

        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
          animate-fade-in
        "
        >
          {FavouriteBooks.map((items, i) => (
            <div
              key={i}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <BookCard
                data={items}
                favourite={true}
                onRemove={() => handleRemoveFromUI(items._id)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Favourites;
