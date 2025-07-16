import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import useAuthContext from "../../Hook/useAuthContext";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FacebookShareButton } from "react-share";

const TourGuideProfilePage = () => {
     const { email } = useParams();
     const axiosInstance = useAxios();
     const [openImageModal, setOpenImageModal] = useState(false);
     const [activeStoryImages, setActiveStoryImages] = useState([]);

     const { data: guide = {}, isLoading } = useQuery({
          queryKey: ["tourGuide", email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/users/${email}`);
               return res.data;
          },
          enabled: !!email,
     });

     const { user } = useAuthContext();
     const { data: stories = [], isLoading: isStoriesLoading, refetch } = useQuery({
          queryKey: ["stories", user?.email],
          queryFn: async () => {
               if (!user?.email) return [];
               const res = await axiosInstance.get(`/stories/${user?.email}`);
               return res.data;
          },
          enabled: !!user?.email,
     });

     if (isLoading || isStoriesLoading) return <LoadingSpinner />
     refetch();

     return (
          <div className="max-w-7xl mx-auto px-4 mt-10 md:mt-20 py-8">
               <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                         <img
                              src={guide?.photoURL || "https://i.ibb.co/4f3QW4J/user.png"}
                              alt={guide.displayName}
                              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#007777]"
                         />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                         <h2 className="text-2xl md:text-3xl font-bold text-[#007777]">
                              {guide.displayName}
                         </h2>
                         <p className="text-gray-700 text-sm md:text-base">
                              <strong>Email:</strong> {guide.email}
                         </p>
                         <p className="text-gray-700 text-sm md:text-base">
                              <strong>Role:</strong>{" "}
                              <span className="capitalize text-green-600 font-medium">
                                   {guide.role || "N/A"}
                              </span>
                         </p>
                         <p className="text-gray-700 text-sm md:text-base">
                              <strong>Joined:</strong>{" "}
                              {new Date(guide.created_at).toLocaleDateString()}
                         </p>
                         <p className="text-gray-700 text-sm md:text-base">
                              <strong>Last Login:</strong>{" "}
                              {new Date(guide.last_login).toLocaleString()}
                         </p>
                    </div>
               </div>
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
                                                  <IoArrowRedoOutline/>share
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
          </div>
     );
};

export default TourGuideProfilePage;
