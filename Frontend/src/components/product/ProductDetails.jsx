import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../layout/Loader/Loader";
import ProductReviewCard from "./ProductReviewCards";
import FAQ from "./FAQ";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import TypeSelection from "./TypeSelection";
import Sizes from "./Sizes";
import Others from "./Others";
import ProductColors from "./ProductColors";
import ReviewModal from "./ReviewModal";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import MobileImages from "./MobileImages";
import { useGlobalContext } from "../../context/globalcontext";
import CustomerReviewsBar from "./CustomerReviewsBar";
import SpecificFeatures from "./SpecificFeatures";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCartPlus } from "react-icons/fa";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { setCartQuantity } = useGlobalContext();

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [otherVariant, setOtherVariant] = useState(null);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const handleAddToCart = async () => {
    setLoadingAddToCart(true);

    if (!isAuthenticated) {
      toast.error("Please Login to add to Cart");
      setLoadingAddToCart(false); // Reset loading flag
      return;
    }

    // if (
    //   isAuthenticated &&
    //   product.available_size.length !== 0 &&
    //   size === null
    // ) {
    //   toast.error("Please Select Size");
    //   setLoadingAddToCart(false); // Reset loading flag
    //   return;
    // }

    // if (isAuthenticated && product.color.length !== 0 && color === null) {
    //   toast.error("Please Select Color");
    //   setLoadingAddToCart(false); // Reset loading flag
    //   return;
    // }

    // if (
    //   isAuthenticated &&
    //   product.othervarients.length !== 0 &&
    //   otherVariant === null
    // ) {
    //   toast.error("Please Select Variant");
    //   setLoadingAddToCart(false); // Reset loading flag
    //   return;
    // }

    if (isAuthenticated && product && product._id) {
      try {
        dispatch(
          addToCart(product._id, 1, size, color, otherVariant, () => {
            toast.success(`${product.name} added to Blog`);
            setLoadingAddToCart(false); // Reset loading flag
          })
        );
      } catch (error) {
        // Handle error if necessary
        console.error("Error adding to cart:", error);
        setLoadingAddToCart(false); // Reset loading flag
      }

    }
  };
  

  useEffect(() => {
    setCartQuantity(cartItems.length);
  }, [cartItems, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [id, error]);

  if (product._id !== id) {
    return <Loader />;
  }
  return (
    <>
      <div className="w-[95%] sm:w-[90%] lg:w-4/5 mx-auto my-5 py-24 lg:py-8 text-white">
        <MetaData title={product?.name} />
        <div className="justify-center  flex md:gap-10 items-start border-b-2 mb-5 pb-3">
          <div className="hidden md:flex flex-col w-[450px]">
            {product?.images && <ProductImages images={product?.images} />}
          </div>
          <div>
            <div className="block md:hidden  mx-auto relative mb-4">
              {product?.images && <MobileImages images={product?.images} />}
            </div>
            <h2 className="capitalize text-[1.75rem] md:text-[2.5rem] font-semibold mt-2 text-white">
              {product?.productTitle}
            </h2>
            <p
              className="text-teal-300 text-[14px] md:text-lg"
              style={{ whiteSpace: "pre-line" }}
            >
              {product?.description}
            </p>
            <div className="flex gap-8 text-[20px] pb-1 items-center">
              <div className="flex items-center gap-2 my-2 ">
                <span className="text-[20px]">{product?.avg_rating}</span>
                <span className="flex items-center">
                  {product?.avg_rating && (
                    <Rating
                      name="read-only"
                      value={product.avg_rating}
                      readOnly
                      precision={0.1}
                    />
                  )}
                </span>
              </div>
              {/* <p className="text-lg lg:text-inherit">
                Model No-
                <span className="font-light">{product?.model_number}</span>
              </p> */}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={loadingAddToCart}
              className="mx-0 my-2 bg-teal-600 mb-4 w-60 h-16 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-200 md:text-lg "
            >
              {loadingAddToCart ? (
                <CircularProgress className="!text-white !scale-75"/>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Book Now</span>
                  <span>
                    <FaCartPlus />
                  </span>
                </div>
              )}
            </button>
            <div className="border-b-2 border-gray-700  mb-3"></div>
            <div className="space-y-6 py-2">
              {product.available_size && (
                <Sizes
                  sizes={product?.available_size}
                  selectedSize={size}
                  setSelectedSize={setSize}
                />
              )}
              {/* {product.color && (
                <ProductColors
                  colors={product?.color}
                  selectedColor={color}
                  setSelectedColor={setColor}
                />
              )}
              {product.othervarients && (
                <Others
                  others={product.othervarients}
                  otherVariant={otherVariant}
                  setOtherVariant={setOtherVariant}
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="ProductDetails flex flex-col  gap-1.5 md:gap-8">
          {/* <ProductInfo product={product} /> */}
          {/* {product?.specific_features.length != 0 && (
            <SpecificFeatures features={product.specific_features} />
          )} */}
          {product?.specific_features.length != 0 && (
            <FAQ faqs={product.faqs} />
          )}
          {/* <div className="py-6 space-y-2 ">
            <p className="text-xl md:text-2xl font-medium text-zinc-900">
              Customer Reviews
            </p>
            <div className="flex flex-col lg:grid grid-cols-2 lg:gap-10 w-[95%]">
              <div className="space-y-5 w-[90%] lg:w-full mb-5">
                <CustomerReviewsBar
                  avg_rating={product?.avg_rating}
                  total_no_of_reviews={product?.total_no_of_reviews}
                  reviews={product?.reviews}
                />
                <ReviewModal />
              </div>
              {product.reviews && (
                <ProductReviewCard reviews={product?.reviews} />
              )}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
