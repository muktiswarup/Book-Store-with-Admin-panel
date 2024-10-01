import React from 'react';
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <div className='h-[70vh] flex flex-col lg:flex-row '>
      {/* Text Content Section */}
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <Link to='/all-books' className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-2 hover:bg-zinc-800 rounded-full'>
            Discover Books
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full lg:w-3/6 flex items-center justify-center mt-8 lg:mt-0 lg:pr-12'>
        <img 
          src="../ReadingBook.jpg" 
          alt="Books" 
          className='w-[80%] h-auto lg:h-[70%] object-contain' 
          style={{ marginTop: '20px', marginBottom: '20px' }}
        />
      </div>
    </div>
  );
};

export default Hero;
