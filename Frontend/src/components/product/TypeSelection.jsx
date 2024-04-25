const TypeSelection = ({ types, }) => {
  // Filter out empty strings from the types array
  const nonEmptyTypes = types.filter((type) => type.trim() !== "");

  // Join the nonEmptyTypes array with hyphens
  const typesSeparatedByHyphen = nonEmptyTypes.join(" - ");

  // Check if nonEmptyTypes is empty, and render null if it is
  if (nonEmptyTypes.length === 0) {
    return null;
  }

  return (
    <div className="">
      <div className="flex justify-between gap-5 items-center">
        <h2 >Type</h2>
        <div className=" text-teal-900 capitalize">
          {typesSeparatedByHyphen}
        </div>
      </div>
    </div>
  );
};

export default TypeSelection;
