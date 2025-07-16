import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import useAuthContext from "../../Hook/useAuthContext";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import { FacebookShareButton } from "react-share";
import { IoArrowRedoOutline } from "react-icons/io5";

const AllStories = () => {
     const [openImageModal, setOpenImageModal] = useState(false);
     const [activeStoryImages, setActiveStoryImages] = useState([]);
     const axiosInstance = useAxios();
     const { user } = useAuthContext();

     const { data: stories = [], isLoading } = useQuery({
          queryKey: ["stories"],
          queryFn: async () => {
               const res = await axiosInstance.get("/stories");
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />;

     return (
          <div className="max-w-7xl mx-auto p-4 md:p-6">
               <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">All Stories</h2>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stories.map((story) => (
                         <div key={story._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col">
                              {/* Image Grid */}
                              <div className={`grid overflow-hidden ${story?.images?.length === 1
                                   ? "grid-cols-1 grid-rows-1"
                                   : story?.images?.length === 2
                                        ? "grid-cols-1 grid-rows-2"
                                        : "grid-cols-2 grid-rows-2"
                                   } h-[250px] w-full gap-[2px]`}>
                                   {story.images?.slice(0, 4).map((img, index) => {
                                        const isLast = index === 3 && story.images.length > 4;
                                        return (
                                             <div key={index} className="relative w-full h-full cursor-pointer" onClick={() => {
                                                  setActiveStoryImages(story.images);
                                                  setOpenImageModal(true);
                                             }}>
                                                  <img src={img} alt={`story-${index}`} className="w-full h-full object-cover" />
                                                  {isLast && (
                                                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-xs font-semibold">
                                                            +{story.images.length - 4}
                                                       </div>
                                                  )}
                                             </div>
                                        );
                                   })}
                              </div>

                              {/* Title + Description + Share */}
                              <div className="p-4 flex flex-col flex-grow justify-between">
                                   <div>
                                        <h2 className="text-lg font-semibold">{story.title}</h2>
                                        <p className="line-clamp-3 text-sm text-gray-700">{story.description}</p>
                                   </div>

                                   <div className="flex justify-end mt-4 items-center">
                                        <FacebookShareButton
                                             className="flex gap-1 items-center"
                                             url={window.location.href + `#story-${story._id}`}
                                             quote={story.title}
                                             onClick={(e) => {
                                                  if (!user) {
                                                       e.preventDefault();
                                                       window.location.href = "/login";
                                                  }
                                             }}
                                        >
                                             <IoArrowRedoOutline />share
                                        </FacebookShareButton>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>

               {/* Image Modal */}
               {openImageModal && (
                    <dialog id="image_modal" className="modal modal-open">
                         <div className="modal-box max-w-4xl w-full">
                              <h3 className="font-bold text-lg mb-4">Story Images</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto">
                                   {activeStoryImages.map((img, idx) => (
                                        <img key={idx} src={img} alt={`modal-img-${idx}`} className="rounded w-full object-cover" />
                                   ))}
                              </div>
                              <div className="modal-action">
                                   <form method="dialog">
                                        <button className="btn" onClick={() => setOpenImageModal(false)}>Close</button>
                                   </form>
                              </div>
                         </div>
                    </dialog>
               )}
          </div>
     );
};

export default AllStories;
