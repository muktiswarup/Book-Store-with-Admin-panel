import React, { useState } from "react";
import { FaGripLines, FaTimes } from "react-icons/fa"; // Using both icons for menu and close
import { useSelector } from "react-redux";
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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    Links.splice(2, 2);
  }
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
          <h1 className="text-2xl font-semibold hover:text-blue-700">KitabMahal</h1>
        </Link>

        {/* Links for Large Screen */}
        <div className="nav-links-bookheaven items-center gap-4 relative">
          <div className="md:flex gap-4 items-center hidden">
            {" "}
            {/* hidden means valid for large screen not small */}
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
              {isLoggedIn === false && (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Menu Button for Small/Medium Screen */}
          <div className="md:hidden">
            {" "}
            {/* applicable for small devices only */}
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
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-8 text-2xl"
        >
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
          {isLoggedIn === false && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
