import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
	Grid,
	TextField,
	Button,
	Typography,
	Box,
	Autocomplete,
} from "@mui/material";
import Loader from "../layout/Loader/Loader";

const initialFormState = {
	name: "",
	varities: "",
	color: [],
	available_size: [],
	othervarients: [],
	brand: "",
	categories: {
		categoryids: [],
		subcategoryids: [],
	},
	specifications: "",
	model_number: "",
	productTitle: "",
	description: "",
	specific_features: [],
	material_used: "",
	dimenssions: [],
	weight_of_the_commodity: [],
	value: [],
	constraints: "",
	caution: [],
	shelflife: "",
	guarantee_and_warranty: "",
	mode_of_administration: "",
	conditions: "",
	stage_of_animal_used: "",
	dosage_recommended: [],
	active_ingredients: "",
	certification: "",
	faqs: [
		//   {
		//     question: "",
		//     answer: "",
		//   },
	],
	avg_rating: "",
	total_no_of_reviews: "",
	reviews: [
		// {
		//   Title: "",
		//   Review: "",
		//   Rating: "",
		//   name: "",
		//   designation: "",
		//   country: "",
		//   date: "",
		// },
	],
	images: [],
	onHomepage: "",
};
import { getProduct, updateProduct, createProduct } from "./api";

function CreateProduct({ id, categories, subcategories }) {
	const [formData, setFormData] = useState(initialFormState);
	const [loading, setLoading] = useState(true);
	const [faq, setFaq] = useState({
		question: "",
		answer: "",
	});
	const [review, setReview] = useState({
		Title: "",
		Review: "",
		Rating: "",
		name: "",
		designation: "",
		country: "",
		date: "",
	});
	const [snackbar, setSnackbar] = React.useState(null);

	const handleCloseSnackbar = () => setSnackbar(null);

	useEffect(async () => {
		if (id) {
			const res = await getProduct(id);
			// console.log(res);
			setFormData(res.product);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleFAQChange = (event, index, name) => {
		const { value } = event.target;
		const faqs = [...formData.faqs];

		if (name === "answer" && value === "" && faqs[index].question === "") {
			faqs.splice(index, 1);
			setFormData({
				...formData,
				faqs,
			});
			return;
		}

		if (name === "question" && value === "" && faqs[index].answer === "") {
			faqs.splice(index, 1);
			setFormData({
				...formData,
				faqs,
			});
			return;
		}
		if (!faqs[index]) faqs[index] = {};
		faqs[index][name] = value;
		setFormData({
			...formData,
			faqs,
		});
	};
	const handelReviewChange = (event, index, name) => {
		const { value } = event.target;
		const reviews = [...formData.reviews];
		reviews[index][name] = value;
		//now check all the fields are filled or not, if not then remove that review
		if (
			reviews[index].Title === "" &&
			reviews[index].Review === "" &&
			reviews[index].Rating === "" &&
			reviews[index].name === "" &&
			reviews[index].designation === "" &&
			reviews[index].country === "" &&
			reviews[index].date === ""
		) {
			reviews.splice(index, 1);
			setFormData({
				...formData,
				reviews,
			});
			return;
		}
		setFormData({
			...formData,
			reviews,
		});
	};
	const handleOnHomepageChange = (event, newValue) => {
		// console.log(newValue);
		setFormData({
			...formData,
			onHomepage: newValue,
		});
	};
	const handleArrayChange = (event, newValue, name) => {
		setFormData({
			...formData,
			[name]: newValue, // newValue is an array of selected colors
		});
	};
	const handleCategoryChange = (event, newValue) => {
		// console.log(newValue);
		setFormData({
			...formData,
			categories: {
				...formData.categories,
				categoryids: newValue,
			},
		});
	};
	const handleSubCategoryChange = (event, newValue) => {
		// console.log(newValue);
		setFormData({
			...formData,
			categories: {
				...formData.categories,
				subcategoryids: newValue,
			},
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (formData.name === "") {
			setSnackbar({
				severity: "error",
				children: "Please Enter Product Name",
			});
			return;
		}
		if (formData.categories.categoryids.length === 0) {
			setSnackbar({
				severity: "error",
				children: "Please Select Category",
			});
			return;
		}
		if (formData.model_number === "") {
			setSnackbar({
				severity: "error",
				children: "Please Enter Model Number",
			});
			return;
		}
		if (formData.productTitle === "") {
			setSnackbar({
				severity: "error",
				children: "Please Enter Product Title",
			});
			return;
		}
		if (formData.description === "") {
			setSnackbar({
				severity: "error",
				children: "Please Enter Product Description",
			});
			return;
		}
		try {
			if (id) {
				// update product
				const res = await updateProduct(id, formData);
				// console.log(res);
			} else {
				// create product
				const res = await createProduct(formData);
				// console.log(res);
			}
		} catch (err) {
			setSnackbar({
				severity: "error",
				children: err.response.data.message,
			});
			return;
		}
		setSnackbar({
			severity: "success",
			children: `Product ${id ? "Updated" : "Created"} Successfully`,
		});
		// setTimeout(() => {
		//   window.location.reload();
		// }, 2000);

		// console.log(formData);
		// setFormData(initialFormState);
	};
	const handleAddFAQ = (event) => {
		event.preventDefault();
		// console.log(faq);
		setFormData({
			...formData,
			faqs: [...formData.faqs, faq],
		});
		setFaq({
			question: "",
			answer: "",
		});
	};
	const handleAddReview = (event) => {
		event.preventDefault();
		// console.log(review);
		setFormData({
			...formData,
			reviews: [...formData.reviews, review],
		});
		setReview({
			Title: "",
			Review: "",
			Rating: "",
			name: "",
			designation: "",
			country: "",
			date: "",
		});
	};

	if (loading) return <Loader />;

	return (
		<>
			<Grid container spacing={2}>
				<div className="flex justify-between items-center w-full mt-7 ml-4">
					<h2 className="text-2xl font-semibold">Add Product</h2>
				</div>
				<Grid item xs={12}>
					<button
						onClick={handleSubmit}
						className="border-2 border-teal-600 py-2 px-3 rounded-lg text-teal-700 hover:bg-teal-600 hover:text-white transition-all duration-200"
					>
						{id ? "Update Product" : "Create Product"}
					</button>
					<form className="space-y-3" id="myForm">
						{/* Product Name */}
						<TextField
							fullWidth
							label="Name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
						/>
						{/* onHomePage */}
						<Autocomplete
							clearOnBlur
							options={["none", "recommended", "featured"]} // Use the colors from formData as options
							value={formData.onHomepage}
							onChange={handleOnHomepageChange}
							renderInput={(params) => (
								<TextField
									{...params}
									label="onHomePage"
									placeholder="Select Homepage"
								/>
							)}
						/>
						{/* varities */}
						<TextField
							fullWidth
							label="varities (seprate by space)"
							name="varities"
							value={formData.varities}
							onChange={handleInputChange}
						/>
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.color} // Use the colors from formData as options
							value={formData.color}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "color")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Available Colors"
									placeholder="Enter colors"
								/>
							)}
						/>
						{/* Available Size */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.available_size} // Use the colors from formData as options
							value={formData.available_size}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "available_size")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Available Sizes"
									placeholder="Enter Sizes"
								/>
							)}
						/>
						{/* Other Variants */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.othervarients} // Use the colors from formData as options
							value={formData.othervarients}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "othervarients")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Other Varaints"
									placeholder="Enter Varaints"
								/>
							)}
						/>
						{/* Brand */}
						<TextField
							fullWidth
							label="Brand"
							name="brand"
							value={formData.brand}
							onChange={handleInputChange}
						/>
						{/* Categories */}
						<Autocomplete
							multiple
							clearOnBlur
							options={categories.map((x) => x._id)} // Use the colors from formData as options
							getOptionLabel={(option) => {
								// console.log(option);
								return categories.find((x) => x._id === option)
									? categories.find((x) => x._id === option).categoryName
									: "";
							}}
							value={formData.categories.categoryids}
							// getValue={(option) => option._id}
							onChange={handleCategoryChange}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Categories"
									placeholder="Select Category"
								/>
							)}
						/>
						<Autocomplete
							multiple
							clearOnBlur
							options={subcategories.map((x) => x._id)} // Use the colors from formData as options
							// getOptionLabel={(option) => option.subCategoryName}
							getOptionLabel={(option) => {
								return subcategories.find((x) => x._id === option)
									? subcategories.find((x) => x._id === option).subCategoryName
									: "notFoundError";
							}}
							value={formData.categories.subcategoryids}
							onChange={handleSubCategoryChange}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Subcategory"
									placeholder="Select Subcategory"
								/>
							)}
						/>
						{/* Specifications */}
						<TextField
							fullWidth
							label="Specifications"
							name="specifications"
							value={formData.specifications}
							onChange={handleInputChange}
							multiline
						/>
						{/* Model Number */}
						<TextField
							fullWidth
							label="Model Number (Unique)"
							name="model_number"
							value={formData.model_number}
							onChange={handleInputChange}
						/>
						{/* Product Title */}
						<TextField
							fullWidth
							label="Product Title"
							name="productTitle"
							value={formData.productTitle}
							onChange={handleInputChange}
						/>
						{/* Description */}
						<TextField
							fullWidth
							label="Description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							multiline
						/>
						{/* Specific Features */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.specific_features} // Use the colors from formData as options
							value={formData.specific_features}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "specific_features")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Specific Features"
									placeholder="Enter Specific Features"
								/>
							)}
						/>
						{/* Material Used */}
						<TextField
							fullWidth
							label="Material Used"
							name="material_used"
							value={formData.material_used}
							onChange={handleInputChange}
						/>
						{/* Dimensions */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.dimenssions} // Use the colors from formData as options
							value={formData.dimenssions}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "dimenssions")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Dimensions"
									placeholder="Enter Dimensions"
								/>
							)}
						/>
						{/* Weight of the Commodity */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.weight_of_the_commodity} // Use the colors from formData as options
							value={formData.weight_of_the_commodity}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "weight_of_the_commodity")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Weight of the Commodity"
									placeholder="Enter Weight of the Commodity"
								/>
							)}
						/>
						{/* Value */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.value} // Use the colors from formData as options
							value={formData.value}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "value")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Value"
									placeholder="Enter Value"
								/>
							)}
						/>
						{/* Constraints */}
						<TextField
							fullWidth
							label="Constraints"
							name="constraints"
							value={formData.constraints}
							onChange={handleInputChange}
							multiline
						/>
						{/* Caution */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.caution} // Use the colors from formData as options
							value={formData.caution}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "caution")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Caution"
									placeholder="Enter Caution"
								/>
							)}
						/>
						{/* Shelf Life */}
						<TextField
							fullWidth
							label="Shelf Life"
							name="shelflife"
							value={formData.shelflife}
							onChange={handleInputChange}
						/>
						{/* Guarantee and Warranty */}
						<TextField
							fullWidth
							label="Guarantee and Warranty"
							name="guarantee_and_warranty"
							value={formData.guarantee_and_warranty}
							onChange={handleInputChange}
							multiline
						/>
						{/* Mode of Administration */}
						<TextField
							fullWidth
							label="Mode of Administration"
							name="mode_of_administration"
							value={formData.mode_of_administration}
							onChange={handleInputChange}
						/>
						{/* Conditions */}
						<TextField
							fullWidth
							label="Conditions"
							name="conditions"
							value={formData.conditions}
							onChange={handleInputChange}
							multiline
						/>
						{/* Stage of Animal Used */}
						<TextField
							fullWidth
							label="Stage of Animal Used"
							name="stage_of_animal_used"
							value={formData.stage_of_animal_used}
							onChange={handleInputChange}
						/>
						{/* Dosage Recommended */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.dosage_recommended} // Use the colors from formData as options
							value={formData.dosage_recommended}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "dosage_recommended")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Dosage Recommended"
									placeholder="Enter Dosage Recommended"
								/>
							)}
						/>
						{/* Active Ingredients */}
						<TextField
							fullWidth
							label="Active Ingredients"
							name="active_ingredients"
							value={formData.active_ingredients}
							onChange={handleInputChange}
						/>
						{/* Certification */}
						<TextField
							fullWidth
							label="Certification"
							name="certification"
							value={formData.certification}
							onChange={handleInputChange}
						/>
						{/* FAQs */}
						{formData.faqs.map((faq, index) => (
							<Box
								key={index}
								display="flex"
								flexDirection="column"
								marginBottom={2}
								className="space-y-4"
							>
								<TextField
									label={`FAQ ${index + 1} - Question`}
									name={`faqs[${index}].question`}
									value={faq.question}
									onChange={(e) => handleFAQChange(e, index, "question")}
								/>
								<TextField
									label={`FAQ ${index + 1} - Answer`}
									name={`faqs[${index}].answer`}
									value={faq.answer}
									onChange={(e) => handleFAQChange(e, index, "answer")}
									multiline
								/>
							</Box>
						))}
						{/* //option to add new Review */}
						<Box
							display="flex"
							flexDirection="column"
							className="space-y-2"
							marginBottom={2}
						>
							<TextField
								label={`Add New FAQ Question`}
								value={faq.question}
								onChange={(e) => setFaq({ ...faq, question: e.target.value })}
							/>
							<TextField
								label={`Add New FAQ Answer`}
								value={faq.answer}
								onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
								multiline
							/>
							<Button
								variant="contained"
								color="primary"
								onClick={handleAddFAQ}
								style={{
									minWwidth: "0px",
									minHeight: "0px",
									width: "200px",
									height: "40px",
									margin: "5px 0",
									fontSize: "14px",
									color: "white",
									backgroundColor: "#047857",
								}}
								disabled={faq.question === "" || faq.answer === ""}
							>
								Add FAQ
							</Button>
						</Box>
						{/* Average Rating */}
						<TextField
							fullWidth
							type="number"
							label="Average Rating"
							name="avg_rating"
							value={formData.avg_rating}
							onChange={handleInputChange}
							inputProps={{
								min: 0,
								max: 5,
								step: 0.1,
							}}
						/>
						{/* Total Number of Reviews */}
						<TextField
							fullWidth
							type="number"
							label="Total Number of Reviews"
							name="total_no_of_reviews"
							value={formData.total_no_of_reviews}
							onChange={handleInputChange}
							inputProps={{
								min: 0,
								step: 1,
							}}
						/>
						{/* Reviews */}
						{formData.reviews.map((review, index) => (
							<Box
								key={index}
								display="flex"
								flexDirection="column"
								marginBottom={2}
								className="space-y-3"
							>
								<TextField
									label={`Review ${index + 1} - Title`}
									name={`reviews[${index}].Title`}
									value={review.Title}
									onChange={(e) => handelReviewChange(e, index, "Title")}
								/>
								<TextField
									label={`Review ${index + 1} - Review`}
									name={`reviews[${index}].Review`}
									value={review.Review}
									onChange={(e) => handelReviewChange(e, index, "Review")}
									multiline
								/>
								<TextField
									label={`Review ${index + 1} - Rating`}
									name={`reviews[${index}].Rating`}
									value={review.Rating}
									onChange={(e) => handelReviewChange(e, index, "Rating")}
								/>
								<TextField
									label={`Review ${index + 1} - Name`}
									name={`reviews[${index}].name`}
									value={review.name}
									onChange={(e) => handelReviewChange(e, index, "name")}
								/>
								<TextField
									label={`Review ${index + 1} - Designation`}
									name={`reviews[${index}].designation`}
									value={review.designation}
									onChange={(e) => handelReviewChange(e, index, "designation")}
								/>
								<TextField
									label={`Review ${index + 1} - Country`}
									name={`reviews[${index}].country`}
									value={review.country}
									onChange={(e) => handelReviewChange(e, index, "country")}
								/>
								<TextField
									label={`Review ${index + 1} - Date`}
									name={`reviews[${index}].date`}
									value={review.date}
									onChange={(e) => handelReviewChange(e, index, "date")}
								/>
							</Box>
						))}
						<Box
							display="flex"
							flexDirection="column"
							marginBottom={2}
							className="space-y-3"
						>
							<TextField
								label={`Add New Review Title`}
								value={review.Title}
								onChange={(e) =>
									setReview({ ...review, Title: e.target.value })
								}
							/>
							<TextField
								label={`Add New Review TReview`}
								value={review.Review}
								onChange={(e) =>
									setReview({ ...review, Review: e.target.value })
								}
								multiline
							/>
							<TextField
								label={`Add New Review TRating`}
								value={review.Rating}
								onChange={(e) =>
									setReview({ ...review, Rating: e.target.value })
								}
								type="number"
								inputProps={{
									min: 0,
									max: 5,
									step: 1,
								}}
							/>
							<TextField
								label={`Add New Review TName`}
								value={review.name}
								onChange={(e) => setReview({ ...review, name: e.target.value })}
							/>
							<TextField
								label={`Add New Review TDesignation`}
								value={review.designation}
								onChange={(e) =>
									setReview({ ...review, designation: e.target.value })
								}
							/>
							<TextField
								label={`Add New Review TCountry`}
								value={review.country}
								onChange={(e) =>
									setReview({ ...review, country: e.target.value })
								}
							/>
							<TextField
								label={`Add New Review TDate`}
								value={review.date}
								onChange={(e) => setReview({ ...review, date: e.target.value })}
							/>
							<Button
								variant="contained"
								color="primary"
								style={{
									minWwidth: "0px",
									minHeight: "0px",
									width: "200px",
									height: "40px",
									margin: "5px 0",
									fontSize: "14px",
									color: "white",
									backgroundColor: "#047857",
								}}
								onClick={handleAddReview}
								disabled={
									review.Title === "" ||
									review.Review === "" ||
									review.Rating === "" ||
									review.name === "" ||
									review.designation === "" ||
									review.country === "" ||
									review.date === ""
								}
							>
								Add Review
							</Button>
						</Box>
						{/* Images */}
						<Autocomplete
							multiple
							freeSolo
							clearOnBlur
							options={formData.images} // Use the colors from formData as options
							value={formData.images}
							getOptionLabel={(option) => (
								<img
									src={option}
									alt="Image"
									style={{ width: 50, height: 50 }}
								/>
							)}
							onChange={(event, newValue) =>
								handleArrayChange(event, newValue, "images")
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Images"
									placeholder="Enter Images"
								/>
							)}
						/>
					</form>
				</Grid>
			</Grid>

			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</>
	);
}

export default CreateProduct;
