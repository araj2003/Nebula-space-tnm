import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getReviews, deleteReview, acceptReview } from "./api";
import Modal from "./Modal";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EditToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const Reviews = () => {
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleOrderItemClick = (orderItems) => {
		setSelectedItem(orderItems);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const removeReview = (id) => {
		setRows((p) => p.filter((row) => row._id !== id));
	};
	const deleteButton = async (id) => {
		try {
			//confirm before deleting
			if (!window.confirm("Are you sure you want to delete this review?"))
				return;
			const res = await deleteReview(id);
			// console.log(res);
			toast.success("Review Deleted Successfully");
			removeReview(id);
		} catch (err) {
			// console.log(err);
			toast.error(err.response.data.message);
		}
	};
	const acceptButton = async (id) => {
		try {
			if (!window.confirm("Are you sure you want to accept this review?"))
				return;
			const res = await acceptReview(id);
			// console.log(res);
			if (res.success === false) return toast.error(res.message);
			toast.success("Review Accepted Successfully");
			removeReview(id);
		} catch (err) {
			// console.log(err);
			toast.error(err.response.data.message);
		}
	};

	useEffect(async () => {
		const data = await getReviews();
		// console.log(data.data.data);
		setColumns(
			generatecolumnsfromobjectkeys(
				data.data.data[0],
				deleteButton,
				acceptButton
			),
			handleOrderItemClick
		);
		setRows(data.data.data);
	}, []);

	if (rows.length === 0) return <div>No Review to show...</div>;

	return (
		<div>
			<DataGrid
				rows={rows}
				sx={{
					bgcolor: 'white', // Set the background color here
					
				}}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				slots={{
					toolbar: EditToolbar,
				}}
				pageSizeOptions={[5, 10, 50, 100]}
				getRowId={(row) => row._id}
				checkboxSelection={false}
			/>
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					orderItems={selectedItem}
				/>
			)}
		</div>
	);
};

const generatecolumnsfromobjectkeys = (object, deleteButton, acceptButton) => {
	const dontshow = ["__v", "createdAt", "_id"];
	const columns = [];
	for (const key in object) {
		if (dontshow.includes(key)) continue;
		if (typeof object[key] === "object") {
			columns.push({
				field: key,
				headerName: key.toLocaleUpperCase(),
				width: 100,
				renderCell: (params) => (
					<div style={{ cursor: "pointer", textDecoration: "underline" }}>
						View
					</div>
				),
				tooltipTitle: (params) => params.value,
			});
			continue;
		}
		columns.push({
			field: key,
			headerName: key === "_id" ? "ID" : key.toLocaleUpperCase(),
			width: 250,
			renderCell:
				key === "product"
					? (params) => (
							<Link
								to={`/product/${params.row.product}`}
								className='text-base bg-teal-600 w-28 h-10 text-white grid place-content-center font-medium rounded-[5px]'>
								Click to view
							</Link>
					  )
					: null,

			tooltipTitle: (params) => params.value,
		});
	}
	if (columns.length === 0) return columns;
	columns.push(
		{
			field: "accept",
			headerName: "Accept",
			width: 100,
			renderCell: (params) => (
				<button
					style={{
						backgroundColor: "#4caf50",
						color: "white",
						padding: "5px 10px",
						borderRadius: "5px",
					}}
					onClick={() => acceptButton(params.row._id)}
					className='accept-btn'>
					Accept
				</button>
			),
		},
		{
			field: "delete",
			headerName: "Delete",
			width: 100,
			renderCell: (params) => (
				<button
					style={{
						backgroundColor: "#f44336",
						color: "white",
						padding: "5px 10px",
						borderRadius: "5px",
					}}
					onClick={() => deleteButton(params.row._id)}
					className='delete-btn'>
					Delete
				</button>
			),
		}
	);
	return columns;
};
export default Reviews;
