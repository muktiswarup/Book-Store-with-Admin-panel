import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="w-full flex items-center justify-between mt-4 lg:hidden">
      {role === "user" && (
        <>
          <Link
            to="/profile/orderhistory"
            className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600 bg-slate-500"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 text-center  hover:bg-zinc-900 rounded transition-all duration-300 hover:text-zinc-600 bg-slate-500"
          >
            Settings
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileNav;
