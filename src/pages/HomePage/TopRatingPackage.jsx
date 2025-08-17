import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import { useNavigate } from "react-router";

const TopRatingPackages = () => {
     const axiose = useAxios();
     const [page, setPage] = useState(1);
     const limit = 100; // প্রতি page এ কতগুলো package দেখাবে
     const navigate = useNavigate();

     const { data, isLoading, isError } = useQuery({
          queryKey: ["packages", page],
          queryFn: async () => {
               const res = await axiose.get(`/packages?page=${page}&limit=${limit}`);
               return res.data;
          },
          keepPreviousData: true,
     });

     if (isLoading) return <LoadingSpinner />;
     if (isError) return <p className="text-center text-4xl text-error font-bold">Error loading packages</p>;

     // শুধুমাত্র rating = 5 filter
     const topRated = data.packages.filter(pkg => parseFloat(Math.floor(pkg.rating)) === parseFloat(5));

     return (
          <section className="max-w-7xl mx-auto bg-gray-100 rounded-2xl p-4 mb-24">
               <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#007777]">
                    Top Rated Packages
               </h2>

               {topRated.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
                         {topRated.map(pkg => (
                              <div key={pkg._id} className="card bg-white shadow-md rounded-xl overflow-hidden">
                                   <img
                                        src={pkg.images?.[0]} alt="story" className="h-48 w-full object-cover transform transition-transform duration-500 hover:scale-110" />
                                   <div className="p-4">
                                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">Type: {pkg.personType || 'per person'}</p>
                                        <p className="text-xl font-bold text-[#007777]">৳{pkg.price}</p>
                                        <button
                                             onClick={() => navigate(`/PackageDetails/${pkg._id}`)}
                                             className="mt-3 btn btn-sm botder-[#007777] text-white bg-[#007777] hover:bg-[#0f5e5e]"
                                        >
                                             View Package
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               ) : (
                    <p className="text-center text-gray-500">No Top Rated Packages found</p>
               )}

               {/* Pagination */}
               <div className="flex justify-center mt-6 space-x-2">
                    <button
                         onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                         disabled={page === 1}
                         className={`px-4 py-2 rounded-lg border border-gray-300 font-medium transition 
      ${page === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                    >
                         Prev
                    </button>

                    <span className="px-4 py-2 border border-gray-300 rounded-lg bg-white font-medium text-gray-700">
                         {page} / {data.totalPages || 1}
                    </span>

                    <button
                         onClick={() => setPage(prev => Math.min(prev + 1, data.totalPages))}
                         disabled={page >= data.totalPages}
                         className={`px-4 py-2 rounded-lg border border-gray-300 font-medium transition 
      ${page >= data.totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                    >
                         Next
                    </button>
               </div>

          </section>
     );
};

export default TopRatingPackages;
