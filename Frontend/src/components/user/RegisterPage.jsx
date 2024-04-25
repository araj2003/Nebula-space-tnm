import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, loginGoogle } from "../../actions/userAction";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, isAuthenticated, emailSent } = useSelector(
		(state) => state.user
	);
	// console.log(emailSent);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (!loading && isAuthenticated) {
			navigate("/");
		}
		if (!loading && emailSent) {
			navigate("/emailsent");
		}
	}, [dispatch, error, isAuthenticated, emailSent]);

	const registerSubmit = (e) => {
		e.preventDefault();
		dispatch(register(name, email));
	};

	function handleGoogleSignupSuccess(tokenResponse) {
		const accessToken = tokenResponse.access_token;

		const signinGoogle = async (accessToken) => {
			try {
				dispatch(loginGoogle(accessToken));
				// navigate("/");
			} catch (err) {
				// console.log(err);
			}
		};

		signinGoogle(accessToken);
	}

	const signup = useGoogleLogin({ onSuccess: handleGoogleSignupSuccess });

	const modalBody = (
		<div className="z-50 bg-white fixed w-full h-screen top-0 flex justify-center items-center flex-col ">
			<div className="lg:w-[26%]">
				<h2 className="text-4xl font-semibold text-center mb-7">
					Register with Us
				</h2>
				<form onSubmit={registerSubmit} className="flex flex-col gap-5">
					<div>
						<p className="mb-2 text-lg">Name</p>
						<input
							type="text"
							className="border px-2 py-3 outline-none w-full rounded"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div>
						<p className="mb-2 text-lg">Email</p>
						<input
							type="email"
							className="border px-2 py-3 outline-none w-full rounded text-lg"
							placeholder="johndoe@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="text-center pt-1  pb-1">
						<button
							type="submit"
							className="bg-teal-600 border-2 border-teal-600 transition duration-300  hover:text-teal-600 hover:bg-white text-white w-full py-2 font-semibold text-xl rounded-md"
						>
							Register
						</button>
					</div>
					<span className="h-0.5 bg-gray-300 opacity-70"></span>
					<button
						onClick={signup}
						className="group h-12 px-6 border-2 border-gray-300 rounded-md	 transition duration-300 w-full font-semibold  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
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
				</form>

				<div className="flex items-center justify-center pr-2 mt-6 text-lg">
					<p className="text-gray-600">Already have an account?&nbsp;</p>
					<NavLink to="/login">
						<span className="text-teal-700 hover:underline">Login</span>
					</NavLink>
				</div>
			</div>
		</div>
	);

	return <>{modalBody}</>;
};

export default RegisterPage;
