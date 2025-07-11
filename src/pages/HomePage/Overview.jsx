import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router';

const TravelGuideSection = () => {
     const packages = [
          {
               id: 'pkg1',
               title: 'Sunset Beach Getaway',
               tourType: 'Beach',
               price: 25000,
               photoUrl: '/images/package1.jpg',
          },
          {
               id: 'pkg2',
               title: 'Mountain Adventure',
               tourType: 'Hiking',
               price: 30000,
               photoUrl: '/images/package2.jpg',
          },
          {
               id: 'pkg3',
               title: 'City Cultural Tour',
               tourType: 'Cultural',
               price: 20000,
               photoUrl: '/images/package3.jpg',
          },
     ];

     const guides = [
          {
               id: 'g1',
               name: 'Rafi Ahmed',
               role: 'Beach Guide',
               photoUrl: '/images/guide1.jpg',
          },
          {
               id: 'g2',
               name: 'Anika Chowdhury',
               role: 'City Tour Guide',
               photoUrl: '/images/guide2.jpg',
          },
          {
               id: 'g3',
               name: 'Jamal Khan',
               role: 'Mountain Trekker',
               photoUrl: '/images/guide3.jpg',
          },
          {
               id: 'g4',
               name: 'Fatima Begum',
               role: 'Wildlife Guide',
               photoUrl: '/images/guide4.jpg',
          },
          {
               id: 'g5',
               name: 'Karim Uddin',
               role: 'Cultural Expert',
               photoUrl: '/images/guide5.jpg',
          },
          {
               id: 'g6',
               name: 'Nadia Islam',
               role: 'Adventure Guide',
               photoUrl: '/images/guide6.jpg',
          },
     ];

     // Inline style for bg with 50% opacity (using rgba)
     const bgColorWithOpacity = 'rgba(0, 153, 153, 0.5)'; // #009999 with 50% opacity

     return (
          <section
               className="py-12 px-4 md:px-20 min-h-screen text-white"
               style={{ backgroundColor: bgColorWithOpacity }}
          >
               <h2 className="text-3xl font-bold text-center mb-8">Tourism & Travel Guide</h2>

               <Tabs>
                    <TabList className="flex justify-center space-x-6 border-b border-white/50 mb-6">
                         <Tab
                              className="cursor-pointer py-2 px-6 rounded-t-md text-lg font-semibold 
              border-b-4 border-transparent
              hover:text-white/80
              selected:border-white
              selected:text-white"
                         >
                              Our Packages
                         </Tab>
                         <Tab
                              className="cursor-pointer py-2 px-6 rounded-t-md text-lg font-semibold 
              border-b-4 border-transparent
              hover:text-white/80
              selected:border-white
              selected:text-white"
                         >
                              Meet Our Tour Guides
                         </Tab>
                    </TabList>

                    <TabPanel>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {packages.map((pkg) => (
                                   <div
                                        key={pkg.id}
                                        className="bg-white/10 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                                   >
                                        <img
                                             src={pkg.photoUrl}
                                             alt={pkg.title}
                                             className="h-48 w-full object-cover rounded-md mb-4"
                                             loading="lazy"
                                        />
                                        <h3 className="text-xl font-semibold mb-1 text-white">{pkg.title}</h3>
                                        <p className="text-white/70 mb-2 uppercase">{pkg.tourType}</p>
                                        <p className="text-lg font-bold mb-4 text-white">Tk {pkg.price.toLocaleString()}</p>
                                        <Link
                                             to={`/packages/${pkg.id}`}
                                             className="inline-block bg-[#009999] hover:bg-[#007777] text-white px-4 py-2 rounded-md font-medium"
                                        >
                                             View Package
                                        </Link>
                                   </div>
                              ))}
                         </div>
                    </TabPanel>

                    <TabPanel>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {guides.map((guide) => (
                                   <div
                                        key={guide.id}
                                        className="bg-white/10 p-6 rounded-md shadow-md text-center hover:shadow-lg transition duration-300"
                                   >
                                        <img
                                             src={guide.photoUrl}
                                             alt={guide.name}
                                             className="mx-auto rounded-full w-40 h-40 object-cover mb-4 border-4 border-[#009999]"
                                             loading="lazy"
                                        />
                                        <h3 className="text-xl font-semibold mb-1 text-white">{guide.name}</h3>
                                        <p className="text-white/70 mb-4">{guide.role}</p>
                                        <Link
                                             to={`/guides/${guide.id}`}
                                             className="inline-block bg-[#009999] hover:bg-[#007777] text-white px-4 py-2 rounded-md font-medium"
                                        >
                                             Details
                                        </Link>
                                   </div>
                              ))}
                         </div>
                    </TabPanel>
               </Tabs>
          </section>
     );
};

export default TravelGuideSection;
