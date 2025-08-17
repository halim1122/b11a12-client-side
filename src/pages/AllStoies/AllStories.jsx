import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../Hook/useAxios";
import StoiesCard from "./StoiesCard.jsx/StoiesCard";

const AllStories = () => {
     const [openImageModal, setOpenImageModal] = useState(false);
     const [activeStoryImages, setActiveStoryImages] = useState([]);
     const [page, setPage] = useState(1);
     const limit = 10;

     const axiosInstance = useAxios();

     const { data = {}, isLoading } = useQuery({
          queryKey: ["stories", page],
          queryFn: async () => {
               const res = await axiosInstance.get(`/stories?page=${page}&limit=${limit}`);
               return res.data; // { stories: [...], total: 50 }
          },
          keepPreviousData: true,
     });

     const stories = data?.stories || [];
     const total = data?.total || 0;
     const totalPages = Math.ceil(total / limit);

     // Skeleton loading
     if (isLoading) {
          return (
               <div className="max-w-7xl mx-auto mt-10 md:mt-20 p-4 md:p-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                         All Stories
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                         {[...Array(limit)].map((_, i) => (
                              <div key={i} className="bg-white shadow rounded-lg p-4 animate-pulse">
                                   <div className="h-48 bg-gray-300 rounded mb-4"></div>
                                   <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                   <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                              </div>
                         ))}
                    </div>
               </div>
          );
     }

     return (
          <div className="max-w-7xl mx-auto mt-10 md:mt-20 p-4 md:p-6">
               <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                    All Stories
               </h2>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stories.map((story) => (
                         <StoiesCard
                              key={story._id}
                              story={story}
                              setActiveStoryImages={setActiveStoryImages}
                              setOpenImageModal={setOpenImageModal}
                         />
                    ))}
               </div>

               {/* Pagination */}
               <div className="mt-8 flex gap-2 justify-center">
                    <button
                         className="btn btn-sm"
                         disabled={page === 1}
                         onClick={() => setPage(page - 1)}
                    >
                         Prev
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                         const pageNum = idx + 1;
                         return (
                              <button
                                   key={pageNum}
                                   className={`btn btn-sm ${page === pageNum ? "btn-primary" : ""}`}
                                   onClick={() => setPage(pageNum)}
                              >
                                   {pageNum}
                              </button>
                         );
                    })}

                    <button
                         className="btn btn-sm"
                         disabled={page === totalPages}
                         onClick={() => setPage(page + 1)}
                    >
                         Next
                    </button>
               </div>

               {/* Image Modal */}
               {openImageModal && (
                    <dialog id="image_modal" className="modal modal-open">
                         <div className="modal-box max-w-4xl w-full">
                              <h3 className="font-bold text-lg mb-4">Story Images</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
                                   {activeStoryImages.map((img, idx) => (
                                        <img
                                             key={idx}
                                             src={img}
                                             alt={`modal-img-${idx}`}
                                             className="rounded w-full object-cover"
                                        />
                                   ))}
                              </div>
                              <div className="modal-action">
                                   <form method="dialog">
                                        <button
                                             className="btn"
                                             onClick={() => setOpenImageModal(false)}
                                        >
                                             Close
                                        </button>
                                   </form>
                              </div>
                         </div>
                    </dialog>
               )}
          </div>
     );
};

export default AllStories;
