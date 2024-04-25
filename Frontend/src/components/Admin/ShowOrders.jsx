import React from "react";
import Modal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function OrderModal({ isOpen, onClose, orderItems }) {
	const closeModal = () => {
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
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
					justifyContent: "flex-end",
					alignItems: "center",
				}}>
				<button
					style={{ background: "none", border: "none", cursor: "pointer" }}
					onClick={closeModal}>
					<AiFillCloseCircle
						style={{ fontSize: "1.5rem", color: "#ff4d4f" }}
						className='close-icon'
					/>
				</button>
			</div>
			<div
				style={{
					textAlign: "center",
					fontSize: "1.5rem",
					fontWeight: "bold",
					marginTop: "20px",
					marginBottom: "10px",
				}}>
				Order Details
			</div>
			{orderItems.map((item, index) => (
				<div
					key={index}
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "10px",
						border: "2px solid #ccc",
						borderRadius: "5px",
						margin: "10px 0",
					}}>
					<div style={{ flex: 1, marginRight: "20px" }}>
						<img
							src={item?.product.images[0]}
							alt={item.product.name}
							style={{
								width: "100px",
								height: "100px",
								objectFit: "cover",
								borderRadius: "5px",
							}}
						/>
					</div>
					<div style={{ flex: 2 }}>
						<h1
							style={{
								fontSize: "1.2rem",
								marginBottom: "5px",
							}}>
							{item.product.name}
						</h1>
						<Link
							to={`/product/${item.product._id}`}
							style={{
								display: "inline-block",
								backgroundColor: "#008080",
								color: "white",
								textDecoration: "none",
								padding: "5px 10px",
								borderRadius: "5px",
								fontSize: "0.9rem",
							}}>
							Product Page
						</Link>
					</div>
					<div style={{ flex: 2, marginLeft: "20px" }}>
						<p
							style={{
								fontSize: "1rem",
								marginBottom: "5px",
							}}>
							Quantity: {item.quantity}
						</p>
						{item.size !== "NaN" && (
							<p
								style={{
									fontSize: "1rem",
									marginBottom: "5px",
								}}>
								Size: {item.size}
							</p>
						)}
						{item.color !== "NaN" && (
							<p
								style={{
									fontSize: "1rem",
									marginBottom: "5px",
								}}>
								Color: {item.color}
							</p>
						)}
						{item.other !== "NaN" && (
							<p
								style={{
									fontSize: "1rem",
									marginBottom: "5px",
								}}>
								Other: {item.other}
							</p>
						)}
					</div>
				</div>
			))}
		</Modal>
	);
}

export default OrderModal;
