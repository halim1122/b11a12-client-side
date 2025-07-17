import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AddPackages = () => {
     const { register, handleSubmit, reset, control } = useForm({
          defaultValues: {
               tourPlans: [{ title: "", details: "" }],
          },
     });
     const { fields, append, remove } = useFieldArray({
          control,
          name: "tourPlans",
     });

     const queryClient = useQueryClient();
     const [uploading, setUploading] = useState(false);
     const fileInputRef = useRef();
     const axiosInstance = useAxiosSecure();

     const uploadImages = async (files) => {
          const urls = [];
          for (const file of files) {
               const formData = new FormData();
               formData.append("image", file);
               const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageAPI_key}`,
                    formData
               );
               urls.push(res?.data?.data?.url);
          }
          return urls;
     };

     const { mutateAsync } = useMutation({
          mutationFn: async (newPackage) => {
               const res = await axiosInstance.post("/packages", newPackage);
               return res.data;
          },
          onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ["packages"] });
               Swal.fire("Success!", "Package Added Successfully!", "success");
               reset();
          },
     });

     const onSubmit = async (data) => {
          setUploading(true);
          try {
               const imageFiles = fileInputRef.current.files;
               const imageUrls = await uploadImages(imageFiles);

               const packageData = {
                    name: data.name,
                    description: data.description,
                    images: imageUrls,
                    rating: parseFloat(data.rating),
                    price: parseFloat(data.price),
                    tourTime: data.tourTime,
                    personType: data.personType,
                    tourPlans: data.tourPlans,
                    created_at: new Date().toISOString(),
               };

               await mutateAsync(packageData);
          } catch (err) {
               console.error(err);
               Swal.fire("Error!", "Failed to add package", "error");
          } finally {
               setUploading(false);
          }
     };

     return (
          <div className="max-w-3xl mx-auto px-4 py-6">
               <h2 className="text-2xl font-semibold mb-6 text-center">Add New Tour Package</h2>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Tour Name */}
                    <div>
                         <label className="block font-medium mb-1">Tour Name</label>
                         <input
                              {...register("name", { required: true })}
                              className="input input-bordered w-full"
                              placeholder="Enter tour name"
                         />
                    </div>

                    {/* Description */}
                    <div>
                         <label className="block font-medium mb-1">Tour Description</label>
                         <textarea
                              {...register("description", { required: true })}
                              className="textarea textarea-bordered w-full"
                              placeholder="Tour description"
                         ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                         <label className="block font-medium mb-1">Upload Tour Images (Multiple)</label>
                         <input
                              type="file"
                              accept="image/*"
                              multiple
                              ref={fileInputRef}
                              className="file-input file-input-bordered w-full"
                         />
                    </div>

                    {/* Rating & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div>
                              <label className="block font-medium mb-1">Rating (out of 5)</label>
                              <input
                                   type="number"
                                   step="0.1"
                                   max="5"
                                   min="0"
                                   {...register("rating", { required: true })}
                                   className="input input-bordered w-full"
                              />
                         </div>

                         <div>
                              <label className="block font-medium mb-1">Price ($)</label>
                              <input
                                   type="number"
                                   {...register("price", { required: true })}
                                   className="input input-bordered w-full"
                              />
                         </div>
                    </div>

                    {/* Tour Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div>
                              <label className="block font-medium mb-1">Tour Time</label>
                              <input
                                   {...register("tourTime", { required: true })}
                                   className="input input-bordered w-full"
                                   placeholder="5 Days / 4 Nights"
                                   type="number"
                              />
                         </div>
                         {/* Tour Start Time (as Date) */}
                         <div>
                              <label className="block font-medium mb-1">Tour Start Date</label>
                              <input
                                   {...register("tourStartDate", { required: true })}
                                   type="date"
                                   className="input input-bordered w-full"
                              />
                         </div>
                    </div>
                    {/* Person Type */}
                    <div className="form-control w-full">
                         <label className="label">
                              <span className="label-text font-medium">Person</span>
                         </label>
                         <select
                              {...register("personType", { required: true })}
                              className="select select-bordered w-full"
                         >
                              <option disabled selected>
                                   Choose person type
                              </option>
                              <option value="per person">Per Person</option>
                              <option value="all family">All Family</option>
                         </select>
                    </div>

                    {/* ✅ Tour Plans */}
                    <div className="space-y-4">
                         <h3 className="text-lg font-semibold">Tour Plans</h3>
                         {fields.map((field, index) => (
                              <div
                                   key={field.id}
                                   className="border p-4 rounded-md bg-gray-50 space-y-2"
                              >
                                   <div>
                                        <label className="block font-medium mb-1">Plan Title</label>
                                        <input
                                             {...register(`tourPlans.${index}.title`, { required: true })}
                                             className="input input-bordered w-full"
                                             placeholder="e.g. Day 1 - Arrival"
                                        />
                                   </div>
                                   <div>
                                        <label className="block font-medium mb-1">Plan Details</label>
                                        <textarea
                                             {...register(`tourPlans.${index}.details`, { required: true })}
                                             className="textarea textarea-bordered w-full"
                                             placeholder="Details for this plan..."
                                        ></textarea>
                                   </div>
                                   {fields.length > 1 && (
                                        <button
                                             type="button"
                                             onClick={() => remove(index)}
                                             className="btn btn-sm btn-error"
                                        >
                                             Remove
                                        </button>
                                   )}
                              </div>
                         ))}
                         <button
                              type="button"
                              onClick={() => append({ title: "", details: "" })}
                              className="btn btn-outline btn-primary"
                         >
                              ➕ Add More Plan
                         </button>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                         <button type="submit" className="btn btn-primary" disabled={uploading}>
                              {uploading ? "Uploading..." : "Add Package"}
                         </button>
                    </div>
               </form >
          </div >
     );
};

export default AddPackages;
