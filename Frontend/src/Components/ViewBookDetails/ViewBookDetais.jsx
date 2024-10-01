import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";

const ViewBookDetais = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null); // Initialize with null to check later
//   const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        // setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log('Error fetching book details:', error);
        // setLoading(false); // Stop loading even if there’s an error
      }
    };
    fetch();
  }, [id]);

  // If data is still loading, show a loading spinner or message
 /*  if (loading) {
    return   <div className='flex items-center justify-center my-8 mt-12'><Loader/></div>;
  }
 */
  // Check if Data is available before trying to access its properties
  /* if (!Data) {
    return <p className="text-white">Book details not available.</p>;
  }
 */
  return (
    <>
        {
             Data && (
                <div className='text-white px-6 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row lg:gap-8'>
                  <div className='bg-zinc-800 rounded p-4 lg:h-[88vh] lg:w-3/6 w-full flex items-center justify-center mb-8 lg:mb-0'>
                    <img 
                      src={Data.url} 
                      alt="bookdetails" 
                      className='h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto max-w-full' 
                    />
                  </div>
                  <div className='p-4 lg:w-3/6 w-full'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
                    <p className='text-lg md:text-xl lg:text-2xl text-zinc-400 mt-1'> by {Data.author}</p>
                    <p className='text-base md:text-lg lg:text-xl text-zinc-500 mt-4'>{Data.desc}</p>
                    <p className='flex mt-4 items-center justify-start text-zinc-400'>
                      <GrLanguage className='me-3'/>{Data.language}
                    </p>
                    <p className='mt-4 text-xl md:text-2xl lg:text-3xl text-zinc-100 font-semibold'>
                      Price: {Data.price}₹
                    </p>
                  </div>
                </div>
            )
        }
        {
            !Data && <div className='h-screen flex items-center justify-center text-white'>loading..<Loader/></div>
        }
    </>
  );
};

export default ViewBookDetais;
