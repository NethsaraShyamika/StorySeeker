import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

import { GrLanguage } from "react-icons/gr";
import { IoIosPricetag } from "react-icons/io";
import { FaUser, FaTags } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";


const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {Data ? (
        <div className="bg-zinc-900 min-h-screen px-4 md:px-14 py-10 flex flex-col md:flex-row gap-10 text-zinc-300 ">

          <div className="bg-zinc-800 rounded-xl p-5 h-[65] lg:h-[88vh] w-full lg:w-1/2 flex items-center justify-center shadow-xl">
            <img
              src={Data?.url}
              alt={Data?.title}
              className="h-[50vh] lg:h-[75vh] rounded-lg object-cover shadow-lg"
            />
          </div>


          <div className="p-4 w-full lg:w-1/2">

            <h1 className="text-5xl font-bold text-white tracking-wide mb-2">
              {Data?.title}
            </h1>

            <p className="flex items-center mt-3 text-zinc-400 text-lg">
              <FaUser className="me-3 text-xl" />
              <span className="font-medium">{Data?.author}</span>
            </p>

            <p className="flex items-center mt-3 text-zinc-400 text-lg">
              <FaTags className="me-3 text-xl" />
              <span className="font-medium">{Data?.category}</span>
            </p>

            <p className="flex items-center mt-3 text-zinc-400 text-lg">
              <GrLanguage className="me-3 text-xl" />
              <span className="font-medium">{Data?.language}</span>
            </p>

            <p className="mt-6 text-zinc-400 text-base leading-relaxed">
              {Data?.description}
            </p>

            <p className="flex items-center mt-8 text-4xl font-bold text-green-300">
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
