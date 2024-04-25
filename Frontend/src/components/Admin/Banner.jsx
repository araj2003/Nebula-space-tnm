import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Grid, TextField, Button, Autocomplete } from "@mui/material";
import Loader from "../layout/Loader/Loader";

import { getAllBanners, updateBanner } from "./api";

function CreateProduct() {
	const [banners, setBanners] = useState({});
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState(null);

	const handleCloseSnackbar = () => setSnackbar(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllBanners();
				const bannerData = res.data.data[0];
				setBanners(bannerData);
				setLoading(false);
			} catch (err) {
				setSnackbar({
					children: "Something went wrong",
					severity: "error",
				});
			}
		};
		fetchData();
	}, []);

	const handleArrayChange = (event, newValue, name) => {
		//limit size of array to 5
		if (newValue.length > 1) {
			//show user a warning
			setSnackbar({
				children: "You can only add 1 image",
				severity: "warning",
			});
			return;
		}
		setBanners({
			...banners,
			[name]: newValue, // newValue is an array of selected colors
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await updateBanner(banners);
			// console.log(res);
			setSnackbar({
				severity: "success",
				children: `Banner updated successfully`,
			});
		} catch (err) {
			setSnackbar({
				children: "Something went wrong",
				severity: "error",
			});
		}
	};

	if (loading) return <Loader />;

	return (
		<>
			<Grid
				container
				spacing={2}>
				<div className='flex justify-between items-center w-full mt-7 ml-4'>
					<h2 className='text-2xl font-semibold'>Banners</h2>
				</div>
				<Grid
					item
					xs={12}
					sm={6}>
					<Autocomplete
						multiple
						freeSolo
						clearOnBlur
						options={banners.smallBanner} // Use the colors from formData as options
						value={banners.smallBanner}
						getOptionLabel={(option) => (
							<img
								src={option}
								alt='Image'
								style={{ width: 50, height: 50 }}
							/>
						)}
						onChange={(event, newValue) =>
							handleArrayChange(event, newValue, "smallBanner")
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Top Banner'
								placeholder='Enter Images'
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Autocomplete
						multiple
						freeSolo
						clearOnBlur
						options={banners.bigBanner} // Use the colors from formData as options
						value={banners.bigBanner}
						getOptionLabel={(option) => (
							<img
								src={option}
								alt='Image'
								style={{ width: 50, height: 50 }}
							/>
						)}
						onChange={(event, newValue) =>
							handleArrayChange(event, newValue, "bigBanner")
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Bottom Banner'
								placeholder='Enter Images'
							/>
						)}
					/>
				</Grid>
				<div className='flex mt-14 justify-center w-full'>
					<Button
						type='submit'
						onClick={handleSubmit}
						variant='outlined'
						color='primary'>
						Update Banners
					</Button>
				</div>
			</Grid>

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
		</>
	);
}

export default CreateProduct;
