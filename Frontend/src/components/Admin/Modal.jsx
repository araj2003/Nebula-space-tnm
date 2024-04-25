import React from "react";
import Modal from "react-modal";
import EditableObject from "./EditableObject";
import { AiFillCloseCircle } from "react-icons/ai";
Modal.setAppElement("#root");

function OrderModal({ isOpen, onClose, orderItems }) {
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
					<AiFillCloseCircle className='text-xl text-red-600' />
				</button>
			</div>
			<div className='py-3'>
				<EditableObject object={orderItems} />
			</div>
		</Modal>
	);
}

export default OrderModal;
