import axios from 'axios';
import React, { useState } from 'react';

const AddBook = () => {
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      // Basic field validation
      if (
        Data.url === '' ||
        Data.title === '' ||
        Data.author === '' ||
        Data.price === '' ||
        Data.desc === '' ||
        Data.language === ''
      ) {
        return alert('All fields are required');
      }

      // Await the API call for adding a book
      const response = await axios.post(
        'http://localhost:3000/api/v1/add-book',
        Data,
        { headers }
      );

      // Reset form data after successful submission
      setData({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
      });

      // Alert success message from the response
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      // Handle different error cases and provide feedback to the user
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An error occurred while adding the book');
      }
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Add Book</h1>
      <form onSubmit={submit}>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Url of the Book <span className='text-red-900'>*</span>
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Url of Image"
              required
              name="url"
              value={Data.url}
              onChange={change}
            />
          </div>
        </div>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Title of the book <span className='text-red-900'>*</span>
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Book title"
              required
              name="title"
              value={Data.title}
              onChange={change}
            />
          </div>
        </div>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Author of the Book <span className='text-red-900'>*</span>
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Book Author"
              required
              name="author"
              value={Data.author}
              onChange={change}
            />
          </div>
        </div>
        <div className="p-4 bg-zinc-800 rounded flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price of the Book <span className='text-red-900'>*</span>
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Book Price"
              required
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language of the Book <span className='text-red-900'>*</span>
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Book Language"
              required
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>
        </div>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Description of the Book <span className='text-red-900'>*</span>
            </label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="Book Description"
              required
              name="desc"
              value={Data.desc}
              onChange={change}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mt-4 px-3 py-2 bg-green-500 text-white hover:bg-blue-700 hover:text-red-950 w-full rounded-full"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;