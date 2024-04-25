import React from "react";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div className="border-2 shadow-md outline-2 pb-3 hover:outline outline-teal-300 transition-all duration-100 overflow-hidden ">
      <Link to={`${article._id}`} className="  flex flex-col gap-0.5 h-full">
        <figure className="h-32 md:h-44">
          <img
            src={article.img}
            alt="img"
            className="object-cover h-full w-full object-top "
          />
        </figure>
        <h3 className="text-xl md:text-2xl w-full text-zinc-600 font-semibold line-clamp-2 min-h-[52px] items-center px-3 pt-3">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 px-1 py-2 border-y mx-2 my-1 text-sm  text-gray-600">
          <img
            src={article.authorPic}
            alt=""
            className=" h-6 aspect-square object-cover rounded-full"
          />
          <p className="">{article.author}</p>
          {"|"}
          <p>{formatDate(article.updatedAt)}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-600 px-3  my-2 line-clamp-4">
          {article.description}
        </p>
       { article?.readTime && <span className="mx-3 py-1 px-2 text-xs rounded-full mt-auto text-gray-100 bg-teal-600 self-baseline align-bottom">
          {article.readTime}
          <span className=""> min read</span>
        </span>}
      </Link>
    </div>
  );
};

export default Article;
