import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProduct } from "../../actions/productAction";
import { treatmentTypeLoadAction } from "../../actions/categories/treatmentTypeAction";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useGlobalContext } from "../../context/globalcontext";



/**
 * Page component displays a list of animals and their descriptions.
 * @returns {JSX.Element} React component
 */


const PharmaPage = () => {
  const { treatmentType, loading } = useSelector(
    (state) => state.treatmentTypeAll
  );

  const { handleItemSelection } = useGlobalContext();
  const dispatch = useDispatch();
  const { treatment } = useParams();
  const { error } = useSelector((state) => state.products);

  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(treatment));
  }, [dispatch, treatment, error, alert]);

  useEffect(() => {
    dispatch(treatmentTypeLoadAction());
  }, [dispatch]);
  return (
    <div className="w-full py-24 lg:py-7 px-4 md:px-10 lg:px-16 flex flex-col gap-16">
      <section>
        <p className="text-2xl font-semibold text-gray-800 mb-5">
          Pharmaceuticals
        </p>
        {loading ? <Loader /> : <></>}
        <div className="flex w-full gap-[18px] md:gap-7 lg:gap-[22px]   flex-wrap">
          {treatmentType &&
            treatmentType.map((treatment, index) => (
              <Link
                to={`/products`}
                key={index}
                className="flex flex-col items-center hover:scale-105 duration-300 w-[90px] lg:w-[150px] "
                onClick={() => handleItemSelection(treatment._id)}
              >
                <div
                  className="aspect-square h-[75px] md:h-[95px] lg:h-[150px] border rounded-2xl bg-cover"
                  style={{
                    backgroundImage: `url(${treatment.imageUrl})`,
                  }}
                ></div>
                <p className="text-sm lg:text-base mt-2 md:my-4 text-center ">
                  {treatment.subCategoryName}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section className="px-3 pb-10 md:text-[18px]">
      <p className="text-[20px] mb-5 font-semibold">
          Description
        </p>
        <article className="flex flex-col gap-8">
          <p>
            Welcome to our extensive range of products for the medical care of
            pets and animals. We take pride in offering a comprehensive
            selection designed to address a wide range of healthcare needs.
            Space Wonders is your reliable source for a wide range of medical care
            products designed specifically for the well-being of your beloved
            pets.
          </p>
          <p>
            {" "}
            We understand that providing exceptional care for your pet
            companions is a top priority, and we are here to support you with
            our carefully curated selection of veterinary products.At Space Wonders,
            we strive to offer only the highest quality medical care products.
            Our product range encompasses various categories to address the
            diverse healthcare needs of pets:
          </p>
          {/* <p>
            <p className="font-bold mb-1">1. Antibiotics - Antimicrobials:</p>
            Experience the efficacy and healing power of our meticulously
            formulated antibiotics and antimicrobials. Designed specifically to
            combat bacterial infections, these products offer a comprehensive
            approach to promoting healthy recovery in your pets. With a focus on
            safety and effectiveness, our range of antibiotics and
            antimicrobials ensures that your beloved companions receive the
            highest standard of care. Trust in our expertise to provide reliable
            solutions for combating bacterial infections and facilitating a
            swift return to optimal health.
          </p>
          <p>
            <p className="font-bold mb-1">2. Antifungals:</p>
            Discover the restorative properties of our specially designed
            antifungal products, crafted to treat fungal infections in pets.
            With a focus on efficacy and healing, our antifungal range offers
            effective relief and aids in the restoration of skin and coat
            health. Whether it's addressing common fungal conditions or more
            persistent infections, our products are formulated to combat fungal
            pathogens and promote a swift recovery. Experience the
            transformative power of our antifungal solutions as they provide
            targeted relief and help restore your pets' skin and coat to their
            optimal condition..
          </p>
          <p>
            <p className="font-bold mb-1">3. Anti-Allergic: </p>
            Relieve the discomfort caused by allergies with our specialized
            anti-allergic medications, meticulously formulated to address
            allergic reactions in pets. We understand the challenges posed by
            allergic conditions, and our anti-allergic products are designed to
            provide effective relief. By targeting the underlying mechanisms of
            allergic reactions, our medications help alleviate itching,
            inflammation, and other symptoms associated with allergies. Trust in
            our dedicated approach to provide your pets with the much-needed
            comfort and relief they deserve. Experience the transformative
            effects of our anti-allergic medications as they address allergic
            reactions and enhance the well-being of your beloved companions..
          </p>
          <p>
            <p className="font-bold mb-1">4. Antiviral :</p>Harness the power of
            our specialized antiviral medications, meticulously designed to
            combat viral infections and provide crucial support to your pet's
            immune system. Viral infections can pose significant health risks to
            our pet companions, and our antiviral products are formulated to
            address these challenges head-on
          </p>
          <p>
            <p className="font-bold mb-1">5. Anti-inflammatory drugs:</p>
            Enhance your pet's comfort and mobility with our carefully selected
            range of anti-inflammatory drugs. Designed to reduce pain,
            inflammation, and swelling, these medications provide much-needed
            relief for your beloved companions. Whether your pet is experiencing
            joint stiffness, post-operative discomfort, or inflammatory
            conditions, our anti-inflammatory drugs are formulated to alleviate
            symptoms and improve their overall well-being.
          </p>
          <p>
            <p className="font-bold mb-1">6. Nutritional Supplements:</p>
            We understand that pets may require rehabilitation and therapy after
            surgeries, injuries, or to manage chronic conditions. Our dedicated
            team offers a range of therapeutic services, including
            physiotherapy, hydrotherapy, and acupuncture, to aid in your pet's
            recovery and improve their mobility and quality of life.
          </p>
          <p>
            <p className="font-bold mb-1">7. Vaccines: </p>
            Safeguard your pet against infectious diseases with our reliable and
            trusted vaccines. We understand the importance of proactive
            prevention in maintaining their health, and our range of vaccines is
            meticulously formulated to provide effective protection. By
            stimulating the immune system, our vaccines help prime your pet's
            defenses against common and potentially harmful diseases. With a
            focus on safety and efficacy, our vaccines are administered by
            trained professionals who prioritize your pet's well-being.
          </p>
          <p>
            <p className="font-bold mb-1">8. Dewormers & Parasitic Control: </p>
            Maintain the well-being of your pets by keeping them free from the
            burdens of internal and external parasites. Our range of dewormers
            and parasitic control products is specifically designed to
            effectively eliminate and prevent parasitic infestations. Whether
            it's intestinal worms, fleas, ticks, or other pesky pests, our
            products offer reliable solutions for parasite control. We
            prioritize the safety and comfort of your pets, ensuring that our
            dewormers and parasitic control products are both effective and
            gentle.
          </p>
          <p>
            <p className="font-bold mb-1">9. Antiprotozoal: </p>
            Engage in the battle against protozoal infections with our
            specialized antiprotozoal medications, meticulously crafted to
            address conditions such as giardiasis and coccidiosis. We recognize
            the profound impact of these infections and are committed to
            providing effective treatment options. O With a steadfast dedication
            to delivering excellence, we strive to provide renewed hope and
            well-being for your beloved pets
          </p>
          <p>
            <p className="font-bold mb-1">10. Antineoplastic drugs:</p>
            During the challenging battle against cancer, find solace in our
            specialized antineoplastic drugs. Carefully formulated to assist in
            the treatment of this formidable disease, our medications offer
            support and hope during this difficult time.
          </p>
          <p>
            <p className="font-bold mb-1">11. Digestive Care: </p>
            Nurture a healthy digestive system with our comprehensive range of
            digestive care products, meticulously curated to address
            gastrointestinal issues and promote optimal digestive health. We
            understand the vital role that digestion plays in your pet's overall
            well-being, and our digestive care products are specifically
            formulated to support a healthy digestive system. From addressing
            digestive disturbances to promoting nutrient absorption, our range
            of products aids in improving digestive function and maintaining
            gastrointestinal balance.
          </p>
          <p>
            <p className="font-bold mb-1">12. Musculoskeletal Care: </p>
            Empower your pet's musculoskeletal health with our range of
            specialized products, thoughtfully designed to provide comprehensive
            support. From joint supplements to mobility aids, we prioritize the
            well-being of their musculoskeletal system. Our joint supplements
            are formulated to nourish and maintain healthy joint function,
            promoting flexibility and mobility. Additionally, our selection of
            mobility aids helps to improve their comfort and stability, ensuring
            an active and fulfilling life.
          </p>

          <p>
            <p className="font-bold mb-1">13. Respiratory Care: </p>Address
            respiratory conditions and provide much-needed relief for
            respiratory distress with our comprehensive range of respiratory
            care products. We understand the importance of a healthy respiratory
            system for your pets' overall well-being, and our specialized
            products are designed to support respiratory health. Whether it's
            managing chronic respiratory conditions or addressing acute
            respiratory distress, our carefully curated selection offers
            solutions that promote clear airways, ease breathing, and alleviate
            discomfort.
          </p>
          <p>
            <p className="font-bold mb-1">14. Dermatological Care:</p>Experience
            the transformative power of our specialized dermatological care
            products, meticulously crafted to treat and manage a wide range of
            dermatological conditions, skin infections, and allergies. We
            understand the significance of maintaining healthy skin and coat for
            your pets' overall well-being. Our dermatological care products
            offer targeted solutions to address various skin concerns, providing
            relief from itching, inflammation, and discomfort. From soothing
            shampoos and conditioners to medicated creams and sprays, our
            products are designed to nourish, heal, and protect the skin
          </p>
          <p>
            <p className="font-bold mb-1">15. Cardiovascular Care: </p>Support
            the cardiovascular health of your pets with our comprehensive range
            of medications tailored specifically for cardiovascular care. We
            understand the vital importance of a healthy heart in maintaining
            overall well-being. Our medications are meticulously formulated to
            address cardiovascular conditions and support optimal heart
            function. Whether managing heart disease, regulating blood pressure,
            or supporting cardiac health, our cardiovascular care products are
            designed to provide effective treatment and promote a robust
            cardiovascular system.
          </p>
          <p>
            <p className="font-bold mb-1">16. Central Nervous System: </p>
            Experience the remarkable effects of our specialized medications for
            the central nervous system, meticulously crafted to address
            neurological conditions and provide vital support to the nervous
            system. We understand the complexity of neurological health and its
            impact on your pets' overall well-being. Our medications are
            specifically formulated to target neurological disorders, such as
            seizures, nerve-related pain, and behavioral abnormalities, to
            provide relief and promote a balanced nervous system.
          </p>
          <p>
            <p className="font-bold mb-1">17. Urogenital System: </p>Effectively
            manage urinary and reproductive system disorders with our
            specialized medications, meticulously formulated for comprehensive
            urogenital care. We understand the significance of maintaining the
            health and functionality of the urogenital system in your pets'
            overall well-being. Our medications are designed to address
            conditions such as urinary tract infections, bladder disorders, and
            reproductive system abnormalities. With a focus on efficacy and
            gentle treatment, our urogenital care products provide targeted
            solutions to promote urinary and reproductive health
          </p>
          <p>
            <p className="font-bold mb-1">18. First Aid Kit - Bandages: </p>
            Ensure preparedness for emergencies with our comprehensive first aid
            kits, thoughtfully curated to provide essential supplies, including
            bandages and other vital components. We understand the importance of
            prompt and effective first aid in maintaining the well-being of your
            pets. Our first aid kits are designed to equip you with the
            necessary tools to handle minor injuries, wounds, and unexpected
            situations. With a focus on convenience and reliability, our kits
            include a range of bandages, antiseptics, wound dressings, and other
            essential supplies to address various injuries and emergencies.
          </p>
          <p>
            <p className="font-bold mb-1">19. Infusion Fluids: </p> Administer
            fluids intravenously with confidence using our range of specialized
            infusion fluids. We understand the critical role that proper
            hydration plays in the well-being and recovery of your pets. Our
            infusion fluids are meticulously formulated to provide essential
            hydration and support during medical treatments. Whether it's for
            rehydration, medication administration, or other medical procedures,
            our infusion fluids offer the necessary balance of electrolytes and
            fluids to promote optimal health.
          </p>
          <p>
            <p className="font-bold mb-1">20. Intrammamary Drugs:</p>{" "}
            Effectively address udder infections and mastitis in lactating
            animals with our specialized intramammary medications. We recognize
            the challenges faced by lactating animals and the importance of
            their udder health. Our intramammary drugs are specifically
            formulated to target and treat udder infections, providing relief
            and promoting healing. With a focus on safety and efficacy, our
            medications help restore mammary health, ensuring the well-being of
            both the lactating animals and their offspring.
          </p>
          <p>
            <p className="font-bold mb-1">21. Drugs for Eye and Ear:</p>{" "}
            Experience the transformative effects of our specialized medications
            designed to treat eye and ear infections, promoting optimal health
            for your pets' precious sensory organs. We understand the importance
            of maintaining clear vision and healthy ears for your beloved
            companions. Our medications are meticulously formulated to target
            and address common eye and ear conditions, such as infections and
            inflammations. With a focus on efficacy and gentle treatment, our
            eye and ear care products provide relief, reduce discomfort, and
            promote a speedy recovery.
          </p>
          <p>
            <p className="font-bold mb-1">22. Antidotes</p> Ensure the safety
            and well-being of your pets by being prepared with our comprehensive
            range of antidotes, specifically formulated to counteract specific
            toxicities and poisonings. We understand the potential risks and
            dangers that certain substances may pose to your beloved companions.
            Our antidotes are meticulously crafted to provide rapid and
            effective intervention in case of accidental ingestion or exposure
            to toxins. With a focus on prompt action and reliable outcomes, our
            antidotes offer a vital line of defense against potential
            emergencies.
          </p>
          <p>
            <p className="font-bold mb-1">23. Behavioral Medications:</p>
            Effectively manage behavioral issues and promote balanced behavior
            in your pets with our specialized range of behavioral medications.
            We understand the challenges that behavioral issues can present and
            the impact they can have on the overall well-being of your beloved
            companions. Our medications are meticulously formulated to address
            specific behavioral concerns, promoting calmness, reducing anxiety,
            and fostering a balanced temperament. With a focus on efficacy and
            gentle treatment, our behavioral medications offer targeted
            solutions to help your pets lead happier and more harmonious lives
          </p>
          <p>
            <p className="font-bold mb-1">24. Foot and Mouth Disease:</p>
            Safeguard your valuable livestock against the highly contagious Foot
            and Mouth Disease with our specialized products designed for
            prevention and treatment. We understand the significant impact this
            viral infection can have on your livestock's health and economic
            well-being. Our products are meticulously formulated to provide
            effective protection, offering preventive measures to minimize the
            risk of infection and targeted treatments to aid in recovery. With a
            focus on biosecurity and disease management, our Foot and Mouth
            Disease products provide peace of mind and support for livestock
            owners
          </p>
          <p>
            Each category contains a range of products meticulously selected to
            ensure effectiveness, safety, and optimal care for your pets and
            animals. Consult with your veterinarian to determine the most
            suitable products for your pet's specific needs. We are committed to
            providing exceptional medical care solutions for the well-being of
            your beloved companions.
          </p> */}
        </article>
      </section>
    </div>
  );
};

export default PharmaPage;
