import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import { TfiFaceSad } from "react-icons/tfi";

const Favourites = () => {
  const [FavouriteBook, setFavoriteBook] = useState();

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
      {FavouriteBook && FavouriteBook.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center justify-center text-5xl font-semibold text-blue-700">
            No Books Available In the Favourite
          </div>
          <div className="flex items-center justify-center text-5xl font-semibold text-red-700 mt-5">
            <TfiFaceSad />
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 ">
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
