import { useState } from "react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMenuAlt1 } from "react-icons/hi";
import Logo from "../../assets/images/Logo.webp";
import SmallLogo from "../../assets/images/newlogo.svg";
import Cart from "../../assets/images/cart.svg";
import call from "../../assets/images/call.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import {logout } from "../../actions/userAction";
import SearchBar from "../Home/SearchBar";
import { getCartItems } from "../../actions/cartAction";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../../context/globalcontext";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
	const { isAuthenticated, loading, user } = useSelector((state) => state.user);
	const { cartItems, loading: cartLoading } = useSelector(
		(state) => state.cart
	);

	const navigate = useNavigate();
	const [dropdown, setDropdown] = useState(false);
	const { cartQuantity, setCartQuantity } = useGlobalContext();

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {
		setCartQuantity(cartItems.length);
	}, [cartItems]);
	// console.log(isAuthenticated);
	useEffect(() => {
		if (!loading && isAuthenticated && !cartLoading) {
			dispatch(getCartItems());
		}
	}, [dispatch, isAuthenticated, user]);

	return (
    <div>
      <nav className="w-screen lg:flex flex-col  hidden top-0 z-50 py-3 backdrop-blur fixed bg-black">
        <div className="w-full  flex gap-5 justify-between  shadow-md px-[1rem] xl:px-[5rem]">
          <div className="h-[4.7rem] flex justify-center items-center">
            <Link to="/" className="w-full h-full flex items-center text-white text-lg font-medium">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTMA2vjPal73v3kL_lKJAI1WRhMUd4z45-YKjppOfOqi6oZlGBk9EcjEXc1J4WdRDwGW4&usqp=CAU" className="h-4/5 " alt="logo" />
              <span>Rocketeers</span>
            </Link>
          </div>
          <SearchBar />
          <div className="w-fit flex justify-between">
            <div className="flex gap-1 xl:gap-[1.5rem] items-center ">
              {/* Need to Add the Links */}
              <div className="flex gap-2 xl:gap-5 items-center">
                {/* <a
                  href="tel:+919773727759"
                  className="hover:scale-110 transition-transform duration-150"
                >
                  <img src={call} alt="call" />
                </a>
                <a
                  href="https://wasap.my/919773727759"
                  className="
                    hover:scale-110
                    transition-transform
                    duration-150"
                >
                  <img src={whatsapp} alt="whatsapp" />
                </a> */}

                {!isAuthenticated ? (
                  <>
                    <Link
                      to={"/login"}
                      className="Button w-[106px] h-10 px-6 bg-teal-600  hover:bg-teal-700 active:bg-teal-800 transition-all duration-100 rounded-md flex-col justify-start items-start inline-flex"
                    >
                      <div className="PCtabuttonLabel0xuc5 self-stretch h-10 flex-col justify-start items-start flex">
                        <div className="SignUp text-white text-sm font-semibold font-['Roboto'] uppercase leading-10">
                          Sign In 
                        </div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-2 xl:gap-4">
                    <FaUserCircle
                      className="text-3xl text-white hover:cursor-pointer hover:scale-110 transition-all duration-500"
                      onClick={() => {
                        navigate("/profile");
                      }}
                    />
                    <button
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                      className="bg-teal-600 text-white px-2 xl:px-4 h-9 xl:h-10 rounded-md self text-[13px] xl:text-sm uppercase font-semibold whitespace-nowrap  hover:bg-teal-700 active:bg-teal-800 transition-all duration-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
              {/* <Link to="/cart" className="AddToCart w-20 h-8 relative">
                <div className="Cart left-[13px] top-0 absolute justify-start items-center inline-flex">
                  <div className="flex-col justify-center items-center inline-flex">
                    <img src={Cart} alt="cart" />
                  </div>
                  <div className="Cart text-zinc-900 text-base">Cart</div>
                </div>
                <div className="Number w-4 left-1 top-0 absolute bg-teal-500 rounded-full  text-xs justify-center items-center flex text-white">
                  {cartItems.length}
                </div>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Small Viewport Navbar */}
      <nav className="flex bg-white  z-40 lg:hidden flex-col w-screen  py-3 px-1 shadow-md justify-around items-center fixed top-0 ">
        <div className=" w-full h-full flex justify-around items-center ">
          <Link to={"/"} className="h-12 sm:h-14">
            <img src={SmallLogo} alt="logo" className="h-full w-full" />
          </Link>
          <div className="flex w-3/4 md:w-1/2 flex-col justify-center">
            <SearchBar />
          </div>
          <div className="cart-wrapper flex items-center gap-3">
            <Link to="/cart" className="hidden md:block relative">
              <span className="absolute bg-teal-600 rounded-full text-xs text-white h-5 w-5 -top-2 -left-2 grid place-content-center">
                {cartQuantity}
              </span>
              <img src={Cart} className="cart h-7 w-7 " alt="cart" />
            </Link>
            <div className="hidden lg:flex justify-center gap-3">
              <img src={call} alt="img" />
              <img src={whatsapp} alt="img" />
            </div>
              {isAuthenticated && (
                <FaUserCircle
                  className="text-3xl hidden md:flex text-teal-600 hover:cursor-pointer hover:scale-110 transition-all duration-500"
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              )}
            <HiMenuAlt1
              style={{
                height: "30px",
                width: "30px",
                color: "#008080",
                margin: "0",
              }}
              onClick={() => {
                setDropdown(!dropdown);
              }}
              className="active:cursor-pointer hover:scale-110 transition-all duration-300 ml-2"
            />
          </div>

          {dropdown ? (
            <div className="fixed z-20 top-[10%] bg-white   right-[2%]   rounded shadow  border w-40 md:w-52 py-2  ">
              <ul className="w-full flex flex-col items-center gap-6 py-1 text-sm text-gray-700  h-full md:text-base">
                {isAuthenticated && (
                  <div className="md:hidden flex justify-center gap-3 h-6">
                    <button className="flex gap-1 items-center" onClick={() => {
                          navigate("/profile");
                          setDropdown(false);
                          setDropdown(false);
                        }}>
                      <FaUserCircle
                        className="text-[28px] border-2 p-0.5 rounded-full  text-teal-600 hover:cursor-pointer hover:scale-110 transition-all duration-500"
                        
                      />
                      <span>Profile</span>
                    </button>
                  </div>
                )}
                {!isAuthenticated ? (
                  <>
                    <Link
                      to={"/login"}
                      className=" text-teal-700  text-center underline font-bold 
                      transition-all duration-150"
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center py-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdown(false);
                        navigate("/");
                      }}
                      className="font-bold flex gap-1 text-teal-700"
                    >
                      <IoIosLogOut className="text-xl" />
                      Log Out
                    </button>
                  </div>
                )}
                <a
                  href="tel:+919773727759"
                  className="flex items-center gap-1 "
                >
                  <img src={call} alt="call" className="h-6"/>
                  <span className="font-bold flex gap-1 text-teal-700">Contact</span>
                </a>
                <a
                  href="https://wasap.my/919773727759"
                  className="
                  flex items-center gap-1 py-2"
                >
                  <img src={whatsapp} alt="whatsapp" className="h-6"/>
                  <span className="font-bold flex gap-1 text-teal-700">Whatsapp</span>
                </a>
                <Link to="/cart" className="flex items-center gap-1 relative md:hidden">
                  <span className="absolute   bg-teal-600 rounded-full text-xs text-white h-5 w-5 -top-2 -left-2 grid place-content-center">
                    {cartQuantity}
                  </span>
                  <img src={Cart} className="cart h-7 w-7 " alt="cart" />
                  <span>Cart</span>
                </Link>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
