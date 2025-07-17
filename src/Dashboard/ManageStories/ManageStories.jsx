import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuthContext from "../../Hook/useAuthContext";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const ManageStories = () => {
     const [openImageModal, setOpenImageModal] = useState(false);
     const [openEditModal, setOpenEditModal] = useState(false);
     const [activeStoryImages, setActiveStoryImages] = useState([]);
     const [editingStory, setEditingStory] = useState(null);
     const [editForm, setEditForm] = useState({ title: "", description: "" });

     const axiosInstance = useAxiosSecure();
     const queryClient = useQueryClient();
     const { user } = useAuthContext();
     const { data: stories = [], isLoading, refetch } = useQuery({
          queryKey: ["stories", user?.email],
          queryFn: async () => {
               if (!user?.email) return [];  
               const res = await axiosInstance.get(`/stories/${user?.email}`);
               return res.data;
          },
          enabled: !!user?.email,
     });


     const updateMutation = useMutation({
          mutationFn: async ({ id, updatedData }) => {
               const res = await axiosInstance.patch(`/stories/${id}`, updatedData);
               return res.data;
          },
          onSuccess: () => {
               queryClient.invalidateQueries(["stories"]);
               Swal.fire("Updated!", "Story updated successfully!", "success");
               setOpenEditModal(false);
          },
     });

     const handleEditClick = (story) => {
          setEditingStory(story);
          setEditForm({
               title: story.title,
               description: story.description,
          });
          setOpenEditModal(true);
     };

     const handleEditChange = (e) => {
          const { name, value } = e.target;
          setEditForm((prev) => ({ ...prev, [name]: value }));
     };

     const handleEditSubmit = (e) => {
          e.preventDefault();
          if (!editingStory?._id) return;
          updateMutation.mutate({
               id: editingStory._id,
               updatedData: editForm,
          });
     };

     const handleDelete = async (id) => {
          const confirm = await Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Yes, delete it!",
          });

          if (confirm.isConfirmed) {
               await axiosInstance.delete(`/stories/${id}`);
               Swal.fire("Deleted!", "Your story has been deleted.", "success");
               refetch();
          }
     };


     if (isLoading) return <LoadingSpinner />;
     return (

          <div className="max-w-7xl mx-auto p-4 md:p-6">
               <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Manage Your Stories</h2>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {stories.length === 0 && <p>No stories found.</p>}
                    {stories.map((story) => (
                         <div key={story._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col">
                              {/* Images */}
                              <div
                                   className={`grid overflow-hidden ${story?.images?.length === 1
                                        ? "grid-cols-1 grid-rows-1"
                                        : story?.images?.length === 2
                                             ? "grid-cols-1 grid-rows-2"
                                             : "grid-cols-2 grid-rows-2"
                                        } h-[250px] w-full gap-[2px]`}
                              >
                                   {story.images?.slice(0, 4).map((img, index) => {
                                        const isLast = index === 3 && story.images.length > 4;
                                        return (
                                             <div
                                                  key={index}
                                                  className="relative w-full h-full cursor-pointer"
                                                  onClick={() => {
                                                       setActiveStoryImages(story.images);
                                                       setOpenImageModal(true);
                                                  }}
                                             >
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

                              {/* Body */}
                              <div className="p-4 flex flex-col flex-grow justify-between">
                                   <div>
                                        <h2 className="text-lg font-semibold">{story.title}</h2>
                                        <p className="line-clamp-3 text-sm text-gray-700">{story.description}</p>
                                   </div>
                                   <div className="flex justify-between items-center mt-4">
                                        <button onClick={() => handleEditClick(story)} className="btn bg-[#007777] text-white btn-sm">
                                             Edit
                                        </button>
                                        <button
                                             onClick={() => handleDelete(story._id)}
                                             className="btn btn-error btn-sm"
                                        >
                                             Delete
                                        </button>
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
                                        <button className="btn" onClick={() => setOpenImageModal(false)}>
                                             Close
                                        </button>
                                   </form>
                              </div>
                         </div>
                    </dialog>
               )}

               {/* Edit Modal */}
               {openEditModal && (
                    <dialog className="modal modal-open">
                         <div className="modal-box max-w-md w-full">
                              <h3 className="font-bold text-lg mb-4">Edit Story</h3>
                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                   <div>
                                        <label className="block mb-1 font-medium">Title</label>
                                        <input
                                             name="title"
                                             value={editForm.title}
                                             onChange={handleEditChange}
                                             className="input input-bordered w-full"
                                        />
                                   </div>
                                   <div>
                                        <label className="block mb-1 font-medium">Description</label>
                                        <textarea
                                             name="description"
                                             value={editForm.description}
                                             onChange={handleEditChange}
                                             className="textarea textarea-bordered w-full"
                                             rows={4}
                                        />
                                   </div>
                                   <div className="modal-action flex justify-end gap-2">
                                        <button
                                             type="button"
                                             onClick={() => setOpenEditModal(false)}
                                             className="btn btn-outline"
                                        >
                                             Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                             Save
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </dialog>
               )}
          </div>
     );
};

export default ManageStories;
