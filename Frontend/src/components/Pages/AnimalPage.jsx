import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Link, useParams } from "react-router-dom";
import { animalTypeLoadAction } from "../../actions/categories/animalTypeAction";
import { useGlobalContext } from "../../context/globalcontext";
import Loader from "../layout/Loader/Loader";


/**
 * Page component displays a list of animals and their descriptions.
 * @returns {JSX.Element} React component
 */

const AnimalPage = () => {
  const { animalType, loading } = useSelector((state) => state.animalTypeAll);

  const dispatch = useDispatch();
  const { animal } = useParams();
  const { error } = useSelector((state) => state.products);

  const { handleItemSelection } = useGlobalContext();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(animal));
  }, [dispatch, animal, error, alert]);

  useEffect(() => {
    dispatch(animalTypeLoadAction());
  }, [dispatch]);

  return (
    <div className="w-full py-24 lg:py-7 px-4 md:px-10 lg:px-16 flex flex-col gap-16">
      <section>
        <p className="text-2xl font-semibold text-gray-800 mb-5">Animals</p>
        {loading ? <Loader /> : <></>}
        <div className="flex w-full gap-[18px]  md:gap-7 lg:gap-[22px] flex-wrap">
          {animalType &&
            animalType.map((animal, index) => (
              <Link
                to={`/products`}
                key={animal._id}
                className="flex flex-col items-center hover:scale-105 duration-300"
                onClick={() => handleItemSelection(animal._id)}
              >
                <div
                  className="aspect-square h-[75px] md:h-[95px] lg:h-[150px] border rounded-2xl bg-cover"
                  style={{
                    backgroundImage: `url(${animal.imageUrl})`,
                  }}
                ></div>
                <p className="text-sm lg:text-base mt-2 lg:my-4">
                  {animal.subCategoryName}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section>
        <p className="text-[22px]  font-semibold text-lg mb-5">
          Description
        </p>
        <article className="flex flex-col gap-8 mt-2 md:text-[18px]">
          <p>
            Welcome to Space Wonders, we proudly offer a comprehensive range of
            products to cater to the diverse needs of various animals. From
            furry pets to farm animals and beyond, we have everything you need
            to provide exceptional care for your beloved companions.
          </p>
          <p>
            Our extensive selection covers a wide range of animals, including
            cats, dogs, birds, small mammals, reptiles, fish, and livestock such
            as cattle, horses, and poultry. We understand the unique
            requirements of each species and strive to provide specialized
            products tailored to their specific needs
          </p>
          <p>
            Here, you will find a vast array of animal products to enhance their
            well-being and enrich their lives. From essential items like food,
            treats, and bedding to health and grooming supplies, toys, and even
            fashionable accessories, we have it all.
          </p>
          <p>
            Additionally, we offer a variety of veterinary supplies, including
            surgical equipment, medications, supplements, first aid kits, and
            hygiene products, to help you ensure the health and happiness of
            your animals.
          </p>
          <p>
            With a commitment to quality and customer satisfaction,Our goal is
            to provide a convenient and reliable one-stop shopping experience,
            allowing you to find all your animal-related products under one
            roof.
          </p>
          <p>
            Whether you are a pet owner, a farmer, or a dedicated animal
            enthusiast, we are here to support you. Explore our diverse range of
            animal products and discover the convenience of finding everything
            you need in one place.
          </p>
          <p>
            Your animals deserve the best, and we are dedicated to helping you
            provide them.
          </p>
        </article>
      </section>
    </div>
  );
};

export default AnimalPage;
