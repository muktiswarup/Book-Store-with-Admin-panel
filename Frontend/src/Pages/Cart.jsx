import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => { 
  const [Cart, setCart] = useState([]); // 
  const [Total,setTotal]= useState(0)
  const navigate=useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get-user-cart', { headers });
        setCart(response.data.data); 
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const deleteItems = async (bookid) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(res.data.message);
      setCart(prevCart => prevCart.filter(item => item._id !== bookid)); // Update the cart state after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(()=>{
    if(Cart && Cart.length >0 ){
      let total=0;
      Cart.map((item)=>{
        total += item.price
      })
      setTotal(total);
      total=0
    }
  },[Cart])

  const placeYourOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/place-order',
        { order: Cart },
        { headers }
      );
      
      if (response && response.data && response.data.message) {
        alert(response.data.message);  // Display success message
        navigate('/profile/orderhistory');  // Redirect after placing the order
      } else {
        console.log("Unexpected response structure:", response.data);
        alert("Order placed successfully, but no message from server.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);  // Show error message from the server
      } else {
        alert("An error occurred while placing your order. Please try again later.");
      }
    }
  };
  
  return (
    <>
      {Cart.length === 0 && (
        <div className='h-screen'>
          <div className='flex h-[100%] items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty" />
          </div>
        </div>
      )}
      {Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          {Cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img src={item.url} className='h-[20vh] md:h-[10vh] object-cover' alt={item.title} />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semi-bold text-start mt-2 md:mt-0'>
                  {item.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {item.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:block'>
                  {item.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 md:hidden block'>
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>{item.price}₹</h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItems(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
{
  Cart && Cart.length >0 && (
    <div className='mt-4 w-full flex items-center justify-end'>
      <div className='p-4 bg-zinc-800 rounded'>
        <h1>Total Amount</h1>
        <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
          <h2>{Cart.length} books</h2> <h2>₹ {Total}
          </h2>
        </div>
        <div className='w-[100%] mt-3'>
          <button className='bg-zinc-400 rounded px-4 py-2  flex justify-center w-full font-semibold' onClick={placeYourOrder}>Place Your Order</button>
        </div>
      </div>
    </div>
  )
}

    </>
  );
};

export default Cart;
