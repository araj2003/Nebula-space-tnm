import React, { useState } from "react";
import { MdLock, MdLockOpen } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../MetaData";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";

/**
 * ResetPassword component allows users to reset their password using a token.
 *
 * @returns {JSX.Element} The rendered ResetPassword component.
 */

const ResetPassword = () => {
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

	const resetPasswordSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		}
		dispatch(
			resetPassword(token, {
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
			toast.success("Password Updated Successfully");

			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [dispatch, error, alert, navigate, success, token]);

	return (
    <>
      {loading ? (
        <div className="fixed top-0 bg-white w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="bg-teal-50 fixed w-screen h-screen top-0 z-50 grid place-content-center">
            <div className="bg-white flex flex-col scale-75 sm:scale-90 md:scale-100  w-[400px]  gap-10 px-6 py-10 shadow rounded border">
              <h2 className="text-center font-semibold  text-3xl ">
                Reset Password
              </h2>

              <form className="space-y-10" onSubmit={resetPasswordSubmit}>
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

export default ResetPassword;
