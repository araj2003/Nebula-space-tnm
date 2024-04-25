import React, { useState } from "react";
import { API_URL } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
const Catalog = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    address: "",
    phone: "",
    email: "",
    country: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/rfq`, {
      ...formData,
    });
    toast.success("Your request has been submitted successfully");
    setFormData({
      name: "",
      companyName: "",
      address: "",
      phone: "",
      email: "",
      country: "",
      category: "",
    });
  };

  return (
    <div className="py-24 lg:py-10 flex flex-col gap-1 md:gap-4 text-sm md:text-base w-[90%]  mx-auto my-3">
      <h2 className="text-2xl md:text-3xl text-gray-800 font-semibold">
        Request a Free Catalogue
      </h2>
      <p className="text-gray-500 w-5/6 my-2">
        Kindly fill the form given below to get FREE copy of Space Wonders Catalog
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* First row */}
          <div className="w-1/2">
            <p className="my-1 ">Name</p>
            <input
              required
              type="text"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2">
            <p className="my-1 ">Company Name</p>
            <input
              required
              type="text"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your company name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* Second row */}
          <div className="w-1/2">
            <p className="my-1 ">Address</p>
            <input
              required
              type="text"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2">
            <p className="my-1 ">Phone</p>
            <input
              required
              type="text"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* Third row */}
          <div className="w-1/2">
            <p className="my-1 ">Email</p>
            <input
              required
              type="email"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2">
            <p className="my-1 ">Country</p>
            <input
              required
              type="text"
              className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
              placeholder="Enter your country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-1/2">
          <p className="my-1 ">Cateogory</p>
          <input
            required
            type="text"
            className="border px-2 py-1.5 md:py-3 outline-none w-full rounded"
            placeholder="Enter Category for which you want Catalogue"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="text-center py-1 flex justify-end pr-2 lg:mr-10">
          <button
            type="submit"
            className=" hover:outline outline-2 flex gap-2 justify-center items-center group px-4 md:px-9 rounded-md outline-teal-600 hover:text-teal-700 py-2.5 font-semibold bg-teal-600 text-white transition-all duration-300  hover:bg-white"
          >
            Get a Free Catalog
          </button>
        </div>
      </form>
    </div>
  );
};

export default Catalog;
