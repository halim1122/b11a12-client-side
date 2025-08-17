import React from 'react';

const OverviewSection = () => {
     return (
          <section className="bg-gray-100 pb-12 pt-24 px-4 md:px-10">
               <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#007777]">Explore the World with Us</h2>
                    <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                         Discover top destinations, curated travel packages, and unforgettable experiences. From relaxing beaches to cultural adventures, we help you make every journey special.
                    </p>

                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                         <a
                              href="https://www.youtube.com/watch?v=QGmZ1rsKJ9c"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative block w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg group"
                         >
                              {/* YouTube Thumbnail */}
                              <img
                                   src="https://img.youtube.com/vi/QGmZ1rsKJ9c/hqdefault.jpg"
                                   alt="Travel Overview Video"
                                   className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                              />

                              {/* Centered Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-40 group-hover:bg-opacity-60 transition-all">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-16 h-16 text-red-500 opacity-90 group-hover:scale-110 transition-transform duration-200"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                   >
                                        <path d="M6.79 5.093A.5.5 0 0 1 7.5 5.5v5a.5.5 0 0 1-.79.407L4.5 8.972 6.79 5.093z" />
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z" />
                                   </svg>
                              </div>
                         </a>

                    </div>

               </div>
          </section>
     );
};

export default OverviewSection;
