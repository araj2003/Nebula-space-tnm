import React, { useEffect, useState } from "react";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Shipping from "./Shipping";
import Billing from "./Billing";
import AnimalList from "./AnimalList";
import { useGlobalContext } from "../../context/globalcontext";
import { createOrder } from "../../actions/orderAction";

const Contact = () => {
  const navigate = useNavigate();
  const { checkout, setOrdered } = useGlobalContext();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  // console.log(user)
  // Shipping and billing details states
  const [shippingDetails, setShippingDetails] = useState({
    fname: "",
    lname: "",
    organization: "",
    officialEmailId: "",
    phoneNo: "",
    pinCode: "",
    country: "",
    city: "",
    state: "",
    address: "",
  });

  const [billingDetails, setBillingDetails] = useState({
    fname: "",
    lname: "",
    organization: "",
    officialEmailId: "",
    phoneNo: "",
    pinCode: "",
    country: "",
    city: "",
    state: "",
    address: "",
  });

  const [animals, setAnimals] = useState([]);
  const [animalName, setAnimalName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAnimalNameChange = (e) => {
    setAnimalName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const addItemToList = (e) => {
    e.preventDefault();
    if (animalName.trim() === "" || quantity.trim() === "") {
      return;
    }
    const newItem = {
      animalName,
      quantity,
    };
    setAnimals([...animals, newItem]);
    setAnimalName("");
    setQuantity("");
  };

  const removeItemFromList = (name, qty) => {
    const updatedList = animals.filter(
      (item) => item.animalName !== name && item.quantity !== qty
    );
    setAnimals(updatedList);
  };

  useEffect(() => {
    if (!checkout) {
      navigate("/cart");
    }
  }, [checkout, navigate]);

  useEffect(() => {
    setShippingDetails(user?.address);
    setShippingDetails(user?.address);
    setAnimals(user?.animals);
  }, [user]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        shippingInfo: shippingDetails,
        billingInfo: billingDetails,
        animals: animals,
      })
    );
    navigate("/confirmorder");
    setOrdered(true);
  };

  return (
    <>
      {user && (
        <form
          onSubmit={handleSubmit}
          className="px-7 md:px-16 pt-32 lg:py-8 flex w-full flex-col sm:flex-row  gap-8 "
        >
          <MetaData title="Shipping Details" />
          <div className="sm:w-3/5">
            <Shipping
              shippingDetails={shippingDetails}
              onShippingChange={handleShippingChange}
            />
            <Billing
              billingDetails={billingDetails}
              onBillingChange={handleBillingChange}
              setBillingDetails={setBillingDetails}
              shippingDetails={shippingDetails}
            />
          </div>
          <div className="flex flex-col justify-between sm:pb-5 w-1/3  sm:border-l-2 sm:pl-4 mx-auto h-full">
            {/* <AnimalList
              toDoList={animals}
              animalName={animalName}
              quantity={quantity}
              handleAnimalNameChange={handleAnimalNameChange}
              handleQuantityChange={handleQuantityChange}
              addItemToList={addItemToList}
              removeItemFromList={removeItemFromList}
            /> */}
            <button
              type="submit"
              className="border-2 mb-3 flex gap-2 justify-center items-center group mx-auto w-3/4 border-teal-600 hover:text-teal-700 py-1.5 sm:py-2.5 font-semibold bg-teal-600 text-white transition-all duration-300 text-lg hover:bg-white"
            >
              Confirm Booking
              <BsArrowRight className="transition-all duration-300 group-hover:translate-x-1 text-xl" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Contact;
