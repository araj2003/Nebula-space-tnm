import React from "react";

const SpecificFeatures = ({ features }) => {
  // console.log(features);
  return (
    <div className="flex flex-col gap-4  border-t-2 py-5">
      <h2 className="text-xl md:text-2xl font-medium text-zinc-900">
        Specific Features
      </h2>
      <ul className=" pl-5 grid grid-cols-2 gap-4 text-zinc-800">
      {features.map((feature, index) => (
        <li className="list-disc ml-2" key={`${index}features`}>
          {feature}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default SpecificFeatures;
