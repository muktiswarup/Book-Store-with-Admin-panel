import React from 'react'
import {Link} from 'react-router-dom'

const BookCard = ({data}) => {
   
  return (
    <>
        <Link to={`/view-book-details/${data._id}`}>
            <div className='bg-zinc-800 rounded p-4 flex flex-col hover:bg-zinc-700 transition-all duration-300'>
                <div className='bg-zinc-900 rounded flex items-center justify-center'>
                    <img src={data.url} alt="book" className='h-[25vh] w-[30vh]' />
                </div>
                <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
                <p className='mt-2 text-xl font-semibold text-zinc-400'>by {data.author}</p>
                <p className='mt-2 text-xl font-semibold text-zinc-200'>{data.price}₹</p>
            </div>
        </Link>
    </> 
  )
}

export default BookCard