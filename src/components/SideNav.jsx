import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogind = localStorage.getItem("email");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="fixed top-2 left-2 z-50 text-2xl p-2 bg-gray-800 text-white rounded-md"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to={"/"}
          onClick={toggleMenu}
          className="text-2xl flex text-blue-400 pt-10 font-bold mb-4"
        >
          Home
        </Link>
        <ul className=" space-y-4">
          <li>
            <Link
              to="/CustomerTable"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              Customers Table
            </Link>
          </li>
          <li>
            <Link
              to="/BillGenerator"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              Bill Generator
            </Link>
          </li>
          {isLogind && (
            <li>
              <button className="hover:text-blue-400" onClick={logout}>Log-out</button>
            </li>
          )}
        </ul>
      </div>

      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default SideNav;
