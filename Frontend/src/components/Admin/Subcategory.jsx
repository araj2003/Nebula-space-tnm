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
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getSubcategories,
	getCategories,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
} from "./api";
import { v4 as uuidv4 } from "uuid";

function EditToolbar(props) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const _id = uuidv4();
		setRows((oldRows) => [
			...oldRows,
			{ _id, imageUrl: "", categoryName: "", subCategoryName: "", isNew: true },
		]);
		setRowModesModel((oldModel) => {
			return {
				...oldModel,
				[_id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
			};
		});
	};

	return (
		<GridToolbarContainer>
			<GridToolbarExport />
			<Button
				color='primary'
				startIcon={<AddIcon />}
				onClick={handleClick}>
				Add Subcategory
			</Button>
		</GridToolbarContainer>
	);
}

const SubCategory = () => {
	const [rows, setRows] = React.useState([]);
	const [rowModesModel, setRowModesModel] = React.useState({});
	const [allCategories, setAllCategories] = React.useState([]);

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
		const res = await deleteSubcategory(_id);
		if (res.success) {
			setRows(rows.filter((row) => row._id !== _id));
			setSnackbar({ children: "Subcategory deleted", severity: "success" });
		} else {
			setSnackbar({ children: res.data.message, severity: "error" });
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

	const processRowUpdate = React.useCallback(
		async (newRow, oldRow) => {
			if (newRow.isNew) {
				const response = await createSubcategory(newRow);
				// console.log(response.categoryT);
				setSnackbar({ children: "Subcategory created", severity: "success" });
				setRows((oldRows) => {
					const newRows = [...oldRows];
					const index = newRows.findIndex((row) => row._id === oldRow._id);
					newRows[index] = response.categoryT;
					return newRows;
				});
				response.categoryT.categoryName =
					response.categoryT.category.categoryName;
				return response.categoryT;
			}
			const response = await updateSubcategory(oldRow._id, newRow);
			// console.log(response.categoryT);
			setSnackbar({ children: "Subcategory updated", severity: "success" });
			setRows((oldRows) => {
				const newRows = [...oldRows];
				const index = newRows.findIndex((row) => row._id === oldRow._id);
				newRows[index] = response.categoryT;
				return newRows;
			});
			response.categoryT.categoryName =
				response.categoryT.category.categoryName;
			return response.categoryT;
		},
		[allCategories]
	);

	const handleProcessRowUpdateError = React.useCallback((error) => {
		console.log(error);
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns = [
    {
      field: "imageUrl",
      headerName: "Image",
      width: 400,
      editable: true,
      renderCell: (params) => (
        <>
          <img
            src={params.row.imageUrl}
            alt={params.row.name}
            style={{ width: 100 }}
          />
          {params.row.imageUrl}
        </>
      ),
    },
    {
      field: "subCategoryName",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 250,
      editable: true,
      type: "singleSelect",
      valueOptions: allCategories.map((category) => category.categoryName),
    },
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
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(_id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(_id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(_id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.row)}
            color="inherit"
          />,
        ];
      },
    },
    { field: "_id", headerName: "ID", width: 250, editable: false },
  ];

	React.useEffect(async () => {
		const data2 = await getCategories();
		setAllCategories(data2.categoryT);

		const data = await getSubcategories();
		data.subCategoryT.forEach((row) => {
			row.categoryName = row.category.categoryName;
		});
		setRows(data.subCategoryT);

		return () => {
			setAllCategories([]);
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
