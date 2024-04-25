import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
	MdEdit as EditIcon,
	MdDelete as DeleteIcon,
	MdAdd as AddIcon,
	MdSave as SaveIcon,
	MdCancel as CancelIcon,
} from "react-icons/md";
import {
	GridRowModes,
	DataGrid,
	GridToolbarContainer,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
	getAllTestimonials,
	createTestimonial,
	updateTestimonial,
	deleteTestimonial,
} from "./api";
import { v4 as uuidv4 } from "uuid";

function EditToolbar(props) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const _id = uuidv4();
		setRows((oldRows) => [
			...oldRows,
			{ _id, name: "", designation: "", Rating: "", image: "", isNew: true },
		]);
		setRowModesModel((oldModel) => {
			return {
				...oldModel,
				[_id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
			};
		});
	};

	return (
		<GridToolbarContainer>
			<Button
				color='primary'
				startIcon={<AddIcon />}
				onClick={handleClick}>
				Add Testimonials
			</Button>
		</GridToolbarContainer>
	);
}

const SubCategory = () => {
	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});

	const [snackbar, setSnackbar] = React.useState(null);

	const handleCloseSnackbar = () => setSnackbar(null);

	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (_id) => () => {
		setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (_id) => () => {
		setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (row) => async () => {
		// console.log("Delete");
		const { _id } = row;
		const confirm = window.confirm("Are you sure you want to delete this?");
		if (!confirm) {
			return;
		}
		const res = await deleteTestimonial(_id);
		// console.log(res);
		if (res.status === 204) {
			setRows(rows.filter((row) => row._id !== _id));
			setSnackbar({ children: "Article deleted", severity: "success" });
		} else {
			setSnackbar({ children: "Error Deleting Article", severity: "error" });
		}
	};
	const handleCancelClick = (_id) => () => {
		setRowModesModel({
			...rowModesModel,
			[_id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row._id === _id);
		if (editedRow.isNew) {
			setRows(rows.filter((row) => row._id !== _id));
		}
	};

	const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
		if (newRow.isNew) {
			const newArticle = newRow;
			delete newArticle._id;
			const response = await createTestimonial(newArticle);
			setSnackbar({ children: response.message, severity: "success" });
			setRows((oldRows) => {
				const newRows = [...oldRows];
				const index = newRows.findIndex((row) => row._id === oldRow._id);
				newRows[index] = response.data.data;
				return newRows;
			});
			return response.data.data;
		}
		const response = await updateTestimonial(oldRow._id, newRow);
		setSnackbar({
			children: "Testimonals Updated Successfully",
			severity: "success",
		});
		setRows((oldRows) => {
			const newRows = [...oldRows];
			const index = newRows.findIndex((row) => row._id === oldRow._id);
			newRows[index] = response.data.data;
			return newRows;
		});
		return response.data.data;
	}, []);

	const handleProcessRowUpdateError = React.useCallback((error) => {
		// console.log(error);
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns = [
		{
			field: "image",
			headerName: "Image",
			width: 400,
			editable: true,
			renderCell: (params) => (
				<>
					<img
						src={params.row.image}
						alt={params.row.title}
						style={{ width: 100 }}
					/>
					{params.row.img}
				</>
			),
		},
		{ field: "name", headerName: "Title", width: 300, editable: true },
		{ field: "Rating", headerName: "Rating", width: 250, editable: true },
		{
			field: "designation",
			headerName: "Designation",
			width: 250,
			editable: true,
		},
		{ field: "review", headerName: "Review", width: 400, editable: true },
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: (params) => {
				const { _id } = params.row;
				const isInEditMode = rowModesModel[_id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label='Save'
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(_id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label='Cancel'
							className='textPrimary'
							onClick={handleCancelClick(_id)}
							color='inherit'
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label='Edit'
						className='textPrimary'
						onClick={handleEditClick(_id)}
						color='inherit'
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label='Delete'
						onClick={handleDeleteClick(params.row)}
						color='inherit'
					/>,
				];
			},
		},
		{ field: "_id", headerName: "ID", width: 250, editable: false },
	];

	React.useEffect(async () => {
		const res = await getAllTestimonials();
		// console.log(res.data.data);
		setRows(res.data.data);
		return () => {
			setRows([]);
		};
	}, []);

	return (
		<div>
			<Box
				sx={{
					width: "100%",
					"& .actions": {
						color: "text.secondary",
					},
					"& .textPrimary": {
						color: "text.primary",
					},
				}}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					pageSizeOptions={[5, 10, 50, 100]}
					getCellValue={(params, field) => {
						return params.row[field];
					}}
					checkboxSelection={false}
					processRowUpdate={processRowUpdate}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					getRowId={(row) => row._id}
					slots={{
						toolbar: EditToolbar,
					}}
					slotProps={{
						toolbar: { setRows, setRowModesModel },
					}}
					editMode='row'
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
				/>
			</Box>

			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}>
					<Alert
						{...snackbar}
						onClose={handleCloseSnackbar}
					/>
				</Snackbar>
			)}
		</div>
	);
};
export default SubCategory;
