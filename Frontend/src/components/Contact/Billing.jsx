import React from "react";
import {BiCheckboxChecked} from "react-icons/bi";
const Billing = ({
  billingDetails,
  onBillingChange,
  shippingDetails,
  setBillingDetails,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setBillingDetails(shippingDetails);
  };
  return (
    <div className="pb-5 w-full pr-8 mt-1">
      <button
        className="mb-6 italic underline text-teal-800 flex items-center  "
        onClick={handleClick}
      > 
        <BiCheckboxChecked className="text-xl mb-0.5"/>
        <span >Billing Info same as Shipping Info</span>
      </button>
      <h2 className="font-semibold text-2xl md:text-3xl text-gray-700 mb-4 ">
        Billing Info
      </h2>
      <div className="w-full">
        <div className="w-full space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="fname"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={billingDetails.fname}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={billingDetails.lname}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="organization"
                className="block mb-1 text-sm font-medium text-gray-900 truncate"
              >
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={billingDetails.organization}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="ABC Company"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Official Email
              </label>
              <input
                type="email"
                id="email"
                name="officialEmailId"
                value={billingDetails.officialEmailId}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Phone No.
              </label>
              <input
                type="number"
                id="phone"
                name="phoneNo"
                value={billingDetails.phoneNo}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="1234567890"
                required
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block mb-1 text-sm font-medium text-gray-900 truncate"
              >
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                name="pinCode"
                value={billingDetails.pinCode}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="123456"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="country"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={billingDetails.country}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="United States"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={billingDetails.city}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="New York"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={billingDetails.state}
                onChange={onBillingChange}
                className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="New York"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Billing Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="2"
              value={billingDetails.address}
              onChange={onBillingChange}
              className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none  resize-none"
              placeholder="Your Billing Address..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
