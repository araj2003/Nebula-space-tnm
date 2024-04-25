import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loadCategoryAction } from "../../actions/categoryAction";
import { clearErrors } from "../../actions/productAction";
import { useGlobalContext } from "../../context/globalcontext";
import "./Filters.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { BsCaretDownFill } from "react-icons/bs";
const MobileFilters = () => {
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error } = useSelector((state) => state.products);
  const { selectedItems, handleItemSelection } = useGlobalContext();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(loadCategoryAction());
  }, [dispatch, error, alert]);

  return (
    <div className="md:hidden  border-b-2 border-zinc-300 py-1 pb-2 h-full ronded flex flex-col items-center mx-4">
      <div className="flex justify-center no-scrollbar gap-4 overflow-x-scroll w-full px-2 ">
        <Accordion
          allowZeroExpanded
          className="border-none flex sm:justify-between no-scrollbar gap-4 overflow-x-scroll w-full px-2 "
        >
          {categories &&
            categories.map((category) => (
              <AccordionItem
                key={category.id}
                uuid={category.id}
                className="border-none"
                defaultExpanded={false}
              >
                <AccordionItemButton className="flex items-center gap-1 min-w-20 whitespace-nowrap border-none">
                  <h2 className="text-sm font-semibold text-zinc-700  ">
                    {category.name}
                  </h2>
                  <BsCaretDownFill className="text-[8px] block text-teal-700 mb-1" />
                </AccordionItemButton>
                <AccordionItemPanel className="px-3 w-[85%] h-60 overflow-scroll border shadow py-1 z-10 fixed bg-white top-[18%] left-[7.5%]">
                  {category.subcategories.map((subcategory) => (
                    <label
                      key={subcategory.id}
                      className="text-[6px] flex items-center mt-2 border-b pb-1 border-gray-300 checkbox style-c"
                    >
                      <input
                        type="checkbox"
                        value={subcategory.id}
                        checked={selectedItems.includes(subcategory.id)}
                        onChange={() => handleItemSelection(subcategory.id)}
                      />
                      <div className="checkbox__checkmark"></div>
                      <span className="ml-2 text-sm text-gray-800 checkbox__body">
                        {subcategory.name}
                      </span>
                    </label>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MobileFilters;
