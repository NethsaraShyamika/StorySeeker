import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../BookCard/BookCard";
import { FaHeartCirclePlus } from "react-icons/fa6";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourites",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetch();
  }, [headers]);

  const handleRemoveFromUI = (bookId) => {
    setFavouriteBooks((prev) => prev.filter((book) => book._id !== bookId));
  };

  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      bg-zinc-100 
      p-4 
      md:p-6 
      rounded-xl 
      min-h-screen 
      gap-4 
      md:gap-6 
      shadow-lg 
      border 
      border-zinc-800
    ">
      {FavouriteBooks.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center h-96 gap-4 text-gray-500">
          <p className="text-xl md:text-2xl font-semibold text-center">
            You have no favourite books yet.
          </p>
          <FaHeartCirclePlus size={60} />
        </div>
      ) : (
        FavouriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard
              data={items}
              favourite={true}
              onRemove={() => handleRemoveFromUI(items._id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;
