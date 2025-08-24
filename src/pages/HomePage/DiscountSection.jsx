import { Link } from "react-router"; // react-router-dom use koro
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DiscountSection = () => {
     const discounts = [
          {
               _id: "68760761661426c8e72088c5",
               name: "Spain",
               description:
                    "The Tourist Guide site is an online platform that serves as a comprehensive travel solution.",
               images: [
                    "https://i.ibb.co/cS2Kv5cK/images-3.jpg",
                    "https://i.ibb.co/d4zkBRrg/images-2.jpg",
               ],
               rating: 5,
               price: 78000,
               tourTime: "6",
               discount: 15,
          },
          {
               _id: "687607d2661426c8e72088c6",
               name: "Hongkong",
               description:
                    "The Tourist Guide site is an online platform that serves as a comprehensive travel solution.",
               images: [
                    "https://i.ibb.co/nSFrR32/emma-fabbri-EYw0bkh9-BVY-unsplash.jpg",
                    "https://i.ibb.co/JRYd2ySL/brigitte-tohm-8-SAxrm-Rb-FOc-unsplash.jpg",
               ],
               rating: 4,
               price: 50000,
               tourTime: "5",
               discount: 10,
          },
     ];

     return (
          <section className="py-12 bg-gray-100 mb-20">
               <h2 className="text-3xl font-bold text-center mb-10">
                    🔥 Special Discounts
               </h2>

               <div className="grid md:grid-cols-2 gap-8 px-6 md:px-14">
                    {discounts.map((pkg, idx) => {
                         const discountedPrice = pkg.price - (pkg.price * pkg.discount) / 100;
                         return (
                              <motion.div
                                   key={pkg._id}
                                   className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl"
                                   initial={{ opacity: 0, y: 50 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: idx * 0.2 }}
                                   whileHover={{ scale: 1.03 }}
                              >
                                   {/* Image wrapper */}
                                   <div className="relative">
                                        <img
                                             src={pkg.images[0]}
                                             alt={pkg.name}
                                             className="h-56 w-full object-cover"
                                        />

                                        {/* Ribbon Badge */}
                                        <div className="absolute top-4 -left-12 w-48 bg-green-600 text-white text-center font-semibold py-1 rotate-[-45deg] shadow-lg">
                                             Discount {pkg.discount}%
                                        </div>
                                   </div>


                                   <div className="p-6">
                                        <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                             {pkg.description.slice(0, 80)}...
                                        </p>
                                        <p className="text-sm">
                                             ⏳ {pkg.tourTime} Days | ⭐ {pkg.rating}
                                        </p>
                                        <div className="mt-3">
                                             <span className="line-through text-gray-500 mr-2">
                                                  ৳{pkg.price}
                                             </span>
                                             <span className="text-red-500 font-bold text-lg">
                                                  ৳{discountedPrice}
                                             </span>
                                             <span className="ml-2 text-green-600">
                                                  (-{pkg.discount}%)
                                             </span>
                                        </div>
                                        <Link to={`/PackageDetails/${pkg._id}`}>
                                             <button className="mt-4 w-full bg-[#007777] text-white py-2 rounded-xl hover:bg-[#005f5f] transition">
                                                  View Deal
                                             </button>
                                        </Link>
                                   </div>
                              </motion.div>
                         );
                    })}
               </div>

               {/* See All Trips Button */}
               <div className="text-center mt-10">
                    <Link to="/allTrips">
                         <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-gradient-to-r from-[#007777] to-[#0560c1] text-white font-semibold rounded-2xl shadow-lg"
                         >
                              See All Trips
                         </motion.button>
                    </Link>
               </div>
          </section>
     );
};
export default DiscountSection;
