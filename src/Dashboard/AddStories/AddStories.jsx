import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthContext from "../../Hook/useAuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import useAxios from "../../Hook/useAxios";

const AddStories = () => {
     const { user } = useAuthContext();
     const navigate = useNavigate();
     const axiosInstance = useAxiosSecure();
     const axiose = useAxios();
     const [loading, setLoading] = useState(false);
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
     } = useForm();

     const { data: guide = {}, isLoading } = useQuery({
          queryKey: ["tourGuide", user.email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/users/${user.email}`);
               return res.data;
          },
          enabled: !!user.email,
     });

     if (isLoading) return <LoadingSpinner />;


     const onSubmit = async (data) => {
          setLoading(true)
          const images = data.images;

          if (!images || images.length === 0) {
               Swal.fire("Error", "Please upload at least one image", "error");
               return;
          }

          try {
               const uploadedImageUrls = [];

               for (const image of images) {
                    const imgData = new FormData();
                    imgData.append("image", image);

                    const res = await axios.post(
                         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageAPI_key}`,
                         imgData
                    );

                    uploadedImageUrls.push(res?.data?.data?.url);
               }

               const storyData = {
                    title: data.title,
                    description: data.description,
                    images: uploadedImageUrls,
                    author: {
                         name: user.displayName,
                         email: user.email,
                         photo: user.photoURL || "",
                         role: guide.role
                    },
                    likedBy:[],
                    created_at: new Date().toISOString(),
               };

               const response = await axiose.post("/stories", storyData);
               // console.log(storyData)
               if (response.data.insertedId) {
                    Swal.fire("Success", "Story added successfully!", "success");
                    reset(); // form reset
                    navigate("/dashboard/manageStories");
               }
          } catch (err) {
               console.error(err);
               Swal.fire("Error", "Story upload failed", "error");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="max-w-3xl mx-auto p-6">
               <h2 className="text-3xl font-bold mb-6 text-[#007777] text-center">Add New Story</h2>
               <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4">
                    {/* Title */}
                    <div>
                         <label className="block font-semibold mb-1">Title</label>
                         <input
                              type="text"
                              {...register("title", { required: true })}
                              className="input input-bordered w-full"
                              placeholder="Enter story title"
                         />
                         {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                    </div>

                    {/* Description */}
                    <div>
                         <label className="block font-semibold mb-1">Description</label>
                         <textarea
                              rows={5}
                              {...register("description", { required: true })}
                              className="textarea textarea-bordered w-full"
                              placeholder="Write your story..."
                         ></textarea>
                         {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                    </div>

                    {/* Images */}
                    <div>
                         <label className="block font-semibold mb-1">Upload Images</label>
                         <input
                              type="file"
                              multiple
                              accept="image/*"
                              {...register("images", { required: true })}
                              className="file-input file-input-bordered w-full"
                         />
                         {errors.images && <span className="text-red-500 text-sm">At least one image is required</span>}
                    </div>

                    <button type="submit" className="btn bg-[#007777] text-white w-full">{loading ? "Uploading..." : "Submit Story"}</button>
               </form>
          </div>
     );
};

export default AddStories;
