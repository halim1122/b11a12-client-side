import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner3 from "../../assets/banner/images (4).jpg";
import banner2 from "../../assets/banner/emma-fabbri-EYw0bkh9BVY-unsplash.jpg";
import banner1 from "../../assets/banner/premium_photo-1661963989923-17181d237cef.jpg";
import banner4 from "../../assets/banner/buildings-wallpaper-preview.jpg";
import banner5 from "../../assets/banner/HD-wallpaper-beautiful-view-resort-ocean-sky-clouds-pool-sea-aunset-summer-nature-sunrise-spendor.jpg";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      title: "Explore The World",
      subtitle: "Discover unforgettable trips with our premium travel packages",
    },
    {
      img: banner2,
      title: "Adventure Awaits",
      subtitle: "Book your next journey with trusted guides and services",
    },
    {
      img: banner3,
      title: "Luxury Escapes",
      subtitle: "Experience comfort and beauty in breathtaking destinations",
    },
    {
      img: banner4,
      title: "City Lights",
      subtitle: "Dive into vibrant cultures and iconic skylines",
    },
    {
      img: banner5,
      title: "Beach Paradise",
      subtitle: "Relax and unwind with nature’s best views",
    },
  ];

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
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[50vh] md:h-[100vh] object-cover"
              loading="lazy"
            />

            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-2xl md:text-5xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-4 text-sm md:text-lg max-w-2xl drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link to='/allTrips' className="mt-6 px-6 py-2 bg-[#007777] hover:bg-[#005f5f] transition rounded-sm shadow-lg text-white font-semibold">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
