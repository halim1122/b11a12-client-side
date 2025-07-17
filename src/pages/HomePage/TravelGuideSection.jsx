import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import { IoIosArrowRoundForward } from 'react-icons/io';
import OurPackages from './OurPackages';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const TravelGuideSection = () => {
         const axiosInstance = useAxiosSecure();
     const navigate = useNavigate();

     const { data: guides = [], isLoading } = useQuery({
          queryKey: ["tour-guides"],
          queryFn: async () => {
               const res = await axiosInstance.get("/users?role=tour-guide");
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />;

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
          <OurPackages></OurPackages>
        </TabPanel>

        {/* Guides */}
        <TabPanel>
           <div className="mt-10">
               <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">Choose Your Tour Guides</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {guides.slice(0, 6).map((guide) => (
                         <div
                              key={guide._id}
                              onClick={() => navigate(`/tourGuideProfile/${guide.email}`)}
                              className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition duration-200"
                         >
                              <img
                                   src={guide.photoURL || "https://i.ibb.co/4f3QW4J/user.png"}
                                   alt="Tour Guide"
                                   className="w-20 h-20 object-cover rounded-full mx-auto"
                              />
                              <div className="text-center mt-3">
                                   <p className="font-semibold">{guide.displayName}</p>
                                   <p className="text-sm text-gray-500">{guide.email}</p>
                              </div>
                              <button className='text-sm mt-2 flex items-center gap-2'>View Details <IoIosArrowRoundForward /></button>
                         </div>
                    ))}
               </div>
          </div>
        </TabPanel>
      </Tabs>
    </section>
     );
};

export default TravelGuideSection;
