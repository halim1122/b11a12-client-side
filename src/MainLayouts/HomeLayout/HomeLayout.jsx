// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Banner from "../../pages/HomePage/Banner";
import DiscountSection from "../../pages/HomePage/DiscountSection";
import FaqSection from "../../pages/HomePage/FaqSection";
import FeaturedPackages from "../../pages/HomePage/FeaturedPackage";
import OverviewSection from "../../pages/HomePage/OverviewSection";
import PopularDestinations from "../../pages/HomePage/PopularDestinations";
import TopRatingPackage from "../../pages/HomePage/TopRatingPackage";
import TouristStorySection from "../../pages/HomePage/TouristStorySection";
import TravelGuideSection from "../../pages/HomePage/TravelGuideSection";
import WhyTravelWithUs from "../../pages/HomePage/WhyTravelWithUs";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HomeLayout = () => {
  return (
    <div>
      {/* Banner fixed without motion */}
      <Banner />

      {/* All sections wrapped with motion.div */}
      {[
        DiscountSection,
        OverviewSection,
        TravelGuideSection,
        TopRatingPackage,
        FeaturedPackages,
        TouristStorySection,
        PopularDestinations,
        WhyTravelWithUs,
        FaqSection,
      ].map((Section, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Section />
        </motion.div>
      ))}
    </div>
  );
};

export default HomeLayout;
