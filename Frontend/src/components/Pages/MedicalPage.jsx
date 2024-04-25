import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Link, useParams } from "react-router-dom";

import { medicalCareTypeLoadAction } from "../../actions/categories/medicalCareTypeAction";
import Loader from "../layout/Loader/Loader";
import { useGlobalContext } from "../../context/globalcontext";



/**
 * Page component displays a list of animals and their descriptions.
 * @returns {JSX.Element} React component
 */


const MedicalPage = () => {
  const { MedicalCareType, loading } = useSelector(
    (state) => state.medicalCareTypeAll
  );
  const dispatch = useDispatch();
  const { medical } = useParams();
  const { error } = useSelector((state) => state.products);

  const { handleItemSelection } = useGlobalContext();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(medical));
  }, [dispatch, medical, error, alert]);

  useEffect(() => {
    dispatch(medicalCareTypeLoadAction());
  }, [dispatch]);
  return (
    <div className="w-full py-24 lg:py-7 px-5 md:px-10 lg:px-16 flex flex-col gap-16">
      <section>
        <p className="text-2xl font-semibold text-gray-800 mb-5">Surgicals</p>
        {loading ? <Loader /> : <></>}
        <div className="flex w-full gap-[18px] md:gap-7  lg:gap-[22px]   flex-wrap">
          {MedicalCareType &&
            MedicalCareType.map((medical, index) => (
              <Link
                to={`/products`}
                key={index}
                className="flex flex-col items-center hover:scale-105 duration-300 w-[80px] lg:w-[150px] "
                onClick={() => handleItemSelection(medical._id)}
              >
                <div
                  className="aspect-square h-[75px] md:h-[95px] lg:h-[150px] border rounded-2xl bg-cover"
                  style={{
                    backgroundImage: `url(${medical.imageUrl})`,
                  }}
                ></div>
                <p className="text-sm lg:text-base my-4 text-center">
                  {medical.subCategoryName}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section className=" pb-10">
        <p className="text-[20px] mb-5 font-semibold">
          Description
        </p>
        <article className="flex flex-col gap-8 md:text-lg">
          <p>
          Welcome to our extensive collection of surgical supplies and equipment, where we cater to the diverse needs of veterinary clinics and hospitals. Our goal is to provide you with the necessary tools to deliver exceptional medical care to your animal patients.We strive to provide you with the highest quality hospital supplies and equipment to meet your veterinary practice's unique needs. Our knowledgeable team is available to assist you in selecting the right products and ensuring your satisfaction. Trust in our commitment to delivering reliable and effective solutions as we support you in providing exceptional veterinary care.
          </p>

          {/* <p>
            Reproductive Supplies: Explore our range of reproductive supplies
            designed to support reproductive health and breeding programs. From
            semen collection to artificial insemination tools. We offer a
            comprehensive selection to assist in reproductive management.
          </p>

          <p>
            Disposables: Ensure convenience and hygiene with our range of
            disposable supplies. This category includes items such as disposable
            gloves, masks, gowns, drapes, and single-use instruments, promoting
            infection control and minimizing the risk of cross-contamination.
          </p>

          <p>
            Surgical Equipment: Discover our wide array of surgical equipment,
            meticulously crafted to meet the demands of veterinary surgeries.
            From surgical instruments, including scalpels, forceps, and
            retractors, to specialized equipment, we provide the tools you need
            to perform precise and successful surgical procedures.
          </p>

          <p>
            Syringes and Needles: Choose from our assortment of syringes and
            needles, available in various sizes and gauges. These high-quality,
            sterile products ensure accurate medication administration and
            comfortable injections, allowing for efficient treatment delivery.
          </p>

          <p>
            Clinic Equipment - Hospital Furniture: Create a comfortable and
            functional environment for your patients with our clinic equipment
            and hospital furniture. We offer a range of examination tables,
            treatment carts, cages, and other furniture designed to enhance
            patient care and streamline workflows.
          </p>

          <p>
            Security and Safety - Personal Protection Gear: Prioritize the
            safety of your staff with our selection of personal protective
            equipment (PPE). This includes gloves, masks, goggles, and other
            protective gear to safeguard against potential hazards in the
            veterinary setting.
          </p>

          <p>
            Laboratory Equipment: Enhance your diagnostic capabilities with our
            laboratory equipment. From microscopes and centrifuges to analyzers
            and incubators, our laboratory supplies support accurate and
            efficient diagnostic testing, aiding in diagnosing and monitoring
            various conditions.
          </p>

          <p>
            Operation Theatre Supplies: Equip your operation theatre with our
            range of essential supplies, including surgical drapes, gowns,
            surgical masks, and sterile packs. These supplies maintain a sterile
            environment, ensuring optimal surgical outcomes and reducing the
            risk of surgical site infections.
          </p>

          <p>
            Diagnostic Instruments: Explore our range of diagnostic instruments,
            including stethoscopes, otoscopes, ophthalmoscopes, and
            thermometers. These tools facilitate accurate assessments and aid in
            the diagnosis of medical conditions in animals.
          </p>

          <p>
            Study Instrument Supplies: Enhance your educational and research
            endeavors with our study instrument supplies. This category includes
            dissection kits to support learning and experimentation.
          </p>

          <p>
            We strive to provide you with the highest quality hospital supplies
            and equipment to meet your veterinary practice's unique needs. Our
            knowledgeable team is available to assist you in selecting the right
            products and ensuring your satisfaction. Trust in our commitment to
            delivering reliable and effective solutions as we support you in
            providing exceptional veterinary care.
          </p> */}
        </article>
      </section>
    </div>
  );
};

export default MedicalPage;
