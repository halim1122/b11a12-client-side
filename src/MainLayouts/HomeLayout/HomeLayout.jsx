import Banner from "../../pages/HomePage/Banner";
import Overview from "../../pages/HomePage/Overview";
import TouristStorySection from "../../pages/HomePage/TouristStorySection";


const HomeLayout = () => {
     return (
          <div>
               <Banner></Banner>
               <Overview></Overview>
               {/* <TouristStorySection></TouristStorySection> */}
          </div>
     );
};

export default HomeLayout;