import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./EditableObject.module.css";

const EditableObject = ({ object }) => {
	const [editedObject, setEditedObject] = useState(object);

	useEffect(() => {
		setEditedObject(object);
	}, [object]);

	const editableFields = ["_id", "__v"];
	const hiddenFields = [
		"__v",
		"createdAt",
		"updatedAt",
		"passwordResetExpires",
		"passwordResetToken",
	];

	const handleEdit = (key, value) => {
		setEditedObject({ ...editedObject, [key]: value });
	};

	const renderFields = (obj, parentKey = "") => {
		if (!obj) return null;

		return Object.keys(obj).map((key) => {
			const currentValue = obj[key];

			if (hiddenFields.includes(key)) {
				return null;
			}

			if (Array.isArray(currentValue)) {
				return (
					<div key={key}>
						{currentValue.map((item, index) => (
							<div key={index}>
								{renderFields(item, `${parentKey}.${key}[${index}]`)}
							</div>
						))}
					</div>
				);
			} else if (typeof currentValue === "object") {
				return (
					<div key={key}>
						{renderFields(currentValue, `${parentKey}.${key}`)}
					</div>
				);
			} else {
				const fieldKey = `${
					parseInt(parentKey.slice(1, 2)) + 1 || ""
				}${parentKey.slice(2).split(".").join(". ")} (${key})`;
				return (
					<div
						key={fieldKey}
						className={`${styles.fieldContainer} border-b  py-2 `}
					>
						<span className={styles.label}>{`${fieldKey}:`}</span>
						<TextField
							type="text"
							variant="outlined"
							size="small"
							value={currentValue}
							onChange={(e) => handleEdit(key, e.target.value)}
							inputProps={{ readOnly: true }}
						/>
					</div>
				);
			}
		});
	};

	if (!object) return <div>Empty Object</div>;

	return (
		<div className={styles.editableObject}>{renderFields(editedObject)}</div>
	);
};

export default EditableObject;
