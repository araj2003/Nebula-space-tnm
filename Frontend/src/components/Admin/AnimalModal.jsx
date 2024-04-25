import React from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
Modal.setAppElement("#root");

function OrderModal({ isOpen, onClose, orderItems }) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Animals"
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
					justifyContent: "end",
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
			<div className="py-3">
				<ul className="p-1 overflow-scroll no-scrollbar">
					{orderItems.length === 0 && (
						<div className="text-center text-2xl font-semibold">No Animals</div>
					)}
					{orderItems.map((item, index) => (
						<li
							key={item.id}
							className="flex border px-4 py-2 items-center justify-center gap-2 m-1 rounded-md text-teal-800 bg-teal-50"
						>
							<div>{index + 1}.</div>
							<div className="w-3/5">{item.animalName}</div>
							<div className="w-14 px-5">{item.quantity}</div>
						</li>
					))}
				</ul>
			</div>
		</Modal>
	);
}

export default OrderModal;
