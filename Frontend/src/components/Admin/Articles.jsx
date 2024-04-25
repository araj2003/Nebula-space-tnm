import React, { useState } from "react";
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
	getArticles,
	createArticle,
	updateArticle,
	deleteArticle,
} from "./api";
import { v4 as uuidv4 } from "uuid";
import Modal from "./ArticleModal";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const _id = uuidv4();
    setRows((oldRows) => [
      ...oldRows,
      { _id, img: "", title: "", description: "", authorPic: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Article
      </Button>
    </GridToolbarContainer>
  );
}

const SubCategory = () => {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleOrderItemClick = (orderItems) => {
    setSelectedItem(orderItems);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    const res = await deleteArticle(_id);
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

  async function handleSave(content) {
    try {
      const response = await updateArticle(selectedItem._id, {
        ...selectedItem,
        content,
      });
      setSnackbar({
        children: "Article Updated Successfully",
        severity: "success",
      });
      setRows((oldRows) => {
        const newRows = [...oldRows];
        const index = newRows.findIndex((row) => row._id === selectedItem._id);
        newRows[index] = response.data.data;
        return newRows;
      });
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
      // console.log(error);
    }
  }

  const processRowUpdate = React.useCallback(async (newRow, oldRow) => {
    if (newRow.isNew) {
      const newArticle = newRow;
      delete newArticle._id;
      const response = await createArticle(newArticle);
      setSnackbar({ children: response.message, severity: "success" });
      setRows((oldRows) => {
        const newRows = [...oldRows];
        const index = newRows.findIndex((row) => row._id === oldRow._id);
        newRows[index] = response.data.data;
        return newRows;
      });
      return response.data.data;
    }
    const response = await updateArticle(oldRow._id, newRow);
    setSnackbar({
      children: "Article Updated Successfully",
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
      field: "img",
      headerName: "Image",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <>
          <img
            src={params.row.img}
            alt={params.row.title}
            style={{ width: 100 }}
          />
          {params.row.img}
        </>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "content",
      headerName: "Content",
      width: 250,
      renderCell: (params) => (
        <div style={{ cursor: "pointer", textDecoration: "underline" }}>
          View and Edit
        </div>
      ),
    },
    {
      field: "authorPic",
      headerName: "Author Pic",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div>
          <img
            src={params.row.authorPic}
            alt="Img Link"
            style={{ width: 30, height: 30, borderRadius: "50%" }}
            className="mx-auto"
          />
        </div>
      ),
      editComponent: (props) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={props.value}
            alt="Author Pic"
            style={{ width: 30, height: 30 }}
          />
          <input
            type="text"
            value={props.value}
            onChange={(e) =>
              props.api.setEditCellValue(props.id, props.field, e.target.value)
            }
            onBlur={() => props.api.commitCellChange(props.id, props.field)}
          />
        </div>
      ),
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      editable: true,
    },
    {
      field: "readTime",
      headerName: "Read Time (min)",
      width: 150,
      editable: true,
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
    {
      field: "createdAt",
      headerName: "Created At",
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
      width: 250,
      editable: false,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      renderCell: (params) => (
        <div>{new Date(params.value).toLocaleString()}</div>
      ),
      width: 250,
      editable: false,
    },
  ];

  React.useEffect(async () => {
    const res = await getArticles();
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
        }}
      >
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
          onCellClick={async (params) => {
            if (params.field === "content") {
              handleOrderItemClick(params.row);
            }
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
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
        />
      </Box>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          articleContent={selectedItem.content}
          handleSave={handleSave}
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
export default SubCategory;
