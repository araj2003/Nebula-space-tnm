import React, { useEffect, useState } from "react";
import { API_URL } from "../../api";
import { Link, useParams } from "react-router-dom";
import MetaData from "../MetaData";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { IoArrowBackOutline, IoReturnDownBackOutline } from "react-icons/io5";
const ArticlePage = () => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };
  const { _id } = useParams();
  const [article, setArticle] = useState({});
  // console.log(article);
  const fetchArticle = async () => {
    try {
      const res = await axios.get(`${API_URL}/home/articles/${_id}`);
      setArticle(res.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="mx-auto pt-20 pb-5 lg:pt-0 min-h-[75vh]  flex flex-col justify-between">
      <MetaData />
      <div className="flex flex-col gap-4 max-w-3xl mx-auto shadow-sm px-5">
        <Link
          to={"/allarticles"}
          className="mt-3 flex items-center gap-1 text-lg text-teal-700  pr-3  "
        >
          <span>
            <IoArrowBackOutline />
          </span>
          <span>All Articles </span>
        </Link>
        <h2 className="text-3xl md:text-5xl w-full font-semibold  text-white">
          {article?.title}
        </h2>
        <div>
          <p className="font-[450] text-white text-xl  mb-3">
            {article?.description}
          </p>
          <div className="flex items-center gap-3 py-2 border-y m-2  text-sm md:text-base  text-gray-200">
            <img
              src={article?.authorPic}
              alt=""
              className=" h-8 aspect-square object-cover rounded-full"
            />
            <p className="">{article?.author}</p>
            {"|"}
            <p>{formatDate(article?.updatedAt)}</p>
            <span className="md:inline hidden">{"|"}</span>
            {article?.readTime && (
              <span className=" py-1 px-2 text-sm hidden md:inline font-medium rounded-full  text-gray-100 bg-teal-600 ">
                {article?.readTime}
                <span className=""> min read</span>
              </span>
            )}
          </div>
          {article?.readTime && (
              <span className=" py-1 px-2 text-xs md:hidden w-fit block rounded-full  text-gray-100 bg-teal-600 ">
                {article?.readTime}
                <span className=""> min read</span>
              </span>
            )}
        </div>

        <figure className="">
          <img
            src={article?.img}
            alt="img"
            className=" object-cover w-full max-h-96"
          />
        </figure>
        <div style={{ padding: "10px" }} className="text-gray-100">
          {ReactHtmlParser(article?.content)}
        </div>
        <div className="flex flex-row-reverse items-center gap-3 py-2 border-y m-2  text-base md:text-lg font-medium md:px-4 text-gray-600">
          <img
            src={article.authorPic}
            alt=""
            className=" h-12 aspect-square object-cover rounded-full"
          />
          <p className="">{article.author}</p>
          {"|"}
          <p>{formatDate(article.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
