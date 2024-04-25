import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { getOrders, updateOrder } from "./api";
import Modal from "./Modal";
import ShowOrders from "./ShowOrders";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { saveAs } from "file-saver";

const Orders = () => {
	const [rows, setRows] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const [isShowOrdersOpen, setIsShowOrdersOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const [snackbar, setSnackbar] = React.useState(null);

	const obj = ["shippingInfo", "billingInfo", "orderItems", "user"];

	const handleCloseSnackbar = () => setSnackbar(null);

	const handleOrderItemClick = (orderItems) => {
		setSelectedItem(orderItems);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
		// Make the HTTP request to save in the backend
		if (newRow.orderStatus === oldRow.orderStatus) {
			return oldRow;
		}

		const response = await updateOrder(oldRow._id, newRow.orderStatus);
		setSnackbar({ children: "Order status saved", severity: "success" });
		return response.order;
	}, []);

	const handleProcessRowUpdateError = React.useCallback((error) => {
		// console.log(error);
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const columns = [
		{
			field: "shippingInfo",
			headerName: "Shipping Info",
			width: 200,
			renderCell: (params) => (
				<div style={{ cursor: "pointer", textDecoration: "underline" }}>
					View
				</div>
			),
		},
		{
			field: "billingInfo",
			headerName: "Billing Info",
			width: 200,
			renderCell: (params) => (
				<div style={{ cursor: "pointer", textDecoration: "underline" }}>
					View
				</div>
			),
		},
		{
			field: "orderItems",
			headerName: "Order Items",
			width: 200,
			renderCell: (params) => (
				<div style={{ cursor: "pointer", textDecoration: "underline" }}>
					View
				</div>
			),
		},
		{
			field: "user",
			headerName: "User",
			width: 200,
			renderCell: (params) => (
				<div style={{ cursor: "pointer", textDecoration: "underline" }}>
					View
				</div>
			),
		},
		{
			field: "orderedAt",
			headerName: "Ordered At",
			renderCell: (params) => (
				<div>{new Date(params.value).toLocaleString()}</div>
			),
			width: 250,
		},
		{
			field: "orderStatus",
			headerName: "Order Status",
			width: 200,
			editable: true,
		},
		{ field: "_id", headerName: "ID", width: 250 },
		{
			field: "createdAt",
			headerName: "Created At",
			width: 250,
			renderCell: (params) => (
				<div>{new Date(params.value).toLocaleString()}</div>
			),
		},
	];

	useEffect(async () => {
		const data = await getOrders();
		// console.log(data.orders);
		setRows(data.orders);

		return () => {
			setRows([]);
		};
	}, []);
	// Function to convert data to CSV format
	const convertToCSV = (data) => {
		const header = Object.keys(data[0]).map((key) => key);
		const csv = [
			header.join(","),
			...data.map((row) =>
				header
					.map((fieldName) => {
						const value = row[fieldName];
						return JSON.stringify(value); // Ensure proper handling of JSON objects
					})
					.join(",")
			),
		].join("\n");
		return csv;
	};

	// Function to handle CSV export
	const handleExportCSV = () => {
		const csvData = convertToCSV(rows);
		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
		saveAs(blob, "orders.csv"); // Download the CSV file with a specified filename
	};

	return (
		<div>
			<button
				onClick={handleExportCSV}
				className="border-2 border-teal-600 text-teal-700 py-2 px-4 rounded-md mb-2 hover:bg-teal-600 hover:text-white transition-all duration-300"
			>
				Export CSV
			</button>
			<DataGrid
				rows={rows}
				columns={columns}
				sx={{
					bgcolor: 'white', // Set the background color here
					
				}}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[10, 5, 10, 50, 100]}
				getCellValue={(params, field) => {
					return params.row[field];
				}}
				onCellClick={async (params) => {
					if (obj.includes(params.field)) {
						if (params.field === "orderItems") {
							setSelectedOrder(params.row[params.field]);
							setIsShowOrdersOpen(true);
							return;
						}
						handleOrderItemClick(params.row[params.field]);
					}
				}}
				checkboxSelection={false}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				getRowId={(row) => row._id}
			/>

			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					orderItems={selectedItem}
				/>
			)}
			{isShowOrdersOpen && (
				<ShowOrders
					isOpen={isShowOrdersOpen}
					onClose={() => setIsShowOrdersOpen(false)}
					orderItems={selectedOrder}
				/>
			)}
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
		</div>
	);
};
export default Orders;
