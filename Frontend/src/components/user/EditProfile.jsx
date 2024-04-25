import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  clearUpdateUserErrors,
} from "../../actions/userAction";

const EditProfile = ({ user }) => {
  const [updatedUserInfo, setUpdatedUserInfo] = useState({}); // Use a different variable name for local state
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize the local state with the user's data from props
    setUpdatedUserInfo(user);
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Dispatch the updateUserProfile action with the updated user data
    dispatch(updateUserProfile(updatedUserInfo));
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
  };

  return (
    <div className="lg:p-2">
      <h2 className=" font-semibold my-4 pl-1 lg:my-0 text-lg lg:text-2xl text-center">
        Your Profile
      </h2>

      <form
        onSubmit={handleUpdateProfile}
        className="max-w-[600px] lg:max-w-none mx-auto py-3 lg:py-5 pr-8 pl-3 lg:px-7 flex flex-col gap-7 rounded-lg border lg:mt-5"
      >
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm lg:text-base text-gray-500">Name*</p>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 border border-r-0 border-gray-300 rounded-l-md">
              <svg
                className="w-4 h-4 text-teal-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              value={updatedUserInfo?.name || ""}
              type="text"
              name="name"
              className="rounded-none rounded-r-lg bg-gray-50 border outline-none border-gray-300 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5  lg:p-2.5 "
              placeholder="Bonnie Green"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm lg:text-base text-gray-500">Email</p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center px-3 border rounded-l-md pointer-events-none bg-white">
              <svg
                className="w-4 h-4 text-teal-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              name="email"
              value={updatedUserInfo?.email || ""}
              onChange={handleInputChange}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-500  text-sm rounded-lg outline-none block w-full py-2 lg:py-2.5 pl-12"
              placeholder="name@flowbite.com"
              required
              disabled
            />
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-1.5 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
