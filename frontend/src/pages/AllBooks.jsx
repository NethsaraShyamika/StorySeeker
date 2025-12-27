import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";
import { FaSearch, FaTimes, FaTh, FaList, FaEye, FaStar } from "react-icons/fa";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = data;

    if (filtering) {
      filtered = data.filter(
        (book) =>
          book.title?.toLowerCase().includes(filtering.toLowerCase()) ||
          book.author?.toLowerCase().includes(filtering.toLowerCase()) ||
          book.description?.toLowerCase().includes(filtering.toLowerCase())
      );
    }

    let sorted = [...filtered];
    switch (sortBy) {
      case "title-asc":
        sorted.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title?.localeCompare(a.title));
        break;
      case "price-asc":
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    return sorted;
  }, [data, filtering, sortBy]);

  const booksByCategory = useMemo(() => {
    return filteredAndSortedBooks.reduce((acc, book) => {
      if (!acc[book.category]) acc[book.category] = [];
      acc[book.category].push(book);
      return acc;
    }, {});
  }, [filteredAndSortedBooks]);

  const clearFilter = () => {
    setFiltering("");
  };

  if (loading) {
    return (
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen px-4 sm:px-8 md:px-12 py-8 space-y-12">
      <div className="mb-8">
        <h4 className="text-3xl md:text-4xl text-yellow-100 font-semibold mb-6">
          All Books
        </h4>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              placeholder="Search by title, author, or description..."
              className="w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-zinc-100 placeholder-zinc-500"
            />
            {filtering && (
              <button
                onClick={clearFilter}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-zinc-400 text-sm whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:flex-none px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-zinc-100 cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>

            <div className="flex items-center gap-4 ml-4">
              <label className="text-zinc-400 text-sm whitespace-nowrap">
                View:
              </label>
              <div className="flex bg-zinc-800 border border-zinc-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  title="Grid View"
                >
                  <FaTh className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  title="List View"
                >
                  <FaList className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-zinc-400 text-sm">
          {filtering ? (
            <p>
              Found {filteredAndSortedBooks.length} book
              {filteredAndSortedBooks.length !== 1 ? "s" : ""} matching "
              <span className="text-blue-400">{filtering}</span>"
            </p>
          ) : (
            <p>
              Showing all {data.length} book{data.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {filteredAndSortedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
          <FaSearch className="text-6xl mb-4 opacity-50" />
          <p className="text-xl mb-2">No books found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
          {filtering && (
            <button
              onClick={clearFilter}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {Object.keys(booksByCategory).map((category) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-4 p-2">
                <div className="flex-1 h-px bg-linear-to-r from-yellow-400 to-orange-500" />
                <h2 className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent whitespace-nowrap px-1">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-linear-to-r from-yellow-400 to-orange-500" />
              </div>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {booksByCategory[category].map((book) => (
                    <div
                      key={book._id}
                      className="transform transition-transform duration-300 hover:scale-105"
                    >
                      <BookCard data={book} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {booksByCategory[category].map((book) => (
                    <div
                      key={book._id}
                      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-32 h-48 sm:h-32 shrink-0 bg-zinc-900 flex items-center justify-center p-2">
                          <img
                            src={book.url}
                            alt={book.title}
                            className="h-full w-auto object-contain"
                          />
                        </div>

                        <div className="flex-1 p-4 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white line-clamp-1 hover:text-yellow-400 transition-colors">
                                {book.title}
                              </h3>
                              <p className="text-sm text-zinc-400 flex items-center gap-1">
                                <span className="text-yellow-500">by</span>{" "}
                                {book.author}
                              </p>
                              <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                                {book.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Rs.{book.price}
                              </p>
                              <p className="text-xs text-zinc-500 mt-1">
                                {book.category} • {book.language}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                            <div className="flex items-center gap-4 text-xs text-zinc-400">
                              {book.rating && (
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-500 text-xs" />
                                  <span>{book.rating}</span>
                                </div>
                              )}
                            </div>
                            <Link
                              to={`/view-book-details/${book._id}`}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                              <FaEye className="text-xs" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllBooks;
