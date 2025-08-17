import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedPackages = () => {
     const featuredPackages = [
          {
               _id: "1",
               name: "Dubai",
               description: "Enjoy luxury shopping, desert safari, and stunning city views.",
               images: ["https://i.ibb.co.com/ksYr1501/buildings-wallpaper-preview.jpg"],
               rating: 4.5,
               price: 100000,
               tourTime: "7 Days",
               personType: "per person"
          },
          {
               _id: "2",
               name: "Maldives",
               description: "Relax on beautiful beaches and experience underwater adventures.",
               images: ["https://i.ibb.co.com/8LRcRbfb/HD-wallpaper-beautiful-view-resort-ocean-sky-clouds-pool-sea-aunset-summer-nature-sunrise-spendor.jpg"],
               rating: 4.8,
               price: 150000,
               tourTime: "5 Days",
               personType: "per person"
          },
          {
               _id: "3",
               name: "Bangkok",
               description: "Discover vibrant nightlife, temples, and delicious street food.",
               images: ["https://i.ibb.co.com/t0B1TB2/maldives-paradise-scenery-tropical-aerial-600nw-1901686090.webp"],
               rating: 4.3,
               price: 80000,
               tourTime: "4 Days",
               personType: "per person"
          },
          {
               _id: "4",
               name: "Paris",
               description: "Explore Eiffel Tower, museums, and romantic city vibes.",
               images: ["https://i.ibb.co.com/WvtYrsWX/kyoto-header.jpg"],
               rating: 4.9,
               price: 200000,
               tourTime: "6 Days",
               personType: "per person"
          }
     ];

     const [selectedPackage, setSelectedPackage] = useState(null);

     return (
          <div className="max-w-7xl mx-auto px-4 pb-26">
               <h2 className="text-4xl text-[#007777] font-bold mb-8 text-center">Featured Packages</h2>
               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredPackages.map((pkg) => (
                         <div
                              key={pkg._id}
                              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                         >
                              <img
                                   src={pkg.images[0]}
                                   alt={pkg.name}
                                   className="w-full h-48 object-cover"
                              />
                              <div className="p-4">
                                   <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                   <p className="text-sm text-gray-500 mb-2">{pkg.personType}</p>
                                   <p className="text-lg font-bold text-[#007777]">
                                        ৳ {pkg.price.toLocaleString()}
                                   </p>
                                   <button onClick={() => setSelectedPackage(pkg)} className="mt-4 w-full bg-[#007777] text-white py-2 rounded-lg hover:bg-[#009e9e] transition">
                                        View Details
                                   </button>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Modal */}
               <AnimatePresence>
                    {selectedPackage && (
                         <motion.div
                              className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                         >
                              <motion.div
                                   className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl"
                                   initial={{ scale: 0.7, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   exit={{ scale: 0.7, opacity: 0 }}
                                   transition={{ duration: 0.3 }}
                              >
                                   <h2 className="text-xl font-bold mb-2">{selectedPackage.name}</h2>
                                   <img
                                        src={selectedPackage.images[0]}
                                        alt={selectedPackage.name}
                                        className="rounded-lg mb-4"
                                   />
                                   <p className="text-gray-600 mb-4">{selectedPackage.description}</p>
                                   <p className="font-semibold">Price: {selectedPackage.price} Taka</p>
                                   <p className="font-semibold">Tour Time: {selectedPackage.tourTime} Days</p>
                                   <p className="font-semibold">Type: {selectedPackage.personType}</p>
                                   <button
                                        onClick={() => setSelectedPackage(null)}
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                                   >
                                        Close
                                   </button>
                              </motion.div>
                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     );
};

export default FeaturedPackages;
