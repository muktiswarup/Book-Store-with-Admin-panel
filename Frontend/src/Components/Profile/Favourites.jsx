import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import { TfiFaceSad } from "react-icons/tfi";

const Favourites = () => {
  const [FavouriteBook, setFavoriteBook] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-favourite-books",
        { headers }
      );
      setFavoriteBook(response.data.data);
    };
    fetch();
  }, [FavouriteBook]);

  return (
    <>
      {/* Show when no favourite books are available */}
      {FavouriteBook && FavouriteBook.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="text-3xl font-semibold text-blue-700">
            No Books Available In the Favourite
          </div>
          <div className="text-6xl font-semibold text-red-700 mt-5">
            <TfiFaceSad />
          </div>
        </div>
      )}

      {/* Grid of favourite books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {FavouriteBook &&
          FavouriteBook.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
