import { useEffect, useState } from "react";
import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	removeItemFromCart,
	getCartItems,
	changeQuantityCart,
} from "../../actions/cartAction";
import CartItemCard from "./CartItemCard";
import MetaData from "../MetaData";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader/Loader";
import { BsArrowRight } from "react-icons/bs";
import { useGlobalContext } from "../../context/globalcontext";

/**
 * Cart component displays the items in the cart.
 *
 * @component
 * @returns {JSX.Element} - The Cart component.
 */

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems, loading: cartLoading } = useSelector(
		(state) => state.cart
	);
	const {
		user,
		isAuthenticated,
		loading: userLoading,
	} = useSelector((state) => state.user);
	// console.log(isAuthenticated);
	const { setCheckout } = useGlobalContext();
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (isAuthenticated) dispatch(getCartItems());
	}, [dispatch]);

	useEffect(() => {
		// console.log(cartItems);
		setCart(cartItems);
	}, [cartItems]);

	const updateQuantity = (id, quanity) => {
		dispatch(changeQuantityCart(id, quanity));
	};
	const deleteCartItems = (id) => {
		dispatch(removeItemFromCart(id));
	};
	const checkOutHandler = () => {
		navigate("/contact");
		setCheckout(true);
	};
	return (
		<>
			<MetaData title='Cart-items' />
			{cartLoading ? (
				<Loader />
			) : cart.length === 0 ? (
				<div className='pt-24 lg:pt-0  min-h-[70vh] flex justify-center flex-col gap-3 items-center'>
					<MdRemoveShoppingCart className='text-white text-5xl md:text-[100px]' />
					<h2 className='text-gray-400 font-semibold text-lg md:text-2xl'>
						{" "}
						No Products in your Cart
					</h2>
					<Link
						to='/products'
						className='bg-teal-600 hover:bg-white border-2 border-teal-600 hover:text-teal-700 transition-all duration-150 text-white px-3 md:px-6 rounded-md md:text-lg py-1.5 mt-5'>
						View All Products
					</Link>
				</div>
			) : (
				<>
					<div className='min-h-[75vh] pt-32 lg:py-10 flex flex-col md:flex-row  gap-5 w-[90%] mx-auto'>
						<div className='flex flex-col gap-5 md:w-3/5 '>
							<div className='w-full'>
								<h2 className='text-3xl font-semibold md:text-[2rem] w-full text-white pl-4 border-b-2 pb-3 text-center  md:text-left'>
									Your Shopping Cart
								</h2>
							</div>
							<div className='w-full flex flex-wrap md:flex-col '>
								{cart &&
									cart.map(
										(item) =>
											item.product != null && (
												<div
													className=' flex w-full'
													key={item.product._id}>
													<CartItemCard
														product={item?.product}
														item={item}
														quantity={item?.quantity}
														deleteCartItems={deleteCartItems}
														cartId={item._id}
														updateQuantity={updateQuantity}
													/>
												</div>
											)
									)}
							</div>
						</div>
						<div className=' w-5/6 max-w-[250px] md:max-w-none mx-auto md:pt-4 md:w-[27%] md:pl-6 lg:border-l-2 '>
							<div
								className='bg-teal-600 text-white text-center my-5 py-1.5 md:py-3 flex items-center justify-center gap-3 transition-all hover:bg-white border-2 border-teal-600 hover:text-teal-700 hover:cursor-pointer group'
								onClick={checkOutHandler}>
								<button>Proceed to Checkout</button>
								<BsArrowRight className='hidden lg:block transition-all duration-300 px-2group-hover:translate-x-2' />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
