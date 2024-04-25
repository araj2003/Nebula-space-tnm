import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { getCategories } from "./api";

export default function FolderList() {
	const [category, setCategory] = useState([{}]);
	useEffect(async () => {
		const data = await getCategories();
		// console.log(data.categoryT);
		setCategory(data.categoryT);
	}, []);

	return (
		<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			{category.map((item) => {
				return (
					<ListItem>
						<ListItemAvatar>
							<Avatar
								alt={item.categoryName}
								src={item.imageUrl}
							/>
						</ListItemAvatar>
						<ListItemText primary={item.categoryName} />
					</ListItem>
				);
			})}
		</List>
	);
}
