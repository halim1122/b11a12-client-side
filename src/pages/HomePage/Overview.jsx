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

     return (
    <section className="py-16 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList className="flex justify-center gap-6 mb-8">
          <Tab className="btn btn-outline btn-accent">Our Packages</Tab>
          <Tab className="btn btn-outline btn-accent">Meet Our Tour Guides</Tab>
        </TabList>

        {/* Packages */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className="rounded-lg overflow-hidden shadow hover:shadow-xl border border-gray-200 transition"
              >
                <img
                  src={pkg.photoUrl}
                  alt={pkg.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{pkg.title}</h3>
                  <p className="text-sm text-gray-500 uppercase">{pkg.tourType}</p>
                  <p className="text-lg font-bold text-[#009999]">Tk {pkg.price.toLocaleString()}</p>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="btn btn-sm bg-[#009999] hover:bg-[#007777] text-white mt-2"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Guides */}
        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map(guide => (
              <div
                key={guide.id}
                className="rounded-lg p-5 border border-gray-200 shadow hover:shadow-xl transition text-center"
              >
                <img
                  src={guide.photoUrl}
                  alt={guide.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-[#009999] mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{guide.name}</h3>
                <p className="text-gray-500">{guide.role}</p>
                <Link
                  to={`/guides/${guide.id}`}
                  className="btn btn-sm bg-[#009999] hover:bg-[#007777] text-white mt-3"
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
