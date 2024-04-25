import axios from "axios";
import { API_URL } from "../../api";

var baseURL = ``;

export const setURLRole = (role) => {
	baseURL = `${API_URL}/${role}`;
};

/*Orders */

export const getOrders = async (pageSize, pageNo) => {
	try {
		//send pageSize and pageNo as body
		const { data } = await axios.get(`${baseURL}/order`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateOrder = async (id, orderStatus) => {
	try {
		const { data } = await axios.patch(`${baseURL}/order/${id}`, {
			orderStatus,
		});
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteOrder = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/order/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Users */
export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/user`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateUser = async (id, role) => {
	try {
		const { data } = await axios.patch(`${baseURL}/user/${id}`, { role });
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteUser = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/user/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Subcategories */
export const getSubcategories = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/subcategory`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const createSubcategory = async (subcategory) => {
	try {
		const { data } = await axios.post(`${baseURL}/subcategory`, subcategory);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateSubcategory = async (id, subcategory) => {
	try {
		const { data } = await axios.patch(
			`${baseURL}/subcategory/${id}`,
			subcategory
		);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteSubcategory = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/subcategory/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Categories */
export const getCategories = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/category`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Products */
export const getProducts = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/product`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getProduct = async (id) => {
	try {
		const { data } = await axios.get(`${baseURL}/product/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const createProduct = async (product) => {
	try {
		const { data } = await axios.post(`${baseURL}/product`, product);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateProduct = async (id, product) => {
	try {
		const { data } = await axios.patch(`${baseURL}/product/${id}`, product);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteProduct = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/product/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Reviews */
export const getReviews = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/review`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteReview = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/review/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const acceptReview = async (id) => {
	try {
		const { data } = await axios.patch(`${baseURL}/review/accept/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*RFQs */
export const getRfqs = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/rfq`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateRfq = async (id, rfq) => {
	try {
		const { data } = await axios.patch(`${baseURL}/rfq/${id}`, rfq);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteRfq = async (id) => {
	try {
		const { data } = await axios.delete(`${baseURL}/rfq/${id}`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

/*Search */
export const search = async (query) => {
	try {
		const { data } = await axios.get(`${baseURL}/search`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//Article
export const getArticles = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/article`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const createArticle = async (article) => {
	try {
		const { data } = await axios.post(`${baseURL}/article`, article);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateArticle = async (id, article) => {
	try {
    console.log(article);
		const { data } = await axios.patch(`${baseURL}/article/${id}`, article);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteArticle = async (id) => {
	try {
		const res = await axios.delete(`${baseURL}/article/${id}`);
		return res;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getAllBanners = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/banner`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateBanner = async (banner) => {
	try {
		const { data } = await axios.patch(
			`${baseURL}/banner/${banner._id}`,
			banner
		);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const getAllTestimonials = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/testimonial`);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const createTestimonial = async (testimonial) => {
	try {
		const { data } = await axios.post(`${baseURL}/testimonial`, testimonial);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const updateTestimonial = async (id, testimonial) => {
	try {
		const { data } = await axios.patch(
			`${baseURL}/testimonial/${id}`,
			testimonial
		);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
export const deleteTestimonial = async (id) => {
	try {
		const res = await axios.delete(`${baseURL}/testimonial/${id}`);
		return res;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
