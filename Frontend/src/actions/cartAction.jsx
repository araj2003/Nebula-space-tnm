/**
 * Action to add items to the cart.
 *
 * @function addItemsToCart
 * @async
 * @param {string} id - The ID of the product to add to the cart.
 * @param {number} quantity - The quantity of the product to add to the cart.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while adding items to the cart.
 */
import { API_URL } from "../api";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	GET_CART_ITEMS,
	CHANGE_QUANTITY_CART,
} from "../constants/cartConstant";

import axios from "axios";
axios.defaults.withCredentials = true;
//axios set headers
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

export const addToCart =
	(productId, quantity, size, color, other, cb) => async (dispatch) => {
		try {
			const response = await axios.post(
				`${API_URL}/product/one/${productId}/addtocart`,
				{
					productid: productId,
					quantity: quantity,
					size: size,
					color: color,
					other: other,
				}
			);

			// Dispatch an action of type ADD_TO_CART
			// console.log(response.data);
			if (response.data.success) {
				dispatch({
					type: ADD_TO_CART,
					payload: response.data.cart,
				});
				cb();
			} else {
				// console.log(response.data);
			}
		} catch (error) {
			console.error("Error adding product to cart:", error);
		}
	};
export const getCartItems = () => async (dispatch) => {
	try {
		const response = await axios.get(`${API_URL}/cart`);
		const { success, cart } = response.data;

		if (success) {
			// Dispatch the GET_CART_ITEMS action with the retrieved cart items
			dispatch({
				type: GET_CART_ITEMS,
				payload: cart,
			});
		}
	} catch (error) {
		console.error("Error fetching cart items:", error);
	}
};

export const changeQuantityCart = (itemId, newQuantity) => async (dispatch) => {
	try {
		// Make a PATCH request to update quantity
		const response = await axios.patch(`${API_URL}/cart/${itemId}`, {
			quantity: newQuantity,
		});
		if (response.data.success) {
			// Dispatch the CHANGE_QUANTITY_CART action to update the cart
			dispatch({
				type: CHANGE_QUANTITY_CART,
				payload: response.data.cartItem, // Send the updated cart item
			});

			// Optionally, you can refresh the cart items after the change
			dispatch(getCartItems());
		}
	} catch (error) {
		console.error("Error changing quantity in cart:", error);
	}
};

/**
 * Action to remove items from the cart.
 *
 * @function removeItemsFromCart
 * @async
 * @param {string} id - The ID of the item to remove from the cart.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while removing items from the cart.
 */

// REMOVE FROM CART
export const removeItemFromCart = (productId) => async (dispatch) => {
	try {
		// Send a DELETE request to remove the item from the cart
		const response = await axios.delete(`${API_URL}/cart/${productId}`);

		if (response.status === 204) {
			// Dispatch the REMOVE_ITEM_FROM_CART action
			dispatch({
				type: REMOVE_CART_ITEM,
				payload: productId, // Send the ID of the removed item as payload
			});
		}
	} catch (error) {
		console.error("Error removing item from cart:", error);
	}
};
