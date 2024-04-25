import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import { Pagination } from "@mui/material";
import Modal from "./ProductModal";
import {
	getProducts,
	getCategories,
	getSubcategories,
	deleteProduct,
} from "./api";
import { MdEdit, MdDelete } from "react-icons/md";

export default function FolderList() {
	const [category, setCategory] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
	const itemsPerPage = 20; // Number of items to display per page

	useEffect(() => {
		async function fetchData() {
			const data = await getProducts();
			setCategory(data.products);
		}
		const fetchCategories = async () => {
			const categories = await getCategories();
			const subcategories = await getSubcategories();
			setCategories(categories.categoryT);
			setSubcategories(subcategories.subCategoryT);
		};
		fetchCategories();
		fetchData();
	}, []);

	const handleDelete = async (params) => {
		//alert
		if (
			!window.confirm(
				"Are you sure you want to delete this product?This action cannot be undone."
			)
		) {
			return;
		}

		const data = await deleteProduct(params.row._id);
		// console.log(data);
		// console.log(category);
		if (data.sucess) {
			setCategory((prev) => prev.filter((row) => row._id !== params.row._id));
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Calculate the index of the first and last item to display on the current page
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	// Filter products based on search query
	const filteredProducts = category.filter((item) =>
		item.productTitle.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Update pagination count based on the filtered products
	const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

	const currentItems = filteredProducts.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1); // Reset to the first page when searching
	};

	return (
		<>
			{/* Add a search input field */}
			<input
				type="text"
				placeholder="Search products"
				value={searchQuery}
				onChange={handleSearchChange}
				className="border border-gray-400 rounded-md px-3 py-2 mt-4 mb-4"
			/>

			<List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
				{/* Add a "Add New Product" ListItem */}
				<ListItem
					onClick={() => {
						setSelectedProductId(null);
						setIsModalOpen(true);
					}}
					sx={{
						cursor: "pointer",
						borderRadius: "4px",
						border: "1px solid #ccc",
						backgroundColor: "#ffffff",
						boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						transition: "background-color 0.2s, box-shadow 0.2s",
						"&:hover": {
							backgroundColor: "#f0f2f5",
						},
					}}
				>
					<ListItemText
						primary="Add New Product"
						sx={{ textAlign: "center" }}
					/>
				</ListItem>

				{/* Map over currentItems (filtered products) */}
				{currentItems.map((item) => (
					<ListItem key={item._id}>
						<ListItemAvatar>
							<Avatar alt={item.productTitle} src={item.images[0]} />
						</ListItemAvatar>
						<ListItemText primary={item.productTitle} />
						<ListItemSecondaryAction>
							<IconButton
								aria-label="edit-subcategory"
								onClick={() => {
									setSelectedProductId(item._id);
									setIsModalOpen(true);
								}}
							>
								<MdEdit />
							</IconButton>
							<IconButton
								aria-label="delete-subcategory"
								onClick={() => handleDelete({ row: item })}
							>
								<MdDelete />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>

			{/* Pagination component */}
			<Pagination
				count={pageCount} // Use pageCount instead of Math.ceil(category.length / itemsPerPage)
				page={currentPage}
				onChange={handlePageChange}
				sx={{ marginTop: "16px", justifyContent: "center" }}
			/>

			{/* Modal component */}
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					id={selectedProductId}
					categories={categories}
					subcategories={subcategories}
				/>
			)}
		</>
	);
}
