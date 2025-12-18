import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import img from "../../assets/shopping.png";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);

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
          
          <div className="overflow-x-auto rounded-lg shadow-lg mt-4">
            <table className="w-full border-collapse bg-zinc-800">
              <thead>
                <tr className="bg-zinc-700 text-zinc-100">
                  <th className="py-3 px-4 text-center font-semibold border-b border-zinc-600 w-[3%]">
                    Sr.
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-zinc-600 w-[27%]">
                    Books
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-zinc-600 w-[45%]">
                    Description
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-zinc-600 w-[9%]">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-zinc-600 w-[10%]">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-zinc-600 w-[5%] hidden md:table-cell">
                    Mode
                  </th>
                </tr>
              </thead>
              <tbody>
                {OrderHistory.map((items, i) => (
                  <tr
                    key={i}
                    className="hover:bg-zinc-900 transition-colors border-b border-zinc-700 last:border-b-0"
                  >
                    <td className="py-3 px-4 text-center">{i + 1}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/view-book-details/${items.book._id}`}
                        className="hover:text-blue-300 transition-colors"
                      >
                        {items.book.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">
                      {items.book?.description?.slice(0, 50) || "No description"}...
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      Rs. {items.book.price}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">
                        {items.status === "pending" && (
                          <span className="text-yellow-500 px-3 py-1 bg-yellow-500/20 rounded-full inline-block">
                            {items.status}
                          </span>
                        )}
                        {items.status === "cancelled" && (
                          <span className="text-red-500 px-3 py-1 bg-red-500/20 rounded-full inline-block">
                            {items.status}
                          </span>
                        )}
                        {items.status === "delivered" && (
                          <span className="text-green-500 px-3 py-1 bg-green-500/20 rounded-full inline-block">
                            {items.status}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400 text-sm hidden md:table-cell">
                      COD
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;