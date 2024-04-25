const Shipping = ({ shippingDetails, onShippingChange }) => {
  let address = shippingDetails;
  if (shippingDetails === null) {
    address = {
      fname: "",
      lname: "",
      organization: "",
      officialEmailId: "",
      phoneNo: "",
      pinCode: "",
      country: "",
      city: "",
      state: "",
      address: "",
    };
  }
  return (
    <>
      <div className="pb-5 w-full pr-8">
        <h2 className="font-semibold text-2xl md:text-3xl text-white mb-4">
          Personal Address
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
                  value={address.fname}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.lname}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.organization}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.officialEmailId}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.phoneNo}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.pinCode}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.country}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.city}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                  value={address.state}
                  onChange={onShippingChange}
                  className="bg-gray-50 border border-gray-300 outline-none text-gray-800 text-sm rounded-lg  block w-full p-2"
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
                Shipping Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                value={address.address}
                onChange={onShippingChange}
                className="block p-2 w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 outline-none  resize-none"
                placeholder="Your Shipping Address..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
