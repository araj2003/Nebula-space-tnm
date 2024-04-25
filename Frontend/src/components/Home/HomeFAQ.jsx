import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

export default function HomeFAQ() {
  const faqs = [
    {
      question: "What is SpaceWonders?",
      answer:
        "SpaceWonders is your premier destination for extraordinary space tourism experiences and services. We are dedicated to providing unparalleled adventures beyond Earth's atmosphere, ensuring the utmost satisfaction for our space travelers.",
    },
    {
      question: "What types of experiences does SpaceWonders offer?",
      answer:
        "We offer a diverse range of space tourism experiences, including...",
    },
    {
      question: "Are SpaceWonders experiences safe and reliable?",
      answer:
        "Absolutely. Our experiences undergo meticulous safety protocols and adhere to the highest industry standards. We collaborate with space experts to ensure the safety, authenticity, and reliability of each journey.",
    },
    {
      question:
        "Do I need any special qualifications to participate in SpaceWonders tours?",
      answer:
        "Most of our tours are designed to accommodate space enthusiasts of all backgrounds and experience levels. However, certain experiences may have specific eligibility requirements. Please review the tour descriptions or contact our customer service team for more information.",
    },
    {
      question: "How do I book a space tour with SpaceWonders?",
      answer:
        "Booking a space tour with SpaceWonders is simple and straightforward. Explore our available tours, select your desired itinerary, and follow the booking instructions. If you require assistance, our customer service team is ready to assist you.",
    },
    {
      question: "What payment methods are accepted for space tours?",
      answer:
        "We offer a variety of secure payment options for your convenience, including major credit cards, debit cards, and trusted electronic payment platforms. Your financial security is our priority, and you can choose the payment method that best suits you during the booking process.",
    },
    {
      question: "What is SpaceWonders' cancellation policy?",
      answer:
        "Cancellation policies may vary depending on the specific tour or experience you've booked. Please refer to the tour description or contact our customer service team for detailed cancellation information.",
    },
    {
      question: "How can I contact SpaceWonders' customer support?",
      answer:
        "Our dedicated customer support team is available to assist you with any inquiries or assistance you may need. You can reach us via email, phone, or live chat on our website.",
    },
    {
      question:
        "Thank you for choosing SpaceWonders for your unforgettable space adventures.",
      answer:
        "We're committed to providing you with extraordinary experiences and memories that will last a lifetime.",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-[95%] sm:w-[90%] lg:w-[85%] mx-auto !font-medium">
      <h2 className="text-xl md:text-2xl  text-white">
        Frequently Asked Questions
      </h2>
      {faqs &&
        faqs.map((faq, index) => (
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              "&:before": {
                display: "none",
              },
            }}
            key={index}
            className="!shadow-none !text-white !bg-gray-800 !border-none"
          >
            <AccordionSummary expandIcon={<MdExpandMore className="text-xl scale-x-125"/>}>
              <p className="font-medium">{`${index + 1}. ${
                faq.question
              }`}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>{faq.answer}</p>
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
