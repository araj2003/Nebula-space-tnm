import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Loader from "../layout/Loader/Loader";
import MetaData from "../MetaData";
import { loadUser } from "../../actions/userAction";
import ManageAddress from "./ManageAddress";
import EditProfile from "./EditProfile";

const Profile = () => {
	const { user, loading, isAuthenticated } = useSelector((state) => state.user);
	const dispatch = useDispatch(); // Get access to the dispatch function
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("editProfile"); // Default active tab
	// console.log(loading, isAuthenticated, user);
	useEffect(() => {
		if (!loading && !isAuthenticated) navigate("/");
		if (!user && isAuthenticated) {
			dispatch(loadUser());
		}
	}, [user, isAuthenticated, dispatch]);

	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
	};
	return (
		<div className="pt-24 lg:pt-8 min-h-[75vh]">
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={`${user?.name}'s Profile`} />
					<div className="flex flex-col lg:flex-row p-2 gap-2 lg:gap-5  lg:justify-center min-h-[50vh]">
						<div className="lg:border-2 lg:w-1/5 lg:px-5 py-2 lg:py-6 lg:h-96 ">
							<div className="flex flex-col gap-3 lg:mb-7">
								<div className="flex gap-3">
									<FaUserAlt className="text-teal-600 hidden lg:block text-lg mt-0.5" />
									<h2 className="uppercase text-sm lg:text-base text-gray-700 lg:text-teal-600 font-bold">
										Profile Settings
									</h2>
								</div>
								<div className="text-xs sm:text-sm flex lg:flex-col gap-2 font-semibold">
									<button
										className={`${
											activeTab === "editProfile"
												? "bg-teal-600 text-white"
												: "bg-gray-100 text-gray-800"
										} text-center lg:text-left  whitespace-nowrap lg:px-4 py-2 lg:py-3 rounded-lg lg:hover:scale-105 transition-all duration-300 cursor-pointer w-1/3 lg:w-4/5`}
										onClick={() => handleTabClick("editProfile")}
									>
										Edit Profile
									</button>
									<button
										className={`${
											activeTab === "manageAddress"
												? "bg-teal-600 text-white"
												: "bg-gray-100 text-gray-800"
										} text-center lg:text-left  whitespace-nowrap lg:px-4 py-2 lg:py-3 rounded-lg active:bg-teal-600 active:text-white lg:hover:scale-105 transition-all duration-300 cursor-pointer w-1/3 lg:w-4/5`}
										onClick={() => handleTabClick("manageAddress")}
									>
										Manage Address
									</button>
									<Link to="/orders" className="w-1/3 lg:w-full">
										<button className="w-full bg-gray-100 text-left px-4 py-2 lg:py-3 text-gray-800 rounded-lg lg:hover:scale-105 hover:bg-teal-600 active:text-white hover:text-white active:bg-teal-600 hover:text-whitetransition-all duration-300 cursor-pointer lg:w-4/5">
											Your Orders
										</button>
									</Link>
									{!loading && user && user.role === "admin" && (
										<Link to="/admin/dashboard" className="w-1/3 lg:w-full">
											<button className="w-full bg-gray-100 text-left px-4 py-2 lg:py-3 text-gray-800 rounded-lg lg:hover:scale-105 hover:bg-teal-600 active:text-white hover:text-white active:bg-teal-600 hover:text-whitetransition-all duration-300 cursor-pointer lg:w-4/5">
												Admin Page
											</button>
										</Link>
									)}
									{!loading && user && user.role === "editor" && (
										<Link to="/editor/dashboard" className="w-1/3 lg:w-full">
											<button className="w-full bg-gray-100 text-left px-4 py-2 lg:py-3 text-gray-800 rounded-lg lg:hover:scale-105 hover:bg-teal-600 active:text-white hover:text-white active:bg-teal-600 hover:text-whitetransition-all duration-300 cursor-pointer lg:w-4/5">
												Editor Page
											</button>
										</Link>
									)}
									{!loading && user && user.role === "content" && (
										<Link to="/content/dashboard" className="w-1/3 lg:w-full">
											<button className="w-full bg-gray-100 text-left px-4 py-2 lg:py-3 text-gray-800 rounded-lg lg:hover:scale-105 hover:bg-teal-600 active:text-white hover:text-white active:bg-teal-600 hover:text-whitetransition-all duration-300 cursor-pointer lg:w-4/5">
												Content Page
											</button>
										</Link>
									)}
								</div>
							</div>

							{/* <div className="hidden lg:flex flex-col gap-3 mb-7 ">
                <div className="flex gap-2 font-semibold items-center">
                  <BiLogOut className="text-black text-lg" />
                  <h2 className=" text-black font-semibold mt-0.5">Log Out</h2>
                </div>
              </div> */}
						</div>
						<div className=" lg:w-[65%]">
							{activeTab === "manageAddress" && (
								<ManageAddress shippingAddress={user?.address} />
							)}
							{activeTab === "editProfile" && <EditProfile user={user} />}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
