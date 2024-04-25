import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "./api";
import Modal from "./AnimalModal";

const Users = () => {
	// const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const obj = ["animals"];

	const handleOrderItemClick = (orderItems) => {
		setSelectedItem(orderItems);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "role",
			headerName: "Role",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "animals",
			headerName: "Animals",
			width: 200,
			renderCell: (params) => (
				<div style={{ cursor: "pointer", textDecoration: "underline" }}>
					View
				</div>
			),
			tooltipTitle: (params) => params.value,
		},
		{
			field: "_id",
			headerName: "ID",
			width: 250,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			width: 250,
			renderCell: (params) => (
				<div>{new Date(params.value).toLocaleString()}</div>
			),
			tooltipTitle: (params) => params.value,
		},
	];
	const convertToCSV = (data) => {
		const header = Object.keys(data[0]).map((key) => key);
		const csvRows = data.map((row) => {
			const rowData = header.map((fieldName) => {
				const value = row[fieldName];
				return typeof value === "object" ? JSON.stringify(value) : value;
			});
			return rowData.join(",");
		});

		return [header.join(","), ...csvRows].join("\n");
	};

	// Function to handle CSV export
	const handleExportCSV = () => {
		const csvData = convertToCSV(rows);
		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
		saveAs(blob, "users.csv"); // Download the CSV file with a specified filename
	};

	useEffect(async () => {
		const data = await getUsers();
		// console.log(data.data.data);
		setRows(data.data.data);
	}, []);

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
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 10, 50, 100]}
				getRowId={(row) => row._id}
				getCellValue={(params, field) => {
					return params.row[field];
				}}
				onCellClick={async (params) => {
					if (obj.includes(params.field)) {
						handleOrderItemClick(params.row[params.field]);
					}
				}}
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

export default Users;
