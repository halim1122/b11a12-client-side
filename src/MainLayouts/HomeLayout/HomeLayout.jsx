import Banner from "../../pages/HomePage/Banner";
import Overview from "../../pages/HomePage/Overview";
import TravelGuideSection from "../../pages/HomePage/TravelGuideSection";


const HomeLayout = () => {
     return (
          <div>
               <Banner></Banner>
               <Overview></Overview>
               <TravelGuideSection></TravelGuideSection>
          </div>
     );
};

export default HomeLayout;