import React from "react";
import { FaEnvelope} from "react-icons/fa"; // Using icons for email and phone

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-zinc-800 to-gray-900 text-white py-6 bg-zinc-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section: Copyright */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold text-purple-400">&copy; 2024, BookNest</h1>
          <p className="text-sm text-yellow-100 mt-2 ">All rights reserved</p>
        </div>

        {/* Right Section: Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <p>Contact Us:</p>
            <FaEnvelope className="text-blue-500" />
            <a
              href="mailto:Muktiswarup1510@gmail.com"
              className="hover:text-blue-400 transition-colors"
            >
              Muktiswarup1510@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
