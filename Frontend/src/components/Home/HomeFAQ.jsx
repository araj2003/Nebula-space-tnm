import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
export default function HomeFAQ() {
  const faqs = [
    {
      question: "What is VetMedMan?",
      answer:
        "Vetmedman, your trusted partner in providing top-quality medical equipment and supplies for veterinary doctors and hospitals. We are passionate about delivering excellence and ensuring customer satisfaction. With a comprehensive range of products, we offer innovative solutions to meet the unique needs of each customer.",
    },
    {
      question: "What types of products does VetMedMan offer?",
      answer:
        "We offer extensive animal health and medical supplies, including...",
    },
    {
      question: "Are VetMedMan products safe and reliable?",
      answer:
        "Absolutely. Our products undergo rigorous quality testing and adhere to the highest industry standards. We collaborate with veterinarians and experts to ensure our offerings' safety, effectiveness, and reliability.",
    },
    {
      question:
        "Do I need a prescription for pharmaceuticals and surgical items?",
      answer:
        "Prescriptions may be required for certain pharmaceutical products as per regulatory guidelines. Surgical items are available for purchase without a prescription. Please review the product descriptions or consult our customer service team for specific details.",
    },
    {
      question: "How do I place an order?",
      answer:
        "Ordering from VetMedMan is convenient and user-friendly. Browse through our categories, add desired items to the cart and the quantity required, and proceed to checkout. If you need assistance, our customer service team is ready to help.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "At VetMedMan, we offer a seamless and secure shopping experience with a variety of payment options, including major credit cards, debit cards, trusted electronic payment platforms (Google Pay, Phonepay), and bank transfers. Your financial security is our priority, and you can choose the payment method that suits you best during checkout.",
    },
    {
      question: "What is VetMedMan's shipping and return policy?",
      answer:
        "Shipping: VetMedMan is committed to timely and reliable shipping. Shipping costs and delivery times may vary based on your location and chosen shipping method. We aim to get your products to you as efficiently as possible. Please refer to the shipping information provided during checkout for specific details.\n\nReturn and Exchange: We stand by the quality of our products. If you're not completely satisfied with your purchase, you may be eligible for a return or exchange. Please review our comprehensive Return and Exchange Policy on our website for detailed instructions and conditions. Your satisfaction is our priority, and we're here to assist you throughout the process.",
    },
    {
      question: "How can I reach VetMedMan's customer support?",
      answer:
        "For any inquiries or assistance, our dedicated customer support team is available via email, phone, or live chat on our website.",
    },
    {
      question:
        "Thank you for choosing VetMedMan as your partner in animal health, pharmaceuticals, and surgical solutions.",
      answer:
        "We're committed to delivering exceptional products and services to ensure the best care for your animals.",
    },
  ];
  return (
    <div className="flex flex-col gap-4 w-[95%] sm:w-[90%] lg:w-[85%] mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-zinc-900">
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
            className="!shadow-none !text-[#4A5568] !border-none"
          >
            <AccordionSummary expandIcon={<MdExpandMore className="text-xl scale-x-125"/>}>
              <p className=" font-semibold ">{`${index + 1}. ${
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
