import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-recent-books"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-12 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1 w-12 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-yellow-100 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
            Recently Added Books
          </h2>
        </div>
        <p className="text-gray-400 text-lg ml-15">
          Discover the latest additions to our collection
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center my-20">
          <Loader />
          <p className="mt-6 text-gray-400 text-lg animate-pulse">
            Loading amazing books...
          </p>
        </div>
      )}

      {!loading && (!Data || Data.length === 0) && (
        <div className="flex flex-col items-center justify-center my-20 py-12">
          <div className="text-6xl mb-4 opacity-50">📚</div>
          <h3 className="text-2xl text-gray-300 font-semibold mb-2">
            No Books Yet
          </h3>
          <p className="text-gray-500">
            Check back soon for new additions!
          </p>
        </div>
      )}

      {!loading && Data && Data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-12">
          {Data.map((items, i) => (
            <div
              key={i}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-yellow-400 to-orange-500 rounded-lg opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                <div className="relative">
                  <BookCard data={items} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && Data && Data.length > 0 && (
        <div className="flex justify-center mt-8 mb-12">
          <button className="px-8 py-3 bg-linear-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            View All Books
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;