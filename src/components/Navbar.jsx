import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <a href="/" className="text-xl font-bold">
        YouLyst
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="#home" className="hover:underline">
          Home
        </a>
        <a href="#products" className="hover:underline">
          Products
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <FaUserCircle size={24} aria-label="User Profile" />
        <div className="md:hidden">
          <button className="text-white">☰</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
