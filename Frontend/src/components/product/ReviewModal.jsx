import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating"; // Correct import statement
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";

import { API_URL } from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "680px",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.2)", // Correct boxShadow value
  p: 4,
};

const API_URL_SEND = `${API_URL}/review`;

function ReviewModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    Title: "",
    Review: "",
    Rating: 0,
    name: "",
    designation: "",
    country: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostReview = async () => {
    try {
      const response = await axios.post(API_URL_SEND, {
        Title: reviewData.Title,
        Review: reviewData.Review,
        Rating: reviewData.Rating.toString(),
        name: reviewData.name,
        designation: reviewData.designation,
        country: reviewData.country,
        product: id,
      });

      if (response.status === 201 || 200) {
        // console.log("Review posted successfully");
        toast.success("Review posted successfully");
        handleClose();
      } else {
        console.error("Failed to post review");
      }

      setReviewData({
        Title: "",
        Review: "",
        Rating: 0,
        name: "",
        designation: "",
        country: "",
      });
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-[#319E8F] md:w-52 text-white py-2.5 px-6 md:py-4 md:px-8 rounded-full font-semibold"
      >
        Write a Review
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-Review"
      >
        <Box sx={style} className="flex flex-col gap-4">
          <div className="w-full flex justify-end">
            <AiFillCloseCircle onClick={handleClose} className="hover:cursor-pointer text-red-500 text-xl" />
          </div>
          <h2 className="text-2xl font-semibold">Add Review</h2>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Review Title</p>
            <input
              type="text"
              placeholder="Awesome Product"
              className="outline-none border p-2 border-black text-sm"
              name="Title"
              value={reviewData.Title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Review Review</p>
            <textarea
              placeholder="I would not believe it if I hadn't seen with my own eyes! It works! My dog is relaxed and able to enjoy his life. I will continue to buy this product."
              className="outline-none border p-2 border-black text-sm resize-none"
              rows={5}
              name="Review"
              value={reviewData.Review}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Your Name</p>
              <input
                type="text"
                placeholder="Siddhu Raghav"
                className="outline-none border p-2 border-black text-sm"
                name="name"
                value={reviewData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Designation</p>
              <input
                type="text"
                placeholder="Manager"
                className="outline-none border p-2 border-black text-sm"
                name="designation"
                value={reviewData.designation}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Country</p>
              <input
                type="text"
                placeholder="Bhuvaneshwar"
                className="outline-none border p-2 border-black text-sm"
                name="country"
                value={reviewData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Rate Product</p>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setReviewData((prevData) => ({
                    ...prevData,
                    Rating: newValue,
                  }));
                }}
              />
            </div>
            <button
              className="bg-teal-600 text-white px-8 py-3 rounded-full"
              onClick={handlePostReview}
            >
              Post
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ReviewModal;
