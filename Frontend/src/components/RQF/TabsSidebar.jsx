import { useState } from "react";
import { MdAdd } from "react-icons/md";
// Make sure to adjust the import path based on your project structure
import { RiMessage2Fill } from "react-icons/ri";
import { GrCatalog } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const FAB = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const actions = [
    {
      label: "RFQ",
      icon: (
        <div className="aspect-square h-6 grid place-content-center text-lg font-semibold text-teal-700">
          RFQ
        </div>
      ),
      onClick: () => navigate("/rfq"),
    },
    {
      label: "Leave A Message",
      icon: <RiMessage2Fill className="text-teal-600" />,
      onClick: () => navigate("/contactus"),
    },
    {
      label: "Request for Catalogue",
      icon: <GrCatalog />,
      onClick: () => navigate("/requestcatalogue"),
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ul
      className={`fab-container flex flex-col-reverse fixed right-[2rem] bottom-[2rem] max-h-[52px] z-50 ${open ? "open" : ""}`}
      onClick={handleClick}
      // onMouseLeave={() => setOpen(false)}
    >
      <li className="fab-button rounded-full flex items-center justify-center my-2 text-2xl p-[18px] relative cursor-pointer">
        <MdAdd />
      </li>
      {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={`fab-action ${open ? "open" : ""} border shadow bg-white  rounded-full flex items-center justify-center my-2 text-2xl p-[18px] relative cursor-pointer`}
          key={action.label}
          onClick={action.onClick}
        >
          {action.icon}
          <span className="tooltip text-xs lg:text-sm">{action.label}</span>
        </li>
      ))}
      <style>
        {`
          .fab-container.open {
            max-height: max-content;
          }
          
          
          
          .fab-container .fab-button {
            background-color: rgb(13 148 136);
          }
          
          .fab-container .fab-button svg {
            fill: white;
          }
          
          .fab-container .fab-action {
            transform: translateY(50px) scale(0);
            transition: transform 300ms, opacity 300ms;
            opacity: 0;
          }
          
          .fab-container .fab-action:hover .tooltip {
            transform: translateX(-100%) scale(1);
            
            opacity: 1;
          }
          
          .fab-container .fab-action.open {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          
          .fab-container .fab-action .tooltip {
            width:120px;
            padding: 4px 6px;
            // font-size: 14px;
            text-align: center;
            font-weight: 600;
            position: absolute;
            left: -12px;
            transform: translateX(-75%);
            background-color: #019B98;
            border-radius: 4px;
            color: white;
            opacity: 0;
            transition: transform 300ms, opacity 300ms;
            user-select: none;
          }
          `}
      </style>
    </ul>
  );
};

export default FAB;
