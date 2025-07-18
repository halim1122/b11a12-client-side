import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthContext from "../../Hook/useAuthContext";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ManageProfile = () => {
     const { user } = useAuthContext();
     const navigate = useNavigate();
     const axiosInstance = useAxiosSecure();
     const fileInputRef = useRef();
     const [modalOpen, setModalOpen] = useState(false);
     const [profilePic, setProfilePic] = useState(user?.photoURL || "");
     const [formData, setFormData] = useState({ displayName: user?.displayName || "" });

     const { data: dbUser = {}, isLoading, refetch } = useQuery({
          queryKey: ["userRole", user?.email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/users/${user.email}`);
               return res.data;
          },
          enabled: !!user?.email
     });

     useEffect(() => {
          if (user) {
               Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `Welcome, ${user.displayName}`,
                    showConfirmButton: false,
                    timer: 1500,
               });
          }
     }, [user]);

     if (!user || isLoading) {
          return <LoadingSpinner />;
     }

     const handleChange = (e) => {
          setFormData((prev) => ({
               ...prev,
               [e.target.name]: e.target.value,
          }));
     };

     const handleImageClick = () => {
          fileInputRef.current.click();
     };

     const handleFileChange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const imageForm = new FormData();
          imageForm.append("image", file);

          try {
               const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageAPI_key}`,
                    imageForm
               );
               const imageUrl = res?.data?.data?.url;
               setProfilePic(imageUrl);
               // console.log("Image uploaded:", imageUrl);
          } catch (error) {
               console.error("Image upload failed:", error);
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const updatedData = {
               displayName: formData.displayName,
               photoURL: profilePic,
          };

          try {
               const res = await axiosInstance.patch(`/users/${user.email}`, updatedData);
               if (res.data.modifiedCount > 0) {
                    Swal.fire("Success!", "Profile Updated", "success");
                    setModalOpen(false);
                    refetch();
               }
          } catch (error) {
               console.error("Profile update failed", error);
               Swal.fire("Error", "Could not update profile", "error");
          }
     };

     return (
          <div className="max-w-4xl lg:max-w-5xl mx-auto p-4 sm:p-6">
               <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center sm:text-left">
                    Welcome, {dbUser.displayName}!
               </h1>

               {/* Profile Info */}
               <div className="bg-white shadow rounded p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                    <img
                         src={user.photoURL || "https://via.placeholder.com/100"}
                         alt="User"
                         className="w-24 h-24 lg:w-80 lg:h-80 sm:w-28 sm:h-28 rounded-full shadow shadow-[#007777] object-cover"
                    />
                    <div className="text-center md:text-left space-y-3">
                         <p className="text-md md:text-2xl lg:text-3xl font-medium"><strong>Name:</strong> {dbUser.displayName}</p>
                         <p className="text-md md:text-2xl lg:text-3xl font-medium"><strong>Email:</strong> {dbUser.email}</p>
                         <p className="text-md md:text-2xl lg:text-3xl font-medium"><strong>Role:</strong> {dbUser?.role || 'N/A'}</p>
                         <p className="text-md md:text-2xl lg:text-3xl font-medium"><strong>Last Login:</strong> {new Date(dbUser.last_login).toLocaleString()}</p>
                    </div>
               </div>

               {/* Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
                    <button
                         onClick={() => setModalOpen(true)}
                         className="btn bg-[#007777] text-white w-full sm:w-auto"
                    >
                         Edit Profile
                    </button>
                    {user.role === "admin" ?
                         <button
                              onClick={() => navigate("/dashboard/joinAsTourGuide")}
                              className="btn btn-secondary w-full sm:w-auto"
                         >
                              Apply For Tour Guide
                         </button> : ''}
               </div>

               {/* Modal */}
               {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
                         <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-6 relative">
                              <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

                              <form onSubmit={handleSubmit} className="space-y-4">
                                   <div>
                                        <label className="block mb-1 font-medium">Name</label>
                                        <input
                                             type="text"
                                             name="displayName"
                                             value={formData.displayName}
                                             onChange={handleChange}
                                             className="input input-bordered w-full"
                                             required
                                        />
                                   </div>

                                   {/* Profile Image Upload */}
                                   <div>
                                        <label className="font-semibold block mb-1">Upload Profile Image</label>
                                        <img
                                             src={profilePic || "https://via.placeholder.com/100"}
                                             alt="Profile"
                                             onClick={handleImageClick}
                                             className="w-14 h-14 rounded-full border-2 border-[#007777] cursor-pointer hover:opacity-80 transition"
                                        />
                                        <input
                                             type="file"
                                             accept="image/*"
                                             ref={fileInputRef}
                                             onChange={handleFileChange}
                                             className="hidden"
                                        />
                                   </div>

                                   <div>
                                        <label className="block mb-1 font-medium">Email (cannot edit)</label>
                                        <input
                                             type="email"
                                             value={user.email}
                                             disabled
                                             className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                        />
                                   </div>

                                   <div>
                                        <label className="block mb-1 font-medium">Role (cannot edit)</label>
                                        <input
                                             type="text"
                                             value={dbUser?.role}
                                             disabled
                                             className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                        />
                                   </div>

                                   <div className="flex justify-end gap-3">
                                        <button
                                             type="button"
                                             onClick={() => setModalOpen(false)}
                                             className="btn btn-outline"
                                        >
                                             Cancel
                                        </button>
                                        <button type="submit" onSubmit={handleSubmit} className="btn bg-[#007777] text-white">
                                             Save
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default ManageProfile;
