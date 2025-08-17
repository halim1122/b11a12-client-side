import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import { IoIosArrowRoundForward } from 'react-icons/io';

const ChooseYourTourGuides = () => {

              const axiosInstance = useAxiosSecure();
          const navigate = useNavigate();
     
          const { data: guides = [], isLoading } = useQuery({
               queryKey: ["tour-guides"],
               queryFn: async () => {
                    const res = await axiosInstance.get("/users?role=tour-guide");
                    return res.data;
               },
          });
     
          if (isLoading) return <LoadingSpinner/>
     

     return (
            <div className="mt-10 max-w-[1250px] mx-auto">
               <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2 text-[#007777]">Choose Your Tour Guides</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {guides.slice(0, 8).map((guide) => (
                         <div
                              key={guide._id}
                              onClick={() => navigate(`/tourGuideProfile/${guide.email}`)}
                              className="cursor-pointer border-gray-400 border rounded-lg p-4 hover:shadow-xl transition duration-200"
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
                              <button className='text-sm mt-2 hover:font-bold transition duration-200 tran flex items-center gap-2'>View Details <IoIosArrowRoundForward /></button>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default ChooseYourTourGuides;