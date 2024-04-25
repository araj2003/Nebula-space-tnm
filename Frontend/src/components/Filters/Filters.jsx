import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { clearErrors } from "../../actions/productAction";
import { useGlobalContext } from "../../context/globalcontext";
import "./Filters.css";
// import { div, div, divButton, div } from "react-accessible-div";
// import "react-accessible-div/dist/fancy-example.css"; // Import the CSS for styling
import { loadCategoryAction } from "../../actions/categoryAction";

const Filters = () => {
	const { categories, loading: categoryLoading } = useSelector(
		(state) => state.categories
	);
	const indexToMove = categories.findIndex(
		(category) => category.name === "Surgicals"
	);

	if (indexToMove > -1) {
		const surgicalsCategory = categories.splice(indexToMove, 1); // Remove "Surgicals" from its current position
		categories.unshift(...surgicalsCategory); // Add "Surgicals" to the beginning of the array
	}
	// console.log(categories);
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error } = useSelector((state) => state.products);
	const { selectedItems, handleItemSelection } = useGlobalContext();

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		dispatch(loadCategoryAction());
	}, [dispatch, error, alert]);

	return (
		<div className="hidden bg-white -z-10 mt-1  shadow   px-3 md:flex flex-col items-center py-4">
			<div className="w-full  text-2xl text-zinc-800 font-medium">Filters</div>
			<div className="flex justify-start no-scrollbar flex-col  gap-0 overflow-x-scroll overflow-hidden  ">
				{categories &&
					categories.map((category) => (
						<div key={category.id}>
							<div
								preExpanded="true"
								allowZeroExpanded={true}
								className="md:mt-5"
							>
								<div uuid={category.id}>
									<divButton className="flex items-center gap-1 min-w-20 w-fit text-left">
										<h2 className="text-lg font-medium text-zinc-700">
											{category.name}
										</h2>
									</divButton>
									<div className="p-0 z-10">
										{category.subcategories.map((subcategory) => (
											<label
												key={subcategory.id}
												className="flex items-center mt-2  border-gray-300 checkbox style-c"
											>
												<input
													type="checkbox"
													value={subcategory.id}
													checked={selectedItems.includes(subcategory.id)}
													onChange={() => handleItemSelection(subcategory.id)}
												/>
												<div className="checkbox__checkmark"></div>
												<span className="ml-2 text-sm text-[#4A5568]  checkbox__body">
													{subcategory.name}
												</span>
											</label>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Filters;
