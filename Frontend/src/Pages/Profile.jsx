import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Profile/Sidebar'
import Loader from '../Components/Loader/Loader'
// import { useSelector } from 'react-redux'
import axios from 'axios'


const Profile = () => {

  const [Profile,setProfile]=useState()
// const isLoggedIn=useSelector();
const headers = {
  headers: {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
useEffect(()=>{
  try {
    const fetch= async()=>{
      const response= await axios.get('http://localhost:3000/api/v1/get-user-information',headers)
      setProfile(response.data)
    }
    fetch();
  } catch (error) {
    console.log(error)
  }
},[])

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-[95vh] py-8 gap-4'>
      {!Profile && (<div className='flex justify-center items-center'><Loader/></div>)}
      {
        Profile && (
          <>
          
            <div className='w-full md:w-1/6 '><Sidebar data={Profile}/></div>
            <div className='w-full md:w-5/6'><Outlet/></div>
            
          </>
        )
      }
    </div>
  )
}

export default Profile