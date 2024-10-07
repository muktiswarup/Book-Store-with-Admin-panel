import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import {authActions} from '../../Store/auth'
import { useDispatch, useSelector } from "react-redux";
const Sidebar = ({ data }) => {
  // console.log(data)
const dispatch=useDispatch()
const history=useNavigate();
const role= useSelector((state)=>state.auth.role)

  return (
    <div className="bg-zinc-800 p-4 rounded h-auto  flex-col flex justify-between lg:h-[100%]">
      <div className="flex flex-col items-center">
        <img src="/456212.png" alt="logo" className="w-12" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-3 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {
        role==='user' && (
          <div className="lg:flex flex-col items-center justify-center w-full hidden mb-10">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderhistory"
            className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600"
          >
            Settings
          </Link>
        </div>
        )
      }

      {
        role==='admin' && (
          <div className="lg:flex flex-col items-center justify-center w-full hidden mb-10">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600"
          >
            All Orders
          </Link>

          
        </div>
        )
      }

      <div className="mb-14 flex items-center justify-center">
        <button className="flex items-center justify-center hover:bg-red-950 transition-all duration-300 w-full py-2 rounded"
        onClick={()=>{
          dispatch(authActions.logout())
          dispatch(authActions.changeRole('user'))
          localStorage.clear('id');
          localStorage.clear('token');
          localStorage.clear('role');
          history('/')
        }}>
          Logout
          <FaSignOutAlt className="ms-4" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
