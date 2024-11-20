import React, { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addBill } from "./app/slice/BillSlice";
import Modal from "./Modal";

const BillGenerator = () => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch();
  const [billData, setBillData] = useState(null)

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [billingDate, setBillingDate] = useState("");
  const [products, setProducts] = useState([
    { productName: "", productQuantity: "", productPrice: "", totalPrice: "" },
  ]);
  const [adjustment, setAdjustment] = useState(0);
  const [errors, setErrors] = useState({});

  const calculateTotals = () => {
    let totalProducts = 0;
    let grandTotal = 0;

    products.forEach((product) => {
      totalProducts += parseFloat(product.productQuantity || 0);
      grandTotal += parseFloat(product.totalPrice || 0);
    });

    return {
      totalProducts,
      grandTotal: (grandTotal - adjustment).toFixed(2),
    };
  };

  const { totalProducts, grandTotal } = calculateTotals();

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    if (field === "productQuantity" || field === "productPrice") {
      const quantity = parseFloat(updatedProducts[index].productQuantity) || 0;
      const price = parseFloat(updatedProducts[index].productPrice) || 0;
      updatedProducts[index].totalPrice = (quantity * price).toFixed(2);
    }

    setProducts(updatedProducts);
  };

  const addProductField = () => {
    setProducts([
      ...products,
      {
        productName: "",
        productQuantity: "",
        productPrice: "",
        totalPrice: "",
      },
    ]);
  };

  const removeProductField = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerName) newErrors.customerName = "Customer Name is required";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
    if (mobileNumber.length !== 10) newErrors.mobileNumber = "Please Enter 10 Digit Mobile Number";
    if (!address) newErrors.address = "Address is required";
    if (!billingDate) newErrors.billingDate = "Billing Date is required";

    products.forEach((product, index) => {
      if (!product.productName)
        newErrors[`productName-${index}`] = "Product Name is required";
      if (!product.productQuantity || product.productQuantity <= 0)
        newErrors[`productQuantity-${index}`] =
          "Quantity must be greater than zero";
      if (!product.productPrice || product.productPrice <= 0)
        newErrors[`productPrice-${index}`] = "Price must be greater than zero";
    });

    if(products.length === 0 ) newErrors.products = 'Add At Least One Product' 

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const billData = {
        customerName,
        mobileNumber,
        address,
        billingDate,
        products,
        totalProducts,
        grandTotal,
        adjustment,
      };

      dispatch(addBill(billData));
      setBillData(billData)

      setOpenModal(true);


      setCustomerName("");
      setMobileNumber("");
      setAddress("");
      setBillingDate("");
      setProducts([
        {
          productName: "",
          productQuantity: "",
          productPrice: "",
          totalPrice: "",
        },
      ]);
      setAdjustment(0);
      setErrors({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 border-b pb-4">
          Bill Generator
        </h2>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
            Customer Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm">{errors.customerName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mobile Number
              </label>
              <input
                type="number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Customer Mobile Number"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Customer Address"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Billing Date
            </label>
            <input
              type="date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.billingDate && (
              <p className="text-red-500 text-sm">{errors.billingDate}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
            Product Details
          </h3>
          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 border-b pb-4 mb-4 relative"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) =>
                    handleProductChange(index, "productName", e.target.value)
                  }
                  placeholder="Product Name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`productName-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`productName-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Quantity
                </label>
                <input
                  type="number"
                  value={product.productQuantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "productQuantity",
                      e.target.value
                    )
                  }
                  placeholder="Quantity"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`productQuantity-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`productQuantity-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Price
                </label>
                <input
                  type="number"
                  value={product.productPrice}
                  onChange={(e) =>
                    handleProductChange(index, "productPrice", e.target.value)
                  }
                  placeholder="Price"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`productPrice-${index}`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`productPrice-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Total Price
                </label>
                <input
                  type="text"
                  value={product.totalPrice}
                  readOnly
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Remove Product
                </label>
                <button
                  type="button"
                  className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => removeProductField(index)}
                >
                  <MdDeleteSweep size={24} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProductField}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
          {errors.products && (
                <p className="text-red-500 text-sm">{errors.products}</p>
              )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
            Adjustment & Totals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-4 justify-evenly items-center">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Adjustment (Discount in INR)
              </label>
              <input
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(parseFloat(e.target.value) || 0)}
                placeholder="Discount"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Total Products
              </label>
              <input
                type="text"
                value={totalProducts}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Grand Total
              </label>
              <input
                type="text"
                value={grandTotal}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Generate Bill
          </button>
        </div>
      </form>
      {openModal && <Modal closeModal={setOpenModal} billData={billData}/>}
    </div>
  );
};

export default BillGenerator;