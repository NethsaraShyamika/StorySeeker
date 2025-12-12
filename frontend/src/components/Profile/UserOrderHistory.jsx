import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import img from "../../assets/shopping.png";
import {Link} from "react-router-dom"

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );

        setOrderHistory(response.data.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, [headers]);

  return (
    <>
      {OrderHistory === null && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {OrderHistory !== null && OrderHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center bg-zinc-100 p-6 rounded-xl min-h-screen gap-6 shadow-lg border border-zinc-800">
          <div className="flex flex-col items-center justify-center h-96 gap-4 text-gray-500">
            <h1 className="text-2xl font-semibold text-center">
              No order History
            </h1>
            <img src={img} alt="" />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1> Sr. </h1>
            </div>
            <div className="w-[22%]">
              <h1> Books </h1>
            </div>
            <div className="w-[45%]">
              <h1> Description </h1>
            </div>
            <div className="w-[9%]">
              <h1> Price </h1>
            </div>
            <div className="w-[16%]">
              <h1> Status </h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1> Mode </h1>
            </div>
          </div>
        
          {OrderHistory.map((items, i) => (
            <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
             <div className="w-[3%]">
              <h1 className="text-center">{i + 1}</h1>
             </div>
             <div className="w-[22%]">
              <Link
              to={`/view-book-details/${items.book._id}`}
              className="hover:text-blue-300"
              >
                {items.book.title}
              </Link>
             </div>
             <div className="w-[45%]">
              <h1 className=""> {items.book?.description?.slice(0, 50) || "No description"} ...</h1>
             </div>
             <div className="w-[9%]">
              <h1>Rs. {items.book.price} </h1>
             </div>
             <div className="w-[16%]">
              <h1 className="font-semibold text-green-500">
                {items.status === "order placed" ? (
                  <div className="text-yellow-500"> {items.status} </div>
                ) : items.status === "cancelled" ? (
                  <div className="text-red-500"> {items.status} </div>
                ) : (
                  items.status
                )}
              </h1>
             </div>
             <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
             </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
