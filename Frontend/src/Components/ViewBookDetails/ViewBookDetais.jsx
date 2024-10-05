import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaRegEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null); // Initialize with null to check later

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.log('Error fetching book details:', error);
      }
    };
    fetch();
  }, [id]);

  const handleFavourite = async () => {
    try {
      // Make sure headers are properly passed with the request
      // console.log("Sending headers:", headers);
      const response = await axios.put(
        'http://localhost:3000/api/v1/add-book-to-favourite',
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error)
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {Data ? (
        <div className='text-white px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row lg:gap-8'>
          {/* Book Image Section */}
          <div className='bg-zinc-800 rounded p-4 lg:h-[88vh] lg:w-3/6 w-full flex items-center justify-center mb-8 lg:mb-0'>
            <div>
              <img
                src={Data.url}
                alt="bookdetails"
                className='h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto max-w-full m-auto'
              />
              {isLoggedIn === true && role === 'user' && (
                <div className='flex items-center justify-between mt-5 gap-4'>
                  {/* Add to Favorite Button */}
                  <button
                    className='flex items-center justify-center bg-white text-red-800 rounded-full px-4 py-2 md:px-8 md:py-4 hover:bg-zinc-700'
                    onClick={handleFavourite}
                  >
                    <FaHeart className='text-2xl md:text-3xl lg:text-4xl' />
                    <span className='hidden lg:inline-block text-white ml-2'>
                      Add to Favorite
                    </span>
                  </button>
                  {/* Add to Cart Button */}
                  <button className='flex items-center justify-center bg-white text-blue-800 rounded-full px-4 py-2 md:px-8 md:py-4 hover:bg-zinc-700'>
                    <FaCartShopping className='text-2xl md:text-3xl lg:text-4xl' />
                    <span className='hidden lg:inline-block text-white ml-2'>
                      Add to Cart
                    </span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === 'admin' && (
                <div className='flex items-center justify-between mt-5 gap-4'>
                  {/* Edit Book Button */}
                  <button className='flex items-center justify-center bg-white text-yellow-500 rounded-full px-4 py-2 md:px-8 md:py-4 hover:bg-zinc-700'>
                    <FaRegEdit className='text-2xl md:text-3xl lg:text-4xl' />
                    <span className='hidden lg:inline-block text-white ml-2'>
                      Edit Book
                    </span>
                  </button>
                  {/* Delete Book Button */}
                  <button className='flex items-center justify-center bg-white text-red-800 rounded-full px-4 py-2 md:px-8 md:py-4 hover:bg-zinc-700'>
                    <MdDelete className='text-2xl md:text-3xl lg:text-4xl' />
                    <span className='hidden lg:inline-block text-white ml-2'>
                      Delete Book
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Book Details Section */}
          <div className='p-4 lg:w-3/6 w-full'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-zinc-300 font-semibold'>
              {Data.title}
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl text-zinc-400 mt-1'>
              by {Data.author}
            </p>
            <p className='text-base md:text-lg lg:text-xl text-zinc-500 mt-4'>
              {Data.desc}
            </p>
            <p className='flex mt-4 items-center text-zinc-400'>
              <GrLanguage className='me-3' /> {Data.language}
            </p>
            <p className='mt-4 text-xl md:text-2xl lg:text-3xl text-zinc-100 font-semibold'>
              Price: {Data.price} ₹
            </p>
          </div>
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center text-white'>
          Loading... <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
