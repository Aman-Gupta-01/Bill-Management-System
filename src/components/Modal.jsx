import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import TheBill from './TheBill'; // Make sure TheBill is correctly imported

const Modal = ({ closeModal, billData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);

    // Wait for a brief moment to simulate loading
    setTimeout(() => {
      setIsLoading(false); // Stop loading after timeout
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 md:p-8">
        <div className="flex justify-end">
          <button
            onClick={() => closeModal(false)}
            className="text-gray-500 hover:text-red-500 font-bold text-lg"
          >
            <FaTimes />
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-green-400 font-serif mb-4">
            Success
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base font-semibold">
            Bill is Generated Successfully.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/CustomerTable")}
            className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Customer Table
          </button>

          <PDFDownloadLink
            document={<TheBill billData={billData} />}
            fileName={`bill_${billData.customerName}.pdf`}
          >
            {({ loading }) => (
              <button
                onClick={handleDownload}
                className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                disabled={isLoading || loading}
              >
                {loading ? "Generating..." : "Download Bill"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default Modal;
