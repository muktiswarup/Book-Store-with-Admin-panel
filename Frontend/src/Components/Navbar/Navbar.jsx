/* import React from "react";

const Navbar = () => {
  const Links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "AllBooks",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  return (
    <div className="bg-zinc-800 text-white px-8 py-2 items-center flex justify-between">
      <div className="flex items-center">
        <img
          className="h-10 me-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <h1 className="text-2xl font-semibold">KitabMahal</h1>
      </div>
      <div className="nav-links-bookheaven items-center gap-4">
        <div className="flex gap-4 items-center">
          {Links.map((items, i) => (
            <div
              key={i}
              className="hover:text-blue-500 transition-all duration-300"
            >
              {items.title}
              {""}
            </div>
          ))}

          <div className="flex gap-4 items-center">
            <button className="bg-blue-700 rounded px-4 py-1 hover:bg-white hover:text-zinc-800">
              SignIn
            </button>
            <button className="bg-red-700 rounded px-4 py-1 hover:bg-gray-400 hover:text-zinc-800">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; */


import React, { useState } from "react";
import { FaGripLines, FaTimes } from "react-icons/fa"; // Using both icons for menu and close
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "AllBooks",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Navbar Header */}
      <div className="bg-zinc-800 text-white px-8 py-2 items-center flex justify-between w-full relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">KitabMahal</h1>
        </Link>

        {/* Links for Large Screen */}
        <div className="nav-links-bookheaven items-center gap-4 relative">
          <div className="md:flex gap-4 items-center hidden">
            {Links.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}

            <div className="flex gap-4 items-center">
              <Link
                to="/signin"
                className="bg-blue-700 rounded px-4 py-1 hover:bg-white hover:text-zinc-800"
              >
                SignIn
              </Link>
              <Link
                to="/signup"
                className="bg-red-700 rounded px-4 py-1 hover:bg-gray-400 hover:text-zinc-800"
              >
                SignUp
              </Link>
            </div>
          </div>

          {/* Menu Button for Small/Medium Screen */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <FaGripLines className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Overlay Menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute top-0 left-0 w-full h-screen bg-zinc-800 z-20 flex-col items-center justify-center`}
      >
        {/* Close Button */}
        <button onClick={toggleMenu} className="absolute top-6 right-8 text-2xl">
          <FaTimes />
        </button>

        {/* Navbar Links Centered */}
        {Links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            onClick={closeMenu}  
            className="hover:text-blue-500 transition-all duration-300 py-4 text-2xl text-white"
          >
            {item.title}
          </Link>
        ))}

        {/* SignIn and SignUp Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <Link
            to="/signin"
            onClick={closeMenu}  
            
            className="bg-blue-700 rounded px-6 py-2 hover:bg-white hover:text-zinc-800 text-lg"
          >
            SignIn
          </Link>
          <Link
            to="/signup"
            onClick={closeMenu}  
            className="bg-red-700 rounded px-6 py-2 hover:bg-gray-400 hover:text-zinc-800 text-lg"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
