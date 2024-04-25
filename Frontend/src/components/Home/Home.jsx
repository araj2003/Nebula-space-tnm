import MetaData from "../MetaData";
import HomeHero from "./HomeHero.jsx";
import Ads from "./Ads.jsx";
import OurCategories from "./OurCategories.jsx";
import IndustryAnimals from "./IndustryAnimals.jsx";
import About from "./About.jsx";
import PopularProduct from "./PopularProduct.jsx";
import Articles from "./Articles.jsx";
import HomeFAQ from "./HomeFAQ.jsx";
import Testimonials from "./Testimonials.jsx";
import FeaturedProducts from "./FeaturedProducts.jsx";
import axios from "axios";
import { API_URL } from "../../api.jsx";
import { useEffect, useState } from "react";
import { ScrollRestoration } from "react-router-dom";
/**
 * Home component represents the home page of the application.
 *
 * @component
 * @returns {JSX.Element} - The Home component.
 */

const Home = () => {
  const [products, setProducts] = useState([]);
  const featured = products.filter(
    (product) => product.onHomepage === "featured"
  );
  const recommended = products.filter(
    (product) => product.onHomepage === "recommended"
  );
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/onHomepage`);
      if (res.data.success) {
        // console.log(res.data.products);
        setProducts(res.data.products);
        return;
      }
      throw new Error(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section id="home" className="pt-24 lg:pt-0 flex flex-col gap-8 pb-10">
      <ScrollRestoration />
      <MetaData title="VetMedMan" />
      <HomeHero />
      <Ads />
      <OurCategories />
      <FeaturedProducts featured={featured} />
      <IndustryAnimals />
      <PopularProduct recommended={recommended} />
      <Articles />
      <About />
      <Testimonials />
      <Ads />
      <HomeFAQ />
    </section>
  );
};

export default Home;
