import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import Filters from "../Filters/Filters";
import ProductCard from "./ProductCard";
import { useGlobalContext } from "../../context/globalcontext";
import Pagination from "react-js-pagination";
import "./style.css";
import MobileFilters from "../Filters/MobileFilters";
const Product = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const {
		currentPage,
		setCurrentPage,
		resPerPage,
		resetSelectedItems,
		selectedItems,
	} = useGlobalContext();

	const { error, loading, products, totalProduct } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
			return;
		}

		return () => {
			resetSelectedItems();
		};
	}, [dispatch, alert, error, currentPage]);

	const setCurrentPageNo = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0);
	};

	return (
		<div>
			<div className="pt-24   lg:py-0 flex flex-col  md:flex-row gap-1">
				{/* <div className="md:w-[20vw] lg:w-[14vw] mb-3 md:mb-0">
					<Filters />
					<MobileFilters />
				</div> */}
				<div className="w-full md:w-5/6   mx-auto  px-2">
					{loading ? (
						<Loader />
					) : (
						<>
							<div className="mt-5 underline mb-3 text-lg md:text-xl font-semibold text-white text-center md:text-left">{`Showing ${
								totalProduct === 0 ? 0 : resPerPage * (currentPage - 1) + 1
							} - ${Math.min(
								resPerPage * currentPage,
								totalProduct
							)} out of ${totalProduct}  results →`}</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
								{totalProduct != 0 ? (
									products?.map((product) => (
										<ProductCard key={product._id} product={product} />
									))
								) : (
									<div className="flex flex-col text-lg italic opacity-80 space-y-5 justify-center items-center w-full ">
										<p>We couldn't find any items that match your filters</p>
									</div>
								)}
							</div>
							{totalProduct != 0 && (
								<div className="w-full flex justify-center lg:justify-end mt-16 pr-8 md:mb-0">
									<div className="w-fit  flex items-center px-2 py-2 border my-3 text-teal-800 border-teal-600 rounded-md ">
										<Pagination
											activePage={currentPage}
											itemsCountPerPage={resPerPage}
											totalItemsCount={totalProduct}
											onChange={setCurrentPageNo}
											nextPageText={"Next"}
											prevPageText={"Prev"}
											firstPageText={"↞"}
											lastPageText={"↠"}
										/>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
			<style>
				{`
        .pagination .active{
          background: #019B98;
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          color :white;
        }`}
			</style>
		</div>
	);
};

export default Product;
