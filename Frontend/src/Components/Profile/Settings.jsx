import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

const Settings = () => {

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [Value,setValue]=useState({address:''})
  const [ProfileData,setProfileData]=useState();

  useEffect(()=>{
    try {
      const fetch= async()=>{
        const response= await axios.get('http://localhost:3000/api/v1/get-user-information',{headers})
        setProfileData(response.data);
        setValue({address:response.data.address})
      }
      fetch();
    } catch (error) {
      console.log(error)
    }
  },[])

  const change=(e)=>{
    const {name,value}=e.target
    setValue({...Value,[name]:value})
  }

  const updateProfile=async()=>{
    const response= await axios.put('http://localhost:3000/api/v1/update-address',Value,{headers})
    // console.log(response)
    alert(response.data.message)

  }



  return (
    <>
      {
        !ProfileData && <div className='flex w-full items-center justify-center'><Loader/></div>
      }

     {
      ProfileData && (
        <>
          <div className="h-full p-0 md:p-4 text-zinc-100">
  <h1 className="text-3xl md:text-5xl font-semibold">Settings</h1>
  <div className="mt-5">
    <label htmlFor="username">Username</label>
    <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{ProfileData.username}</p>
  </div>
  <label htmlFor="address">Address</label>
  <div className="flex flex-col ">
    <textarea
      name="address"
      id="address"
      className="p-2 rounded bg-zinc-800 mt-2 font-semibold w-full md:w-1/2"
      rows="5"
      placeholder="Address"
      value={Value.address}
      onChange={change}
    ></textarea>
    <button
      className="bg-red-800 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-blue-700 mt-5 w-1/5"
      onClick={updateProfile}
    >
      Update
    </button>
  </div>
</div>

        </>
      )
     }
    </>
  )
}

export default Settings