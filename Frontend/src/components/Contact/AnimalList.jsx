import React from "react";
import { AiFillDelete } from "react-icons/ai";

const AnimalList = ({
  handleAnimalNameChange,
  handleQuantityChange,
  addItemToList,
  toDoList,
  animalName,
  quantity,
  removeItemFromList,
}) => {
  // console.log(toDoList)
  return (
    <div>
      <h2 className="w-full flex justify-center  underline-offset-[6px]  text-gray-600 font-semibold text-lg md:text-2xl">
        List of Animals under your care
      </h2>
      <div className="flex justify-center py-1">
        <input
          type="text"
          placeholder="Animal Name"
          value={animalName}
          onChange={handleAnimalNameChange}
          className="outline-none border px-4 py-1.5 rounded-lg m-1 w-3/5"
        />
        <input
          type="text"
          placeholder="Qty"
          value={quantity}
          onChange={handleQuantityChange}
          className="outline-none border px-2 py-1.5 rounded-lg m-1 w-14 text-center"
        />
        <button
          onClick={addItemToList}
          className="m-1 bg-teal-600 text-white rounded-lg px-3 py-1"
        >
          Add
        </button>
      </div>
      <ul className="h-28 sm:h-72 p-1 overflow-scroll no-scrollbar">
        {toDoList.map((item) => (
          <li
            key={item.id}
            className="flex border px-4 py-2 items-center justify-center gap-2 m-1 rounded-md text-teal-800 bg-teal-50"
          >
            <div className="w-3/5">{item.animalName}</div>
            <div className="w-14 px-5">{item.quantity}</div>
            <button
              className="ml-4 text-red-500 hover:text-red-700 text-lg "
              onClick={(e) => {
                e.preventDefault();
                removeItemFromList(item.animalName, item.quantity);
              }}
            >
              <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList;
