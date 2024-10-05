import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid:data._id
  };
  const handleRemoveBook=async()=>{
    const response= await axios.put('http://localhost:3000/api/v1/remove-book-from-favourite',{}, { headers });
    alert(response.data.message)
    console.log(response)
  }

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="hover:bg-zinc-700 transition-all duration-300 flex flex-col justify-between h-full">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img
              src={data.url}
              alt="book"
              className="h-[25vh] w-[20vh] object-cover"
            />
          </div>
          <div className="mt-4 flex-grow">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="mt-2 text-lg text-zinc-400">by {data.author}</p>
            <p className="mt-2 text-lg text-zinc-200">{data.price}₹</p>
          </div>
        </div>
      </Link>
      {favourite && (
        <div className="mt-auto">
          <button className="bg-red-900 text-lg font-semibold px-4 py-2 border border-blue-600 mt-4 rounded hover:bg-red-950 transition-all w-full" onClick={handleRemoveBook}>
            Remove from Favourite
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
