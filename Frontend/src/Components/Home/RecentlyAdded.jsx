import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const RecentlyAdded = () => {
const[Data,setData]=useState()
useEffect(()=>{
    const fetch= async ()=>{
        const response=await axios.get("http://localhost:3000/api/v1/get-recently-books")
        setData(response.data.data)
    }
    fetch();
},[])

  return (
    <div className='mt-4 px-4'>
        <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
        <div className='flex items-center justify-center my-8'>
        {!Data && <Loader/>}
        </div>
        <div className='my-8 grid md:grid-cols-4 gap-8 sm:grid-cols-3 grid-cols-1 '>
            {
                Data && Data.map((item,i)=>(
                    <div key={i} >
                        <BookCard data={item}/> 
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentlyAdded;