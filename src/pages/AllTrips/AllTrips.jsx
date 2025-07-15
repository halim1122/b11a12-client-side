import { useQuery } from "@tanstack/react-query";
import {
     FaStar,
     FaRegStar,
     FaPlane,
     FaWifi,
     FaTv,
     FaSwimmingPool,
     FaDumbbell,
     FaUtensils,
} from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import useAxios from "../../Hook/useAxios";
import { Link } from "react-router";

const renderStars = (rating) => {
     const totalStars = 5;
     const filled = Math.floor(rating);
     const empty = totalStars - filled;

     return (
          <>
               {[...Array(filled)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-500" />
               ))}
               {[...Array(empty)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
               ))}
          </>
     );
};

const AllTrips = () => {
     const axiosInstance = useAxios();

     const { data: packages = [], isLoading } = useQuery({
          queryKey: ["packages"],
          queryFn: async () => {
               const res = await axiosInstance.get("/packages");
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />

     return (
          <div className="max-w-7xl mx-auto overflow-hidden px-4 md:px-6 mt-10 md:mt-20">
               <div className="space-y-6">
                    {packages.map((pkg) => (
                         <div
                              key={pkg._id}
                              className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full md:h-[250px]"
                         >
                              {/* image section */}
                              <div className="relative md:w-1/3 w-full h-[200px] md:h-full">
                                   <img
                                        src={pkg.images?.[0]}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover"
                                   />
                                   <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs rounded shadow">
                                        {parseFloat(Math.floor(pkg.rating)) === parseFloat(5) ? 'TOP RATED' : 'MID RATED'}
                                   </span>
                                   <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                        <FaPlane /> Transfer
                                   </span>
                                   <AiFillHeart className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 p-4 flex justify-between w-full box-border">
                                   {/* Top Section */}
                                   <div className="flex-1 p-4 space-y-2">
                                        <div className="flex items-center gap-1 text-sm">
                                             {renderStars(pkg.rating)}
                                             <span className="text-gray-500 ml-2">({pkg.rating})</span>
                                        </div>
                                        <h2 className="text-xl font-bold uppercase">{pkg.name}</h2>

                                        {/* Mobile only: Price & button */}
                                        <div className="md:hidden mt-2">
                                             <div className="text-red-500 font-bold text-lg">${pkg.price.toLocaleString()}</div>
                                             <button className="btn btn-sm mt-1 bg-[#007777] text-white hover:brightness-110 w-full">
                                                  Details
                                             </button>
                                        </div>

                                        {/* Desktop only: Description & Icons */}
                                        <div className="hidden md:block">
                                             <p className="text-sm text-gray-600 text-justify line-clamp-4">
                                                  {pkg.description}...
                                             </p>
                                             <div className="flex gap-3 text-gray-600 text-lg mt-5">
                                                  <div className="p-2 rounded shadow hover:bg-base-200"><FaWifi title="Free Wi-Fi" /></div>
                                                  <div className="p-2 rounded shadow hover:bg-base-200"><FaTv title="Cable TV" /></div>
                                                  <div className="p-2 rounded shadow hover:bg-base-200"><FaSwimmingPool title="Swimming Pool" /></div>
                                                  <div className="p-2 rounded shadow hover:bg-base-200"><FaDumbbell title="Gym" /></div>
                                                  <div className="p-2 rounded shadow hover:bg-base-200"><FaUtensils title="Restaurant" /></div>

                                             </div>
                                        </div>
                                   </div>

                                   {/* Desktop only: Price section */}
                                   <div className="md:w-[130px] hidden md:flex flex-col justify-center items-center gap-2 p-4 border-t md:border-t-0 md:border-l">
                                        <div className="text-red-500 font-bold text-xl">
                                             ${pkg.price.toLocaleString()}
                                        </div>
                                        <div className="text-gray-500 text-xs">*From/{pkg.personType ? pkg.personType : 'par person'}</div>
                                        <Link to={`/PackageDetails/${pkg._id}`} className="btn btn-sm bg-[#007777] text-white mt-2 hover:brightness-110">
                                             Details
                                        </Link>
                                   </div>
                              </div>
                         </div>

                    ))}
               </div>
          </div>
     );
};

export default AllTrips;
