import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuthContext from "../../Hook/useAuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const JoinAsTourGuide = () => {

     const { user } = useAuthContext();
     const axiosInstance = useAxiosSecure();
     const [loading, setLoading] = useState(false);

     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
     } = useForm();

     const onSubmit = async (data) => {
          setLoading(true)
          try {
               const allData = { ...data, 
                    userName: user.displayName, 
                    userEmail: user.email, 
                    photo: user.photoURL,
                    role: 'user'
                }

               // console.log("Submitted Data:", allData);

               // TODO: Backend এ পাঠাতে পারেন এখানে

               const response = await axiosInstance.post("/applications", allData);
               if (response.data.insertedId) {
                    Swal.fire({
                         icon: "success",
                         title: "Application Submitted!",
                         text: "Thank you for applying as a Tour Guide. We will get back to you soon.",
                         confirmButtonText: "OK",
                    });

                    reset();
               }
          } catch (err) {
               console.error(err);
               Swal.fire("Error", "Story upload failed", "error");
          } finally {
               setLoading(false);
          }
          // Clear form after submission
     };

     return (
          <div className="max-w-2xl mx-auto p-6">
               <h2 className="text-3xl font-semibold mb-6 text-center text-[#007777]">
                    Join as a Tour Guide
               </h2>

               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 bg-white shadow-lg p-6 rounded-lg"
               >
                    {/* Title */}
                    <div>
                         <label className="block font-semibold mb-1">Application Title</label>
                         <input
                              type="text"
                              placeholder="e.g. Tour Enthusiast Application"
                              {...register("title", { required: "Title is required" })}
                              className="input input-bordered w-full"
                         />
                         {errors.title && (
                              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                         )}
                    </div>

                    {/* Reason */}
                    <div>
                         <label className="block font-semibold mb-1">Why do you want to be a Tour Guide?</label>
                         <textarea
                              rows="4"
                              placeholder="Write your motivation here..."
                              {...register("reason", { required: "Reason is required" })}
                              className="textarea textarea-bordered w-full"
                         ></textarea>
                         {errors.reason && (
                              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                         )}
                    </div>

                    {/* CV Link */}
                    <div>
                         <label className="block font-semibold mb-1">CV Link</label>
                         <input
                              type="url"
                              placeholder="https://drive.google.com/..."
                              {...register("cvLink", {
                                   required: "CV link is required",
                                   pattern: {
                                        value: /^https?:\/\/.+$/,
                                        message: "Enter a valid URL",
                                   },
                              })}
                              className="input input-bordered w-full"
                         />
                         {errors.cvLink && (
                              <p className="text-red-500 text-sm mt-1">{errors.cvLink.message}</p>
                         )}
                    </div>

                    {/* Submit */}
                    <div className="text-right">
                         <button type="submit" className="btn text-white bg-[#007777]">
                              {loading ? "Uploading..." : "Submit Application"}
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default JoinAsTourGuide;
