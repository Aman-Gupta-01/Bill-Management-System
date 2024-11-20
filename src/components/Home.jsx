import React from "react";
import logoimg from "../components/IMG/Logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl pt-8 drop-shadow-xl text-green-500">
          Welcome To Bill Management and Solutions.
        </h1>
        <img
          className="w-40 md:w-60 lg:w-80 mt-6 drop-shadow-lg"
          src={logoimg}
          alt="Logo"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center drop-shadow-xl gap-4 mt-10">
        <Link
          to={'/CustomerTable'}
          className="h-28 sm:h-32 w-48 sm:w-56 border-2 border-gray-500 flex flex-col items-center rounded-3xl md:rounded-l-full lg:rounded-l-full justify-center text-center hover:bg-blue-600 bg-blue-500"
        >
          <h1 className="font-semibold drop-shadow-lg text-white text-sm sm:text-lg">
            Available Bills
          </h1>
        </Link>
        <Link
          to={'/BillGenerator'}
          className="h-28 sm:h-32 w-48 sm:w-56 border-2 border-gray-500 flex flex-col items-center rounded-3xl md:rounded-r-full lg:rounded-r-full justify-center text-center hover:bg-green-600 bg-green-500"
        >
          <h1 className="font-semibold drop-shadow-lg text-white text-sm sm:text-lg">
            Generate a bill
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Home;
