import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/user/forgotpassword`, {
        email: email,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/forgot-mail-sent");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, message]);

  const modalBody = (
    <div className="z-50 bg-teal-600 fixed w-full h-screen top-0 flex justify-center items-center flex-col">
      <div className="lg:w-1/3 flex flex-col items-center">
        <div className="mb-5 flex flex-col items-center">
          <h2 className="text-5xl font-semibold text-white text-center">
            Forgot Your Password?
          </h2>
          <p className="my-5 text-white  text-xl w-4/5  text-center">
            Don't worry we can help!
          </p>
        </div>
        <form className="flex flex-col gap-4 w-4/5">
          <div className="forgotPasswordEmail text-xl">
            <input
              type="email"
              placeholder="Please fill in your email address"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none pl-4  py-3 w-full rounded-lg"
            />
          </div>
          <div className="text-center mb-2">
            <button
              type="submit"
              className="py-2  rounded-lg  w-full text-white border-2 border-white hover:bg-white hover:text-teal-700 text-xl  transition-all duration-200 font-semibold "
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
          <span className="h-[1.6px] bg-white  opacity-70"></span>
        </form>
        <div className="flex  mt-8 items-center  gap-6">
          <div className="flex flex-col items-center text-white ">
            <Link to="/register" className="hover:underline mb-1">
              Create an Account
            </Link>
            <Link to="/login" className="hover:underline">
              Already have an account? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{modalBody}</>;
};

export default ForgotPasswordPage;
