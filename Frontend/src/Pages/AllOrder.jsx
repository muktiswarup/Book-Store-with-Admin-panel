import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import { FaUser, FaCheck } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrder = () => {
  const [AllOrder, setAllOrder] = useState([]);
  const [Option, SetOption] = useState(-1);
  const [Values, setValues] = useState({ states: "" });
  const [userDiv, setUserdiv] = useState('hidden');
  const [userdivData, setUserdivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/get-all-orders', { headers });
    setAllOrder(response.data.data); // Setting the updated order list
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders initially
  }, []); // Only run on mount to avoid continuous fetching

  const change = (e) => {
    const { value } = e.target;
    setValues({ states: value }); // Update state on selection
  };

  const submitChanges = async (i) => {
    const id = AllOrder[i]._id;
    
    // Check if states value is provided before submitting
    if (!Values.states) {
        alert("Please select a status before submitting");
        return;
    }

    try {
        const response = await axios.put(
            `http://localhost:3000/api/v1/update-status/${id}`,
            { states: Values.states }, // Send the correct data
            { headers }
        );

        alert(response.data.message);
        await fetchOrders(); // Refresh orders after status update
        SetOption(-1); // Close the dropdown
    } catch (error) {
        console.error("Error updating order:", error);
        alert("Failed to update order status");
    }
};

  return (
    <>
      {
        !AllOrder.length && (
          <div className='flex items-center justify-center h-full'><Loader /></div>
        )
      }
      {
        AllOrder && AllOrder.length > 0 && (
          <div className="h-full p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
              All Orders
            </h1>

            {/* Table header */}
            <div className="hidden md:flex justify-between mt-4 bg-zinc-800 w-full rounded py-2 px-4 text-sm md:text-base">
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
              <div className="w-[10%] text-center">
                <h1><FaUser /></h1>
              </div>
            </div>

            {
              AllOrder.map((items, i) => (
                <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex flex-wrap md:flex-nowrap gap-4 hover:cursor-pointer transition-all duration-300 mb-4">
                  {/* Sr. */}
                  <div className="w-[20%] md:w-[5%]">
                    <h1 className="text-center"> {i + 1}</h1>
                  </div>
                  {/* Book Title */}
                  <div className="w-full md:w-[22%]">
                    <Link to={`/view-book-details/${items.book._id}`}>
                      {items.book.title}
                    </Link>
                  </div>
                  {/* Description */}
                  <div className="hidden md:block md:w-[45%]">
                    <h1>{items.book.desc.slice(0, 50)}...</h1>
                  </div>
                  {/* Price */}
                  <div className="w-[20%] md:w-[10%]">
                    <h1>{items.book.price}</h1>
                  </div>
                  {/* Status */}
                  <div className="w-[30%] md:w-[15%]">
                    <h1 className="font-semibold">
                      <button className="hover:scale-105 transition-all duration-300" onClick={() => SetOption(i)}>
                        {
                          items.states === "Order Placed" ? (
                            <div className="text-green-500">{items.states}</div>
                          ) : items.states === "Canceled" ? (
                            <div className="text-red-500">{items.states}</div>
                          ) : (
                            <div className="text-yellow-500">{items.states}</div>
                          )
                        }
                      </button>
                      {/* Dropdown for changing status */}
                      <div className={` ${Option === i ? "block" : "hidden"} flex mt-4`}>
                        <select name="states" className="bg-gray-800" onChange={change} value={Values.states}>
                          {
                            ["Order Placed", "Out for Delivery", "Delivered", "Canceled"].map((status, i) => (
                              <option value={status} key={i}>
                                {status}
                              </option>
                            ))
                          }
                        </select>
                        <button className="text-green-700 hover:text-pink-600 mx-2"
                          onClick={() => submitChanges(i)}>
                          <FaCheck />
                        </button>
                      </div>
                    </h1>
                  </div>
                  {/* User Info Icon */}
                  <div className="w-[10%] md:w-[5%]">
                    <button className="text-xl hover:text-orange-500"
                      onClick={() => {
                        setUserdiv('fixed');
                        setUserdivData(items.user);
                      }}>
                      <IoMdCheckboxOutline />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
      {
        userdivData && (
          <SeeUserData 
            userdivData={userdivData}
            userDiv={userDiv}
            setUserdiv={setUserdiv} />
        )
      }
    </>
  );
}

export default AllOrder;
