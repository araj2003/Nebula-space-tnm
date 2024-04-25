import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	clearErrors,
	loadUser,
	login,
	loginGoogle,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import googleBtn from "../../assets/images/btn_google_light_normal_ios.svg";
import { toast } from "react-toastify";

const LoginTabContent = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		if (!loading && isAuthenticated) {
			navigate("/");
		}
	}, [dispatch, error, alert, navigate, isAuthenticated]);

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		if (isAuthenticated) {
			navigate("/");
		}
	};
	function handleGoogleSigninSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;

		const signinGoogle = async (accessToken) => {
			try {
				dispatch(loginGoogle(accessToken));
				// navigate("/")
			} catch (err) {
				// console.log(err);
				toast.error("Login failed!");
			}
		};
		signinGoogle(accessToken);
	}

	const loginGoogleButton = useGoogleLogin({
		onSuccess: handleGoogleSigninSuccess,
	});

	const modalBody = (
		<div className="z-50 bg-white fixed w-full h-screen top-0 flex justify-center items-center flex-col ">
			<div className="lg:w-[26%]">
				<div className="mb-3 flex flex-col gap-2 items-center">
					<h2 className="text-4xl font-semibold text-center ">Hello Again!</h2>
					<span className="text-lg text-teal-800">
						Welcome back you've been missed!
					</span>
				</div>
				<form onSubmit={loginSubmit} className="flex flex-col gap-5">
					<div>
						<p className="mb-2 text-lg text-gray-600">Email</p>
						<input
							type="email"
							className="border px-2 py-3 outline-none w-full rounded text-lg"
							placeholder="johndoe@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<div className="flex justify-between">
							<p className="mb-2 text-lg text-gray-600">Password</p>

							<Link
								to={"/forgotpassword"}
								className="text-teal-700 hover:underline"
							>
								Forgot password?
							</Link>
						</div>

						<input
							type="password"
							label="Password"
							className="border px-2 py-3 outline-none w-full rounded"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="text-center pt-1  pb-1">
						<button
							type="submit"
							className="bg-teal-600 border-2 border-teal-600 transition duration-300  hover:text-teal-600 hover:bg-white text-white w-full py-2 font-semibold text-xl rounded-md"
						>
							Log in
						</button>
					</div>
					<span className="h-[1.6px] bg-gray-300  opacity-70"></span>
				</form>
				<button
					onClick={loginGoogleButton}
					className="group h-12 px-6 border-2 mt-5 border-gray-300 rounded-md	 transition duration-300 w-full font-semibold  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
				>
					<div className="relative flex items-center space-x-4 justify-center">
						<img
							src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
							className="absolute left-0 w-5"
							alt="google logo"
						/>
						<span className="block  w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base mt-0.5">
							Continue with Google
						</span>
					</div>
				</button>

				<div className=" flex items-center justify-center pr-2 mt-6 text-lg">
					<p className="text-gray-600">Don't have an account?&nbsp;</p>
					<NavLink to={"/register"}>
						<span className="text-teal-700 hover:underline">Sign Up</span>
					</NavLink>
				</div>
			</div>
		</div>
	);

	return <>{modalBody}</>;
};

export default LoginTabContent;
