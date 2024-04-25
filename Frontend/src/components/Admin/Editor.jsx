import { useState } from "react";

import Products from "./Products";
import { setURLRole } from "./api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const ButtonName = ["Products"];
const Admin = () => {
	const [page, setPage] = useState(0);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	setURLRole("editor");

	const navigate = useNavigate();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const dispatch = useDispatch();
	const { isAuthenticated, loading, user } = useSelector((state) => state.user);

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			dispatch(loadUser());
		}
	}, [dispatch, isAuthenticated, user]);

	if (!loading && !isAuthenticated) {
		navigate("/");
	}
	if (!loading && user?.role !== "editor" && isAuthenticated) {
		navigate("/");
	}

	return (
		<>
			<button
				onClick={toggleSidebar}
				type="button"
				className="fixed bottom-4 z-50 inline-flex items-center p-2 mt-2 ml-3 outline outline-white text-sm text-white rounded-lg sm:hidden focus:outline-none focus:ring-2  bg-gray-800"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					/>
				</svg>
			</button>
			<aside
				className={`fixed left-0 top-0 z-40 w-32 sm:w-40 md:w-52  mt-16 sm:mt-24 lg:mt-0 transition-transform h-full ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} sm:translate-x-0`}
				aria-label="Sidebar"
			>
				<div className="h-full px-1 lg:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<ul className="space-y-2 font-medium">
						{ButtonName.map((name, index) => {
							return (
								<li
									onClick={() => setPage(index)}
									className={index === page && "bg-gray-700"}
								>
									<SidebarButton name={name} />
								</li>
							);
						})}
					</ul>
				</div>
			</aside>
			<div className="ml-0 sm:ml-44 md:ml-56 min-h-screen py-24 lg:py-2 pr-2">
				{page === 0 && <Products />}
			</div>
		</>
	);
};
const SidebarButton = ({ name }) => {
	return (
		<a
			href="#"
			className="flex items-center p-1 md:p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-sm md:text-base"
		>
			<span className="flex-1 md:ml-3 whitespace-nowrap">{name}</span>
		</a>
	);
};
export default Admin;
