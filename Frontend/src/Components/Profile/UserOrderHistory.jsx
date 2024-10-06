import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
      // console.log(response)
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div>
          <h1>No Order History</h1>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uDTMFNwhl5uJhjJkcAvqzKfOtonQjzN8Yw&s"
            alt="orderHistory"
          />
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          {/* Table header */}
          <div className="flex justify-between mt-4 bg-zinc-800 w-full rounded py-2 px-4 text-sm md:text-base">
            <div className="w-[5%] text-center">
              <h1>Sr.</h1>
            </div>
            <div className="w-[20%]">
              <h1>Books</h1>
            </div>
            <div className="w-[40%]">
              <h1>Description</h1>
            </div>
            <div className="w-[10%] text-center">
              <h1>Price</h1>
            </div>
            <div className="w-[15%] text-center">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] text-center hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>

          {/* Table content */}
          {OrderHistory.map((items, i) => (
            <div
              className="flex justify-between items-center bg-zinc-800 w-full rounded py-2 px-4 gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              key={i}
            >
              <div className="w-[5%] text-center">
                <h1>{i + 1}</h1>
              </div>
              <div className="w-[20%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:underline"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[40%] truncate">{items.book.desc}</div>
              <div className="w-[10%] text-center">{items.book.price}₹</div>
              <div className="w-[15%] text-center">
                <h1 className="font-semibold text-green-700">
                  {items.status === "Order Placed" ? (
                    <div className="text-yellow-500">{items.states}</div>
                  ) : items.states === "Canceled" ? (
                    <div className="text-red-700">{items.status}</div>
                  ) : (
                    items.states
                  )}
                </h1>

              </div>
              <div className=" w-none md:w-[10%] text-center hidden md:block">
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
