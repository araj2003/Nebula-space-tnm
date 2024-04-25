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

const EssentialsPage = () => {
  const { dailyEssentialType, loading } = useSelector(
    (state) => state.dailyEssentialTypeAll
  );

  const { handleItemSelection } = useGlobalContext();
  const dispatch = useDispatch();
  const { essential } = useParams();
  const { error } = useSelector((state) => state.products);
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(essential));
  }, [dispatch, essential, error, alert]);

  useEffect(() => {
    dispatch(dailyEssentialsTypeLoadAction());
  }, [dispatch]);

  return (
    <div className="w-full py-24 lg:py-7 px-4 md:px-10 lg:px-16 flex flex-col gap-16">
      <section>
        <p className="text-2xl font-semibold text-gray-800 mb-5">
          Daily Needs & Essentials
        </p>
        {loading ? <Loader /> : <></>}
        <div className="flex w-full gap-3 md:gap-7 lg:gap-[22px]   flex-wrap">
          {dailyEssentialType &&
            dailyEssentialType.map((essential, index) => (
              <Link
                to={`/products`}
                key={essential._id}
                className="flex flex-col items-center hover:scale-105 duration-300 w-[90px] lg:w-[150px] "
                onClick={() => handleItemSelection(essential._id)}
              >
                <div
                  className="aspect-square h-[75px] md:h-[95px] lg:h-[150px] border rounded-2xl bg-cover"
                  style={{
                    backgroundImage: `url(${essential.imageUrl})`,
                  }}
                ></div>
                <p className="text-sm lg:text-base mt-2 text-center">
                  {essential.subCategoryName}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section>
        <p className="text-[20px] mb-5 font-semibold">Description</p>
        <article className="flex flex-col gap-8 md:text-[18px]">
          <p>
            Welcome to our daily essentials category, where we have curated a
            diverse collection of products to cater to the everyday needs of
            your beloved animals. We understand that each day is filled with
            opportunities to nurture and care for them, and we are here to make
            that experience convenient, enjoyable, and creative.
          </p>
          <p>
            Here, you'll not only find the essential products they need but also
            a world of opportunities to express your own unique style and
            imagination. Embrace each day with enthusiasm, knowing that all the
            daily essentials your animals require are conveniently available in
            one place.
          </p>
          <p>
            From nutritious food to comfortable bedding, from grooming supplies
            to engaging toys, we have carefully curated a wide range of products
            to cater to their every need. But we don't stop there. We invite you
            to unleash your creativity and explore the possibilities. Dress up
            your pets with stylish clothing and fashionable accessories that
            reflect their personality. Design comfortable and functional living
            spaces that blend seamlessly with your own unique aesthetic.
          </p>
          <p>
            Let us be your trusted partner in creating a fulfilling and joyful
            daily experience for both you and your beloved animals. Together, we
            can embark on a journey of excitement, innovation, and care. Explore
            our comprehensive range of products and let your imagination soar.
            Caring for your animals is not just a necessity—it's an opportunity
            to create beautiful moments and unforgettable memorie
          </p>
          {/*<p className="font-bold">Our daily essential categories include -</p>
           <p>
            <p className="font-bold mb-1">Food :</p>
            Satisfy the nutritional needs of your animals with our carefully
            curated assortment of nourishing food options. Delve into a world of
            culinary delights designed to cater to their specific dietary
            requirements with precision. From premium-grade kibble and
            delectable canned food to wholesome raw offerings and specialized
            diets, our extensive selection ensures that even the most discerning
            palates are satiated. Explore our wide array of culinary treasures
            and embark on a gastronomic journey that will leave your animals
            healthy, vibrant, and truly content.
          </p>
          <p>
            <p className="font-bold mb-1">Drinker :</p>
            Ensure optimal hydration for your animals with our selection of
            innovative and dependable drinker solutions. Discover the
            versatility of our diverse range, thoughtfully designed to cater to
            various requirements, ensuring a continuous and pristine supply of
            fresh water. Explore our collection of drinkers, meticulously
            tailored to meet the unique needs of different animals, and provide
            them with the essential nourishment they require to thrive.
          </p>
          <p>
            <p className="font-bold mb-1">Federer :</p>Elevate mealtime for your
            animals with our exquisite array of feeders. Indulge in the
            convenience and sophistication of our carefully curated selection.
            Our exceptional feeders provide seamless access to nourishment,
            guaranteeing regular and controlled feeding for your beloved
            animals. Experience the ease and elegance of mealtime, as our
            feeders bring harmony and precision to their dining routine,
            ensuring their well-being and satisfaction.
          </p>
          <p>
            <p className="font-bold mb-1">Grooming :</p>
            Pamper your animals, including majestic horses, with our opulent
            selection of grooming products. Delve into a realm of unparalleled
            luxury as you discover our exquisite range of brushes, combs,
            shampoos, conditioners, and spa-inspired treatments. With meticulous
            care and attention to detail, these products are designed to keep
            their coats lustrous, their manes flowing, and their tails swishing
            gracefully. Experience the art of grooming as it transforms their
            majestic presence into a captivating masterpiece. Let them embody
            elegance and radiate vitality with our carefully curated grooming
            products, tailored to meet the unique needs of your cherished
            horses.
          </p>
          <p>
            <p className="font-bold mb-1">Clothing :</p>
            Elevate your animals' style and comfort with our exquisite range of
            clothing options. Unleash their unique personality as you explore
            our captivating collection.From fashionable accessories to
            functional attire, our clothing selection allows you to dress them
            impeccably for any occasion. Let their attire reflect their
            individuality and make a fashion statement that truly sets them
            apart.
          </p>
          <p>
            <p className="font-bold mb-1">Accessories :</p>
            Elevate your animals' daily experiences with our captivating array
            of accessories. Unlock a world of possibilities as you explore our
            thoughtfully curated selection, featuring interactive toys that
            ignite their minds and foster engagement. Embark on exciting outdoor
            adventures with the confidence provided by our durable leashes,
            collars, and harnesses, ensuring their safety and freedom. Whether
            it's a stimulating puzzle toy or a sturdy leash for a thrilling
            walk, our accessories are designed to keep your animals active,
            entertained, and protected. Let their daily routines be enhanced
            with these remarkable additions, creating a harmonious blend of joy,
            stimulation, and safety.
          </p>
          <p>
            <p className="font-bold mb-1">Farm Supplies :</p>
            For our esteemed farming community, we proudly present a
            comprehensive range of farm supplies meticulously crafted to support
            and enhance your endeavors. Equip yourself with our durable tools
            and equipment, meticulously engineered to withstand the rigors of
            farm life. Experience the power of innovation and precision as you
            embrace our farm supplies. Trust in our expertise to provide you
            with the tools and equipment necessary for a successful and
            sustainable farming experience.
          </p>
          <p>
            <p className="font-bold mb-1">Identification :</p>
            RFID:Stay seamlessly connected with your treasured animals through
            our cutting-edge RFID identification solutions. Embrace the power of
            technology to safeguard their well-being and effortlessly track
            their whereabouts with our innovative identification tags and
            systems.With our advanced RFID technology, you can establish a
            secure and reliable connection between you and your animals. Our
            state-of-the-art identification tags provide a unique digital
            signature, enabling easy and accurate identification. Effortlessly
            monitor their movements, access essential information, and ensure
            their safety with our intuitive tracking systems.Enhance your animal
            management practices with precision, streamline operations, and
            optimize care. From farms to pet owners, our innovative
            identification solutions offer a seamless and reliable means to stay
            connected and protect the well-being of your cherished animals.
          </p>
          <p>
            Let us be your trusted partner in creating a fulfilling and joyful
            daily experience for both you and your beloved animals. Together, we
            can embark on a journey of excitement, innovation, and care. Explore
            our comprehensive range of products and let your imagination soar.
            Caring for your animals is not just a necessity—it's an opportunity
            to create beautiful moments and unforgettable memories.
          </p> */}
        </article>
      </section>
    </div>
  );
};

export default EssentialsPage;
