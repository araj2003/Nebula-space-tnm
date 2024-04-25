import React from "react";
import TypeSelection from "./TypeSelection";

const   ProductInfo = ({ product }) => {
  return (
    <div className="details flex flex-col gap-2 md:text-[20px] bg-white p-2 ">
      {product?.varities && <TypeSelection types={product.varities} />}
      {product.shelflife ? (
        <div className="flex justify-between">
          <p>Shelf Life</p>
          <div className="font-light">{product.shelflife}</div>
        </div>
      ) : null}
      {product.brand ? (
        <div className="flex justify-between">
          <p>Brand</p>
          <div>{product.brand}</div>
        </div>
      ) : null}
      {product.certification ? (
        <div className="flex justify-between">
          <p>Certification</p>
          <div>{product.certification}</div>
        </div>
      ) : null}
      {product.dimenssions && product.dimenssions.length != 0 ? (
        <div className="flex justify-between gap-2 items-center">
          <p>Dimensions</p>
          <div className="font-light text-sm md:text-base ">{product.dimenssions.join(", ")}</div>
        </div>
      ) : null}

      {product.weight_of_the_commodity &&
      product.weight_of_the_commodity.length != 0 ? (
        <div className="flex justify-between">
          <p>Weight of the Commodity</p>
          <div className="font-light">
            {product.weight_of_the_commodity.join(", ")}
          </div>
        </div>
      ) : null}
      {product.active_ingredients ? (
        <div className="flex justify-between">
          <p>Active Ingrediants</p>
          <div className="font-light">{product.active_ingredients}</div>
        </div>
      ) : null}

      {product.dosage_recommended && product.dosage_recommended.length != 0 ? (
        <div className="flex justify-between">
          <p>Recommended Dosage</p>
          <div className="font-light">
            {product.dosage_recommended.join(", ")}
          </div>
        </div>
      ) : null}

      {product.material_used && (
        <div className="flex justify-between">
          <p>Material</p>
          <div className="font-light">{product.material_used}</div>
        </div>
      )}
      {product.mode_of_administration && (
        <div className="flex justify-between">
          <p>Mode of Administration</p>
          <div className="font-light">{product.mode_of_administration}</div>
        </div>
      )}
      {product?.value?.length != 0 && (
        <div className="  mt-2 py-3">
          <div className="text-[20px]">Value of the product</div>
          <p className="lowercase mt-1 text-teal-600 ">
            {product.value.join(", ")}
          </p>
        </div>
      )}
      {product?.caution?.length != 0 && (
        <div className="mt-2 py-2">
          <div>Caution</div>
          <p className="mt-1 text-teal-600 ">{product.caution.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
