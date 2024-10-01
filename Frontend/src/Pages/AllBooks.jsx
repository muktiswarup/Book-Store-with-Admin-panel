import { useEffect, useState } from "react"
import axios from 'axios';
import BookCard from "../Components/BookCard/BookCard";
import Loader from "../Components/Loader/Loader";

const AllBooks = () => {

    const[Data,setData]=useState()
    useEffect(()=>{
        const fetch= async ()=>{
            const response=await axios.get("http://localhost:3000/api/v1/get-all-books")
            setData(response.data.data)
        }
        fetch();
    },[])

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
       <h4 className='text-3xl text-yellow-100'>All Books of the KitabMahal</h4>
        <div className='flex items-center justify-center my-8 '>
        {!Data && <Loader/>}
        </div>
        <div className='my-8 grid md:grid-cols-4 gap-8 sm:grid-cols-3 grid-cols-1 text-white'>
            {
                Data && Data.map((item,i)=>(
                    <div key={i}>
                        <BookCard data={item}/> {" "}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllBooks