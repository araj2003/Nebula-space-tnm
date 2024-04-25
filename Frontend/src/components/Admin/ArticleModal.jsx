import React from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import JoditEditor from "jodit-react";
import { useState, useRef, useMemo } from "react";

Modal.setAppElement("#root");

function OrderModal({ isOpen, onClose, articleContent, handleSave }) {
	const editor = useRef(null);
	const [content, setContent] = useState(articleContent);

	const handleSubmit = (event) => {
		event.preventDefault();
		handleSave(content);
	};

	return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Order Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <AiFillCloseCircle className="text-xl text-red-600" />
          </button>
        </div>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setContent(newContent)}
          />
          {/* <ReactQuill
						value={article.content}
						onChange={handleChange}
					/> */}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="border-2 border-teal-600 py-2 px-3 rounded-lg text-teal-700 hover:bg-teal-600 hover:text-white transition-all duration-200"
        >
          Save
        </button>
      </Modal>
    </>
  );
}

export default OrderModal;
