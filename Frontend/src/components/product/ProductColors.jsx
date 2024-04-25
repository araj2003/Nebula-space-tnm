const ProductColors = ({ colors, selectedColor, setSelectedColor }) => {
  const nonEmptyColors = colors.filter((color) => color.trim() !== "");

  const handleColorChange = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  if (nonEmptyColors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[50px]">
      <div className="flex gap-2 md:gap-5 items-center">
        {" "}
        <h2 className="text-[22px] whitespace-nowrap">Colors : </h2>
        <ul className=" gap-6 flex text-sm flex-wrap">
          {nonEmptyColors.map((color, index) => (
            <li key={index}>
              <label
                className={`capitalize inline-flex items-center justify-between w-full py-[10px] px-4 rounded-3xl text-black border border-black cursor-pointer ${
                  selectedColor === color
                    ? "text-white bg-teal-600 border-teal-600"
                    : ""
                }`}
                onClick={() => handleColorChange(color)}
              >
                <div className="block w-full">
                  <div className="w-full text-center">{color}</div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductColors;
