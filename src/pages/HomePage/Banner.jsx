import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner3 from '../../assets/banner/images (4).jpg';
import banner2 from '../../assets/banner/emma-fabbri-EYw0bkh9BVY-unsplash.jpg';
import banner1 from '../../assets/banner/premium_photo-1661963989923-17181d237cef.jpg';
import banner4 from '../../assets/banner/buildings-wallpaper-preview.jpg';
import banner5 from '../../assets/banner/HD-wallpaper-beautiful-view-resort-ocean-sky-clouds-pool-sea-aunset-summer-nature-sunrise-spendor.jpg';

const Banner = () => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={false}
        showArrows={true}
        swipeable={true}
        emulateTouch={true}
      >
        {[banner1, banner2, banner3, banner4, banner5].map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[50vh] md:h-[100vh] object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
