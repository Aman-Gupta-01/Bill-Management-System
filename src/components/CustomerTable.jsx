import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from "react-icons/fa6";
import { MdDeleteSweep } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TheBill from './TheBill'; // Ensure TheBill is correctly imported
import { removeRaw } from './app/slice/BillSlice'; // Ensure removeRaw is correctly imported

const CustomerTable = () => {
  const data = useSelector(state => {
    console.log(state.billReducer.userBill); 
    return state.billReducer.userBill;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl sm:text-2xl flex items-center justify-center font-semibold text-blue-700 mb-4">
        Customer Table
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-blue-300">
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Client Name
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Product Quantity
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Billing Date (YYYY/MM/DD)
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Contact Details (IN)
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Address
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Billing Price (INR)
              </th>
              <th className="py-2 px-4 border-b text-xs sm:text-sm font-medium text-gray-600">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    {item.customerName}
                  </td>
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    {item.totalProducts} items
                  </td>
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    {item.billingDate}
                  </td>
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    +91 {item.mobileNumber}
                  </td>
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    {item.address}
                  </td>
                  <td className="py-2 px-4 border-b text-xs sm:text-sm text-gray-800">
                    ₹ {item.grandTotal}
                  </td>
                  <td className="py-2 px-4 gap-2 sm:text-sm items-center border-l-2 justify-center flex">
                    {/* Delete Icon */}
                    <MdDeleteSweep
                      className='text-red-600 hover:text-red-700 cursor-pointer'
                      size={24}
                      onClick={() => dispatch(removeRaw(index))}
                    />
                    
                    {/* PDFDownloadLink for Download Bill */}
                    <PDFDownloadLink
                      document={<TheBill billData={item} />}
                      fileName={`bill_${item.customerName}_${item.billingDate}.pdf`}
                    >
                      {({ loading }) => (
                        <FaDownload
                          className='text-green-600 hover:text-green-700 cursor-pointer'
                          size={20}
                          onClick={() => {}}
                          disabled={loading}
                        />
                      )}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
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
