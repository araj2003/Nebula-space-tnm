import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions/userAction";

const ManageAddress = ({ shippingAddress }) => {
  const [shipping, setShipping] = useState({
    fname: "",
    lname: "",
    address: "",
    officialEmailId: "",
    organization: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({address : shipping}));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (shippingAddress && shippingAddress !== null) {
      setShipping(shippingAddress);
    }
  }, [shippingAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  return (
    <div className="lg:p-2">
      <h2 className="font-semibold my-4 pl-1 lg:my-0 text-lg lg:text-2xl text-center">
        Manage Address
      </h2>
      <form
        onSubmit={handleUpdateProfile}
        className="py-3 lg:py-5 pr-8 pl-3 lg:px-7 flex flex-col gap-7 rounded-lg border lg:mt-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="fname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              value={shipping.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="lname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="Doe"
              value={shipping.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="organization"
              className="block mb-2 text-sm font-medium text-gray-900 truncate"
            >
              Organization Name
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="ABC Company"
              value={shipping.organization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="officialEmailId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Official Email
            </label>
            <input
              type="email"
              id="officialEmailId"
              name="officialEmailId"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="name@company.com"
              value={shipping.officialEmailId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNo"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone No.
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="1234567890"
              value={shipping.phoneNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="pinCode"
              className="block mb-2 text-sm font-medium text-gray-900 truncate"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="123456"
              value={shipping.pinCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="United States"
              value={shipping.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="New York"
              value={shipping.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              placeholder="New York"
              value={shipping.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Shipping Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none  resize-none"
            placeholder="Your Shipping Address..."
            value={shipping.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="py-3 px-5 text-sm font-medium text-center text-white self-end rounded-lg bg-primary-700 sm:w-fit bg-teal-600"
        >
          Update Address
        </button>
      </form>
    </div>
  );
};

export default ManageAddress;
