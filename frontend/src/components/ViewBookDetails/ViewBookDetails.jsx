import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { GrLanguage } from "react-icons/gr";
import { IoIosPricetag } from "react-icons/io";
import { FaUser, FaTags, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFav = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-favourite",
        {},
        { headers }
      );

      if (response.data.success === false) {
        alert(response.data.message || "Something went wrong");
      } else {
        alert(response.data.message || "Added to favourites successfully");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Something went wrong");
      } else {
        alert(error.message);
      }
    }
  };

    const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-cart",
        {},
        { headers }
      );

      if (response.data.success === false) {
        alert(response.data.message || "Something went wrong");
      } else {
        alert(response.data.message || "Added to Cart successfully");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Something went wrong");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <>
      {Data ? (
        <div className="bg-zinc-900 min-h-screen px-4 md:px-10 py-10 text-zinc-300 flex flex-col lg:flex-row gap-10 lg:gap-16 justify-center">
          <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-1/2 bg-zinc-800 rounded-xl p-5 shadow-xl gap-6 items-center justify-center">
            <img
              src={Data?.url}
              alt={Data?.title}
              className="h-[45vh] md:h-[60vh] lg:h-[75vh] rounded-lg object-cover shadow-lg"
            />
            <div>
              {isLoggedIn && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:ml-4 mt-4 lg:mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <button
                      className="flex items-center gap-2 bg-white text-red-700 rounded-full text-3xl shadow-md hover:scale-105 transition px-12 py-3 md:p-3"
                      onClick={handleFav}
                    >
                      <FaHeart />{" "}
                      <span className="text-lg lg:hidden ">Favourites</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center gap-2 bg-white text-black rounded-full text-3xl shadow-md hover:scale-105 transition px-10 py-3 md:p-3"
                    onClick={handleCart}>
                      <FaCartShopping />{" "}
                      <span className="text-lg lg:hidden">Add to Cart</span>
                    </button>
                  </div>
                </div>
              )}

              {isLoggedIn && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:ml-4 mt-4 lg:mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center gap-2 bg-white text-black rounded-full text-3xl shadow-md hover:scale-105 transition px-12 py-3 md:p-3">
                      <FaEdit />{" "}
                      <span className="text-lg lg:hidden ">Edit Book</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <button className="flex items-center gap-2 bg-white text-red-700 rounded-full text-3xl shadow-md hover:scale-105 transition px-10 py-3 md:p-3">
                      <MdOutlineDelete />{" "}
                      <span className="text-lg lg:hidden">Delete Book</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide mb-4">
              {Data?.title}
            </h1>

            <div className="space-y-4 text-lg">
              <p className="flex items-center">
                <FaUser className="me-3 text-xl" />
                <span className="font-medium">{Data?.author}</span>
              </p>

              <p className="flex items-center">
                <FaTags className="me-3 text-xl" />
                <span className="font-medium">{Data?.category}</span>
              </p>

              <p className="flex items-center">
                <GrLanguage className="me-3 text-xl" />
                <span className="font-medium">{Data?.language}</span>
              </p>
            </div>

            <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">
              {Data?.description}
            </p>

            <p className="flex items-center mt-8 text-3xl md:text-4xl font-bold text-green-300">
              <IoIosPricetag className="me-3 text-4xl" />
              Rs. {Data?.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
