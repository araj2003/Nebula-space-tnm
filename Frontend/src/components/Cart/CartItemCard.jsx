import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

/**
 * CartItemCard component displays a single product in the cart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item object to display.
 * @param {Function} props.deleteCartItems - The function to delete the item from the cart.
 * @returns {JSX.Element} - The CartItemCard component.
 */

const CartItemCard = ({
  product,
  deleteCartItems,
  cartId,
  quantity,
  updateQuantity,
  item,
}) => {
  const [itemQty, setItemQty] = useState(quantity);

  return (
    <div className="w-full">
      <div className="border-b-2  items-center flex gap-5 md:m-2 w-full pb-4 ">
        <figure className="w-24 md:w-36 aspect-square border-2 p-1 overflow-hidden rounded-md">
          {product.images && (
            <img src={product.images[0]} alt="cartItem" className="w-full " />
          )}
        </figure>
        <div className="flex flex-col pt-3 gap-4">
          <Link to={`/product/${product._id}`}>
            <p className="capitalize text-xl md:text-[22px] hover:underline  text-gray-800">
              {product.name}
            </p>
          </Link>
          <div className="flex justify-between text-teal-700">
            {item.color !== "NaN" && <div>{item.color}&nbsp;</div>}
            {item.size !== "NaN" && <div>{item.size}&nbsp;</div>}
            {item.other !== "NaN" && <div>{item.other}&nbsp;</div>}
          </div>
          <div className="flex gap-3 border w-fit items-center">
            <button
              onClick={async () => {
                setItemQty((prevQty) => {
                  const newQty = prevQty - 1;
                  if (newQty === 0) {
                    deleteCartItems(cartId);
                    toast.info(`${product.name} removed from the cart`);
                    return;
                  }
                  updateQuantity(cartId, newQty);
                  return newQty;
                });
              }}
              className="border h-5 md:h-6 font-normal text-lg flex items-center justify-center px-2.5 hover:bg-teal-700 hover:text-white cursor-pointer duration-300 active:bg-black"
            >
              -
            </button>
            <span className="text-sm text-black">{itemQty}</span>
            <button
              onClick={async () => {
                setItemQty((prevQty) => {
                  const newQty = prevQty + 1;
                  updateQuantity(cartId, newQty);
                  return newQty; // Update the state with the new quantity
                });
              }}
              className="border h-5 md:h-6 font-normal text-lg flex items-center justify-center px-2.5 hover:bg-teal-700 hover:text-white cursor-pointer duration-300 active:bg-black"
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              deleteCartItems(cartId);
              toast.info(`${product.name} removed from the cart`);
            }}
            className="bg-red-500 text-white py-1 mt-2 w-14 md:w-16 text-xs md:text-sm rounded hover:bg-transparent
            border border-red-500 hover:text-red-500 transition-all duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
