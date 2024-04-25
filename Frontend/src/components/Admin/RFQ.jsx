import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getRfqs } from "./api";

function EditToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const RFQ = () => {
	const [rows, setRows] = useState([]);
	const [selection, setSelection] = useState("all");

	const selectedRows = rows.filter((row) => {
		if (selection === "all") {
			return true;
		}
		if (selection === "rfq") {
			return row.productDetails !== undefined;
		}
		if (selection === "message") {
			return row.message !== undefined;
		}
		if (selection === "catalogue") {
			return row.category !== undefined;
		}
	});

	const columns = [
		{
			field: "name",
			headerName: "Name",
			width: 200,
			tooltipTitle: (params) => params.value,
		},

		{
			field: "companyName",
			headerName: "Company Name",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "address",
			headerName: "Address",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "phone",
			headerName: "Phone",
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
			field: "country",
			headerName: "Country",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "productDetails",
			headerName: "RFQ Details",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "message",
			headerName: "Message",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "category",
			headerName: "Catalogue",
			width: 200,
			tooltipTitle: (params) => params.value,
		},
		{
			field: "createdAt",
			headerName: "Created At",
			width: 200,
			renderCell: (params) => (
				<div>{new Date(params.value).toLocaleString()}</div>
			),
			tooltipTitle: (params) => params.value,
		},
	];

	useEffect(async () => {
		const data = await getRfqs();
		// console.log(data);
		setRows(data.data.data);
	}, []);

	return (
		<div>
			<select
				name="category"
				id="category"
				onClick={(e) => {
					setSelection(e.target.value);
				}}
				class="appearance-none border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
			>
				<option value="all">All</option>
				<option value="rfq">Request for Quote (RFQ)</option>
				<option value="message">Leave a Message</option>
				<option value="catalogue">Request for Catalogue</option>
			</select>

			<DataGrid
				rows={selectedRows}
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
				slots={{
					toolbar: EditToolbar,
				}}
				checkboxSelection={false}
			/>
		</div>
	);
};

export default RFQ;
