import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";
import { FaSearch, FaTimes } from "react-icons/fa";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState("");
  const [sortBy, setSortBy] = useState("default");

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

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (filtering) {
      filtered = data.filter(
        (book) =>
          book.title?.toLowerCase().includes(filtering.toLowerCase()) ||
          book.author?.toLowerCase().includes(filtering.toLowerCase()) ||
          book.description?.toLowerCase().includes(filtering.toLowerCase())
      );
    }

    // Apply sorting
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
    <div className="bg-zinc-900 min-h-screen px-4 sm:px-8 md:px-12 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h4 className="text-3xl md:text-4xl text-yellow-100 font-semibold mb-6">
          All Books
        </h4>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search Input */}
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

          {/* Sort Dropdown */}
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
          </div>
        </div>

        {/* Results Info */}
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

      {/* Books Grid */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedBooks.map((book, i) => (
            <div
              key={book._id || i}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <BookCard data={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;