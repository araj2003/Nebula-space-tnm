import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { dailyEssentialsTypeLoadAction } from "../../actions/categories/dailyEssentialTypeAction";
import Loader from "../layout/Loader/Loader";
import { useGlobalContext } from "../../context/globalcontext";

/**
 * Page component displays a list of animals and their descriptions.
 * @returns {JSX.Element} React component
 */

const IndustryData = [
  {
    name: "B2B Distributor",
    imgUrl:
      "https://img.freepik.com/free-vector/gradient-b2b-illustration_23-2149322240.jpg",
  },
  {
    name: "Private Companies",
    imgUrl:
      "https://img.freepik.com/free-vector/two-business-partners-handshaking_74855-6685.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704067200&semt=ais",
  },
  {
    name: "Pet Owners",
    imgUrl:
      "https://img.freepik.com/free-photo/love-man-standing-park-hugging-his-dog_259150-57187.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais",
  },
  {
    name: "Farmers",
    imgUrl:
      "https://img.freepik.com/free-photo/young-farmer-taking-care-his-business_329181-15967.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais",
  },
  {
    name: "Veterinary Clinics",
    imgUrl:
      "https://img.freepik.com/free-photo/close-up-veterinarian-taking-care-dog_23-2149100223.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705190400&semt=ais",
  },
  {
    name: "Veterinary Hospitals",
    imgUrl:
      "https://img.freepik.com/premium-photo/talking-dog-dark-haired-vet-wearing-gloves-talking-cute-white-dog-during-examination_259150-2479.jpg",
  },
  {
    name: "Veterinary Colleges",
    imgUrl:
      "https://img.freepik.com/free-vector/veterinary-concept-illustration_114360-3007.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705363200&semt=sph",
  },
  {
    name: "Cat Breeders",
    imgUrl:
      "https://img.freepik.com/free-vector/hand-drawn-cat-breed-pack_23-2147536789.jpg",
  },
  {
    name: "Dog Breeders",
    imgUrl:
      "https://img.freepik.com/free-vector/cute-australian-shepherd_138676-2071.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705536000&semt=sph",
  },
  {
    name: "Cattle Farms",
    imgUrl:
      "https://img.freepik.com/free-vector/flat-farm-landscape_23-2148187645.jpg",
  },
  {
    name: "Dairy",
    imgUrl:
      "https://img.freepik.com/premium-photo/dairy-products-collection-green-light-background_488220-55599.jpg",
  },
  {
    name: "Buffaloe Farms",
    imgUrl:
      "https://img.freepik.com/free-photo/cows-grazing-around-farm_23-2150454910.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704585600&semt=ais",
  },
  {
    name: "Goat Farms",
    imgUrl:
      "https://img.freepik.com/free-vector/empty-banner-template-with-farm-animals_1308-108462.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699488000&semt=ais",
  },
  {
    name: "Sheep Farms",
    imgUrl:
      "https://img.freepik.com/free-vector/farm-with-red-barn-windmill-scene_1308-52759.jpg",
  },
  {
    name: "Horse Stables",
    imgUrl:
      "https://img.freepik.com/free-vector/trotter-stall-flat-composition_1284-21031.jpg",
  },
  {
    name: "Camel Farms",
    imgUrl:
      "https://www.shutterstock.com/image-photo/camel-farm-abu-dhabi-desert-600nw-2252167437.jpg",
  },
  {
    name: "Rabbitery",
    imgUrl:
      "https://img.freepik.com/free-photo/rural-life-lifestyle-growing-rabbits_23-2149232290.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais",
  },
  {
    name: "Poultry Farms",
    imgUrl:
      "https://img.freepik.com/free-photo/brown-chickens-farm_335224-1154.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1700784000&semt=ais",
  },
  {
    name: "Beekeeping Farms",
    imgUrl:
      "https://img.freepik.com/free-photo/view-beekeeper-collecting-honey-beeswax_181624-40252.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705104000&semt=ais",
  },
  {
    name: "Fish Farms",
    imgUrl:
      "https://img.freepik.com/premium-photo/fish-farm-located-thai-country_38678-2628.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704585600&semt=ais",
  },
  {
    name: "Exotic Birds",
    imgUrl:
      "https://img.freepik.com/free-photo/group-colorful-birds-are-flying-formation-with-one-being-flown-by-another_188544-8130.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705276800&semt=ais",
  },
  {
    name: "Exotic Pets",
    imgUrl:
      "https://img.freepik.com/free-photo/amazing-ants-carry-fruit-heavier-than-their-bodies-amazing-strong-ant_488145-2669.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais",
  },
  {
    name: "Pet Shops",
    imgUrl:
      "https://img.freepik.com/free-photo/cute-dog-with-owner-pet-shop_23-2148872549.jpg",
  },
  {
    name: "Artificial Insemination Centre",
    imgUrl:
      "https://img.freepik.com/free-photo/beautiful-fertility-concept-3d-rendering_23-2149230688.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702944000&semt=ais",
  },
  {
    name: "Animal Rescue Centre",
    imgUrl:
      "https://img.freepik.com/free-vector/animal-shelter-concept-illustration_114360-2838.jpg",
  },
  {
    name: "Animal Rehabilitation Centre",
    imgUrl:
      "https://img.freepik.com/free-photo/man-outdoors-dog-training-session-with-two-dogs_23-2149448208.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1700870400&semt=ais",
  },
  {
    name: "Dairy Plants",
    imgUrl:
      "https://img.freepik.com/free-vector/milk-factory-concept-illustration_114360-15224.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704412800&semt=ais",
  },
  {
    name: "Animal Research Lab",
    imgUrl:
      "https://img.freepik.com/free-vector/breast-cancer-research-concept-illustration_114360-7138.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705449600&semt=ais",
  },
  {
    name: "Frozen Semen Station",
    imgUrl:
      "https://img.freepik.com/premium-vector/vector-isolated-illustration-sperm-donation-sperm-freezing-artificial-insemination_574777-570.jpg?w=2000",
  },
  {
    name: "Zoo",
    imgUrl:
      "https://img.freepik.com/free-vector/zoo-concept-illustration_114360-6577.jpg",
  },
  {
    name: "Wildlife Sanctuaries",
    imgUrl:
      "https://img.freepik.com/free-vector/green-silhouette-wild-animals_1308-121047.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703980800&semt=ais",
  },
  {
    name: "Animal Embryo Labs",
    imgUrl:
      "https://img.freepik.com/premium-photo/3d-animal-embryo-black-bg-wild-animals-concept-protection-environment-title-text-presentation-3d-animation_847423-5145.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696982400&semt=sph",
  },
  {
    name: "Animal Husbandry",
    imgUrl:
      "https://img.freepik.com/free-vector/farm-animals-concept-illustration_114360-9900.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705536000&semt=ais",
  },
  {
    name: "Pig Farms",
    imgUrl:
      "https://img.freepik.com/free-photo/middle-aged-farmer-cleaning-pig-farm_342744-348.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais",
  },
];

const IndustryPage = () => {
  return (
    <div className="w-full py-24 lg:py-7 px-4 md:px-10 lg:px-16 flex flex-col gap-16">
      <section>
        <p className="text-2xl font-semibold text-gray-800 mb-5">
          Daily Needs & Essentials
        </p>
        <div className="grid grid-cols-5 xl:grid-cols-7 w-full gap-3 md:gap-7 lg:gap-[22px]">
          {IndustryData.map((industry, index) => (
            <Link
              to={`/${industry.name.toLowerCase().split(" ").join("-")}`}
              key={industry.name}
              className="flex flex-col items-center hover:scale-105 duration-300 w-[90px] lg:w-[150px] "
            >
              <div
                className="aspect-square h-[75px] md:h-[95px] lg:h-[150px] border rounded-2xl bg-cover  bg-center bg-white"
                style={{
                  backgroundImage: `url(${industry.imgUrl})`,
                }}
              ></div>
              <p className="text-sm lg:text-base mt-2 text-center">
                {industry.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndustryPage;
