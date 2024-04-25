import React from 'react';

const ShippingReturn = () => {
  return (
    <div className='px-7 md:px-14 pt-24 pb-5 lg:py-6 min-h-[65vh]'>
      <div className="flex flex-col gap-4 mb-5">
        <h2 className="text-xl my-3 md:text-3xl font-bold w-full underline">Return Policy</h2>
        <p>
          At VetMedMan, we value your satisfaction and strive to provide the best possible experience with our products. If you're not completely satisfied with your purchase, we offer a straightforward and customer-friendly return policy.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Eligibility and Conditions:</h3>
        <ul>
          <li>Returns are accepted within [X] days from the date of purchase.</li>
          <li>Products must be in their original, unopened, and unused condition to be eligible for a return.</li>
          <li>Prescription pharmaceuticals, personalized items, and certain perishable products may not be eligible for return due to health and safety reasons.</li>
        </ul>

        <h3 className="text-lg md:text-xl font-bold mt-2">How to Initiate a Return:</h3>
        <ol>
          <li>Contact our customer support team via [email/phone/live chat] to initiate the return process. Please provide your order details and reason for the return.</li>
          <li>Our customer support team will guide you through the necessary steps and provide you with a Return Authorization (RA) number.</li>
          <li>Package the item securely, including all original packaging and documentation, and clearly mark the RA number on the outside of the package.</li>
        </ol>

        <h3 className="text-lg md:text-xl font-bold mt-2">Return Shipping:</h3>
        <p>
          You are responsible for the cost of return shipping, unless the return is due to an error on our part. We recommend using a trackable shipping method and retaining the tracking number for your records.
        </p>

        <h3 className="text-lg md:text-xl font-bold mt-2">Refund Process:</h3>
        <p>
          Once we receive and inspect the returned item, we will process your refund or exchange within [X] business days. Refunds will be issued to the original payment method used for the purchase.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Exchanges:</h3>
        <p>
          If you'd like to exchange a product for a different size or variant, please indicate this when contacting our customer support team. Exchanges are subject to availability.
        </p>

        <h2 className="text-xl my-3 md:text-3xl font-bold w-full mt-6 underline">Shipping Policy</h2>
        <p>
          VetMedMan is committed to ensuring a seamless and efficient shipping experience for our valued customers. We strive to get your products to you in a timely manner while maintaining the highest level of care and security.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Shipping Options:</h3>
        <p>
          We offer a range of shipping options to accommodate your preferences and needs. During the checkout process, you'll be able to select the shipping method that best suits you. Shipping costs may vary based on your location, the size and weight of your order, and the chosen shipping method.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Order Processing:</h3>
        <p>
          Once your order is placed and payment is successfully processed, our team will promptly initiate the order processing. Orders typically ship within [X] business days from the date of purchase. Please note that processing times may vary during peak seasons or special promotions.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Delivery Times:</h3>
        <p>
          Estimated delivery times depend on your location and the chosen shipping method. You will receive a confirmation email with tracking information once your order is shipped. Please note that unforeseen circumstances, such as weather events or transportation delays, may impact delivery times.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">International Shipping:</h3>
        <p>
          We offer international shipping to many countries, allowing customers around the world to access our products and services. Shipping times and costs may vary for international orders.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Tracking Your Order:</h3>
        <p>
          To keep you informed, we provide tracking information for all shipped orders. You can track the progress of your package using the provided tracking number.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Shipping Charges:</h3>
        <p>
          Shipping charges are calculated based on your order's weight, dimensions, shipping destination, and chosen shipping method. The exact charges will be displayed during the checkout process.
        </p>

        <h3 className="text-lg md:text-xl font-bold ">Undeliverable Packages:</h3>
        <p>
          In the event that a package is returned to us due to an incorrect address or other delivery issues, we will contact you to arrange for reshipment. Additional shipping charges may apply.
        </p>

        <p>
          Should you have any questions or require assistance, our dedicated customer support team is ready to assist you. Thank you for choosing VetMedMan for your animal health and wellness needs. Your satisfaction is our priority, and we're here to provide you with a smooth and reliable shopping experience.
        </p>
      </div>
    </div>
  )
}

export default ShippingReturn;
