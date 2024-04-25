/**
 * Action to fetch products based on various filters and search parameters.
 *
 * @function getProduct
 * @async
 * @param {number} pageNumber - The page number of the product results.
 * @param {string} keyword - The keyword to search for in product names.
 * @param {string} animal - The animal type filter for products.
 * @param {string} treatment - The treatment type filter for products.
 * @param {string} dailyEssential - The daily essential type filter for products.
 * @param {string} medicalCare - The medical care type filter for products.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while fetching the products.
 */

import { API_URL } from "../api";
import axios from "axios";
import {
	ALL_PRODUCT_REQUEST,
	ALL_PRODUCT_SUCCESS,
	ALL_PRODUCT_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	ADMIN_PRODUCT_REQUEST,
	ADMIN_PRODUCT_SUCCESS,
	ADMIN_PRODUCT_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	CLEAR_ERRORS,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_FAIL,
	CLEAR_PRODUCT_DETAILS,
} from "../constants/productConstants";

axios.defaults.withCredentials = true;

export const getProduct = (page, limit, filters) => async (dispatch) => {
	try {
		dispatch({ type: ALL_PRODUCT_REQUEST });

		let link = `${API_URL}/product`;

		const { data } = await axios.get(link, {
			params: {
				page,
				limit,
				filters,
			},
		});
		// console.log(data);
		dispatch({
			type: ALL_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};
// export const getProductNames = () => async (dispatch) => {
// 	try {
// 			dispatch({ type: ALL_PRODUCT_NAME_REQUEST });

// 			let link = `${API_URL}/product/names`;

// 			const { data } = await axios.get(link);
// 			console.log(data);
// 			dispatch({
// 					type: ALL_PRODUCT_NAME_SUCCESS,
// 					payload: data,
// 			});
// 	} catch (error) {
// 			dispatch({
// 					type: ALL_PRODUCT_NAME_FAIL,
// 					payload: error.response.data.message,
// 			});
// 	}
// };

/**
 * Action to fetch product details.
 *
 * @function getProductDetails
 * @async
 * @param {string} id - The ID of the product to fetch details for.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while fetching the product details.
 */

//get product details
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`${API_URL}/product/one/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearProductDetails = () => {
	return {
		type: CLEAR_PRODUCT_DETAILS,
	};
};

/**
 * Action to submit a new review for a product.
 *
 * @function newReview
 * @async
 * @param {Object} reviewData - The data for the new review.
 * @param {string} reviewData.productId - The ID of the product being reviewed.
 * @param {string} reviewData.rating - The rating given in the review.
 * @param {string} reviewData.comment - The comment provided in the review.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while submitting the new review.
 */

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.put(`/api/v1/review`, reviewData, config);

		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

//-------------------------------------------------
/**
 * Action to fetch admin products.
 *
 * @function getAdminProduct
 * @async
 * @returns {Promise} - A promise thpat resolves when the action is completed.
 *
 * @throws {Error} If there is an error while fetching the admin products.
 */

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_PRODUCT_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/products`);

		dispatch({
			type: ADMIN_PRODUCT_SUCCESS,
			payload: data.products,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

/**
 * Action to create a new product as an admin.
 *
 * @function createProduct
 * @async
 * @param {Object} productData - The data for the new product.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while creating the new product.
 */

// Create Product Admin
export const createProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PRODUCT_REQUEST });

		const config = {
			headers: { "Content-Type": "multipart/form-data" },
		};

		const { data } = await axios.post(`/product/create`, productData, config);

		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

/**
 * Action to delete a product as an admin.
 *
 * @function deleteProduct
 * @async
 * @param {string} id - The ID of the product to be deleted.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while deleting the product.
 */

//Delete product
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({
			type: DELETE_PRODUCT_REQUEST,
		});

		const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

/**
 * Action to update a product as an admin.
 *
 * @function updateProduct
 * @async
 * @param {string} id - The ID of the product to be updated.
 * @param {Object} productData - The updated data for the product.
 * @returns {Promise} - A promise that resolves when the action is completed.
 *
 * @throws {Error} If there is an error while updating the product.
 */

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.put(
			`/api/v1/admin/product/${id}`,
			productData,
			config
		);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};
