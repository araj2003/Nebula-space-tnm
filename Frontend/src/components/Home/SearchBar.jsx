import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { API_URL } from "../../api";
import { IoSearch } from "react-icons/io5";
const validationSchema = yup.object({
	search: yup.string("Enter your search query"),
});

const SearchBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [selectedProductName, setSelectedProductName] = useState(null);
	const [products, setProducts] = useState([]);
	const [autocompleteKey, setAutocompleteKey] = useState(0); // Key for forcing remount

	const onSubmit = async (values, actions) => {
		try {
			await axios.post(`${API_URL}/searchquery`, {
				query: selectedProductName,
			});

			if (selectedProductId) {
				navigate(`/product/${selectedProductId}`);
				setSelectedProductId(null);
				setSelectedProductName("");
			}
		} catch (error) {
			console.error(error);
		}
		actions.resetForm();
	};

	const { handleSubmit, isSubmitting, values } = useFormik({
		initialValues: {
			search: "",
		},
		validationSchema: validationSchema,
		onSubmit,
	});

	const fetchProductNames = async () => {
		try {
			const response = await axios.get(`${API_URL}/product/names`);

			setProducts(response.data.products);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProductNames();
	}, [location.pathname]); // Update when the pathname changes

	const handleItemClick = (event, newValue) => {
		setSelectedProductName(newValue.name);
		if (newValue) {
			const productId = newValue.id;
			setSelectedProductId(productId);
			values.search = "";
		}
	};

	useEffect(() => {
		// Update the key only when navigating to the home page
		if (location.pathname === "/") {
			setAutocompleteKey((prevKey) => prevKey + 1);
		}
	}, [location.pathname]);

	return (
		<form
			onSubmit={handleSubmit}
			className="mx-2 md:mx-5 lg:mx-0 lg:w-1/2 flex"
			autoComplete="off"
		>
			<div className="flex items-center justify-between md:gap-1 w-full ">
				<Autocomplete
					key={autocompleteKey}
					clearOnBlur
					id="combo-box-demo"
					size="small"
					options={products}
					getOptionLabel={(option) =>
						option.name
							.toLowerCase()
							.split(" ")
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(" ")
					}
					onChange={handleItemClick}
					sx={{ width: "93%" }}
					noOptionsText="Can't find your product? Reach out on WhatsApp for personalized assistance!"
					renderInput={(params) => (
						<TextField {...params} label="Search for Products.." />
					)}
				/>
				<button
					type="submit"
					className="flex bg-teal-600 items-center rounded-[20px] ml-1  aspect-square text-xl  gap-2 py-1  justify-center font-semibold h-10 text-white "
				>
					<div className="text-white  font-semibold uppercase flex justify-center items-center">
						<IoSearch />
					</div>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
