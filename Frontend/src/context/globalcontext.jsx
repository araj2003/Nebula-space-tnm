import React, { createContext, useContext, useState, useEffect } from "react";
import { getProduct } from "../actions/productAction";
import { useDispatch } from "react-redux";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const dispatch = useDispatch();
	const [selectedItems, setSelectedItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const resPerPage = 20;
	const [checkout, setCheckout] = useState(false);
	const [ordered, setOrdered] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(0);

	const resetSelectedItems = () => {
		setSelectedItems([]);
	};
	const handleItemSelection = (itemId) => {
		if (selectedItems.includes(itemId)) {
			setCurrentPage(1);
			setSelectedItems(selectedItems.filter((id) => id !== itemId));
		} else {
			setSelectedItems([...selectedItems, itemId]);
		}
	};

	useEffect(() => {
		dispatch(getProduct(currentPage, resPerPage, selectedItems));
	}, [selectedItems]);

	return (
		<GlobalContext.Provider
			value={{
				selectedItems,
				handleItemSelection,
				resetSelectedItems,
				checkout,
				setCheckout,
				ordered,
				setOrdered,
				cartQuantity,
				setCartQuantity,
				currentPage,
				setCurrentPage,
				resPerPage,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
