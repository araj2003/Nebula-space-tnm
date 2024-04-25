import React, { useState } from "react";
import { MdLock, MdLockOpen } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../MetaData";
import { clearErrors, activateAccount } from "../../actions/userAction";
import { toast } from "react-toastify";

/**
 * ActivateAccount component allows users to reset their password using a token.
 *
 * @returns {JSX.Element} The rendered ActivateAccount component.
 */

const ActivateAccount = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, success, loading } = useSelector(
		(state) => state.forgotPassword
	);
	// console.log(success);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const activateAccountSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		}
		dispatch(
			activateAccount(token, {
				password: password,
			})
		);
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			toast.success("Account activated successfully");

			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [dispatch, error, alert, navigate, success, token]);

	return (
    <>
      {loading ? (
        <div className="bg-white fixed top-0 w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="bg-teal-50 fixed w-screen h-screen top-0 z-50 grid place-content-center">
            <div className="bg-white flex flex-col  sm:scale-90 md:scale-100  w-[500px]  gap-10 px-6 aspect-square justify-center pb-10 shadow rounded border">
              <div className="space-y-2">
                <h2 className="text-center font-semibold  text-4xl ">
                  Activate your Account
                </h2>
                <p className="text-center  text-gray-500 text-xl ">
                  Create a Password
                </p>
              </div>
              <form className="space-y-10" onSubmit={activateAccountSubmit}>
                <div className="flex gap-2 p-2 border items-center rounded-md">
                  <MdLockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex gap-2 p-2 border items-center rounded-md">
                  <MdLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white p-2 font-semibold rounded-md"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ActivateAccount;
