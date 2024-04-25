import React from "react";
import Modal from "react-modal";
import CreateProduct from "./CreateProduct";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
Modal.setAppElement("#root"); // Replace '#root' with your app's root element

function OrderModal({ isOpen, onClose, id, categories, subcategories }) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Order Details'
			style={{
				overlay: {
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				},
				content: {
					maxWidth: "600px",
					margin: "auto",
				},
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "end",
					alignItems: "center",
				}}>
				<button
					onClick={onClose}
					style={{ background: "none", border: "none", cursor: "pointer" }}>
					<AiFillCloseCircle className='text-xl text-red-500' />
				</button>
			</div>
			<div>
				<CreateProduct
					id={id}
					categories={categories}
					subcategories={subcategories}
				/>
			</div>
		</Modal>
	);
}

export default OrderModal;
