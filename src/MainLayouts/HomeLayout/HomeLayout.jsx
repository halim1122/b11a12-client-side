import Banner from "../../pages/HomePage/Banner";
import FeaturedPackages from "../../pages/HomePage/FeaturedPackage";
import OverviewSection from "../../pages/HomePage/OverviewSection";
import PopularDestinations from "../../pages/HomePage/PopularDestinations";
import TopRatingPackage from "../../pages/HomePage/TopRatingPackage";
import TouristStorySection from "../../pages/HomePage/TouristStorySection";
import TravelGuideSection from "../../pages/HomePage/TravelGuideSection";
import WhyTravelWithUs from "../../pages/HomePage/WhyTravelWithUs";
import TourGuidesSection from "../../pages/TourGuidesSection/TourGuidesSection";


const HomeLayout = () => {
     return (
          <div>
               <Banner></Banner>
               <OverviewSection></OverviewSection>
               <TravelGuideSection></TravelGuideSection>
               <TopRatingPackage></TopRatingPackage>
               <FeaturedPackages></FeaturedPackages>
               <TouristStorySection></TouristStorySection>
               <PopularDestinations></PopularDestinations>
               <WhyTravelWithUs></WhyTravelWithUs>
          </div>
     );
};

export default HomeLayout;