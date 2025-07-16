
const destinations = [
     {
          name: "Santorini, Greece",
          image: "https://i.ibb.co/HTsH22h0/stock-photo-ammoudi-bay-oia-village-santorini-greece-630008048.webp",
          description: "Sunsets, white houses, and Aegean views.",
     },
     {
          name: "Cox's Bazar, Bangladesh",
          image: "https://i.ibb.co/zWnpVvvG/805b015deaf7c5448b86de1f09100343.jpg",
          description: "World's longest beach and peaceful vibes.",
     },
     {
          name: "Paris, France",
          image: "https://i.ibb.co/0y5HC1Yg/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg",
          description: "City of love, Eiffel Tower, and croissants.",
     },
     {
          name: "Kyoto, Japan",
          image: "https://i.ibb.co/Sw5pW8G2/kyoto-header.jpg",
          description: "Ancient temples, cherry blossoms, and traditional culture.",
     },
     {
          name: "Cappadocia, Turkey",
          image: "https://i.ibb.co/F4CxS9gB/images-4.jpg",
          description: "Hot air balloons, unique rock formations, and underground cities.",
     },
     {
          name: "Santorini, Greece",
          image: "https://i.ibb.co/HTsH22h0/stock-photo-ammoudi-bay-oia-village-santorini-greece-630008048.webp",
          description: "Whitewashed buildings, blue domes, and stunning sunsets.",
     },
     {
          name: "Banff, Canada",
          image: "https://i.ibb.co/m5pD1nsF/images-5.jpg",
          description: "Turquoise lakes, mountain peaks, and outdoor adventures.",
     },
     {
          name: "Dubai, UAE",
          image: "https://i.ibb.co/prKYJ8LP/Dubai-scaled.jpg",
          description: "Skyscrapers, luxury shopping, and desert safaris.",
     }

];

const PopularDestinations = () => {
     return (
          <section className="max-w-7xl mx-auto px-4 py-10">
               <h2 className="text-3xl font-bold text-center mb-8">🌍 Popular Destinations</h2>
               <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-6">
                    {destinations.map((dest, idx) => (
                         <div key={idx} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 group relative">
                              <img src={dest.image} alt={dest.name} className="w-full h-64 object-cover transform group-hover:scale-105 duration-300" />
                              <div className="absolute bottom-0 bg-emerald-600 bg-opacity-60 text-white p-4 w-full">
                                   <h3 className="text-xl font-semibold">{dest.name}</h3>
                                   <p className="text-sm">{dest.description}</p>
                              </div>
                         </div>
                    ))}
               </div>
          </section>
     );
};

export default PopularDestinations;
