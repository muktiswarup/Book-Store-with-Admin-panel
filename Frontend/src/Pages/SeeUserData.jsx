import React from 'react';
import { RxCross2 } from "react-icons/rx";

const SeeUserData = ({ userdivData, userDiv, setUserdiv }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${userDiv ? 'block' : 'hidden'} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
        onClick={() => setUserdiv(false)} // Hide modal on clicking outside
      ></div>

      {/* Modal */}
      <div
        className={`${userDiv ? 'block' : 'hidden'} fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50`}
      >
        <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%] lg:w-[40%] shadow-lg relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button
              className="text-xl text-zinc-500 hover:text-red-500 transition"
              onClick={() => setUserdiv(false)} // Hide modal on clicking close button
            >
              <RxCross2 />
            </button>
          </div>

          {/* User Info */}
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-zinc-700 font-medium">
                Username:{" "}
                <span className="font-semibold text-black">{userdivData.username}</span>
              </label>
            </div>
            <div>
              <label className="block text-zinc-700 font-medium">
                Email:{" "}
                <span className="font-semibold text-black">{userdivData.email}</span>
              </label>
            </div>
            <div>
              <label className="block text-zinc-700 font-medium">
                Address:{" "}
                <span className="font-semibold text-black">{userdivData.address}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
