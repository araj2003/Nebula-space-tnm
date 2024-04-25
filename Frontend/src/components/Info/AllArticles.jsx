import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./style.css";
import Article from "./Article";
import axios from "axios";
import { API_URL } from "../../api";

const ITEMS_PER_PAGE = 5;

const AllArticles = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [articlesData, setArticlesData] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // console.log(articlesData);
	const fetchArticles = async () => {
		try {
			const res = await axios.get(
				`${API_URL}/home/articles?page=${
					currentPage + 1
				}&limit=${ITEMS_PER_PAGE}`
			);
			setArticlesData(res.data.data.data);
			setTotalPages(Math.ceil(res.data.totalDocuments / ITEMS_PER_PAGE));
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, [currentPage]);

	const displayedArticles = articlesData.map((article) => (
    <Article
      key={article._id}
      article={article}
    />
  ));

	return (
		<div className="w-[95%] sm:w-[90%] px-4 mx-auto pt-24 pb-5 lg:py-7 min-h-[75vh] flex flex-col justify-between">
			<div>
				<h2 className="text-2xl text-center text-white sm:text-left md:text-3xl font-semibold underline mb-6 md:mb-8">
					Articles & Blogs
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10 px-1">
					{displayedArticles}
				</div>
			</div>
			<div className="w-fit mx-auto bg-teal-600 px-2 py-0.5 border mt-20 text-white border-teal-600 rounded-md ">
				<ReactPaginate
					previousLabel={"← Prev"}
					nextLabel={"Next →"}
					breakLabel={"..."}
					pageCount={totalPages}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageChange}
					containerClassName={"pagination"}
					activeClassName={"pagination__link--active"}
					className="flex gap-3 mx-auto"
				/>
			</div>
		</div>
	);
};

export default AllArticles;
