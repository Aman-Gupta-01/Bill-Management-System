import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from "react-icons/fa6";
import { removeRaw } from './app/slice/BillSlice';
import { MdDeleteSweep } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CustomerTable = () => {
  const data = useSelector(state => {
    console.log(state.billReducer.userBill); 
    return state.billReducer.userBill;
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleDownloadClick = useCallback((item) => {
    navigate('/download-bill', { state: { billData: item } });
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl sm:text-2xl flex items-center justify-center font-semibold text-blue-700 mb-4">
        Customer Table
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-blue-300">
              {/* Table Header */}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Table Rows */}
                  <td className="py-2 px-4 gap-2 sm:text-sm items-center border-l-2 justify-center flex">
                    <MdDeleteSweep className='text-red-600 hover:text-red-700 cursor-pointer' size={24} onClick={() => dispatch(removeRaw(index))} />
                    <FaDownload className='text-green-600 hover:text-green-700 cursor-pointer' size={20} onClick={() => handleDownloadClick(item)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
