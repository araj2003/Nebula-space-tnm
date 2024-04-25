import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";

export default function FAQ({ faqs }) {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-[95%] border-t-2 py-5">
      <h2 className="text-xl md:text-2xl font-medium text-zinc-900">FAQ's</h2>
      {faqs &&
        faqs.map((faq) => (
          <Accordion key={faq._id}
          disableGutters
            elevation={0}
            sx={{
              "&:before": {
                display: "none",
              },
            }}
            className="!shadow-none !text-[#4A5568] !border-none" >
            <AccordionSummary
              aria-controls={`panel${faq._id}-content`}
              id={`panel${faq.id}-header`}
              expandIcon={<MdExpandMore className="text-xl scale-x-125"/>}
            >
              <p className="text-[14px] font-semibold">Q{faq.question}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-sm">{faq.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      <style>
        {`
        .MuiButtonBase-root{
          padding :0 8px !important;
        }
        `}
      </style>
    </div>
  );
}
