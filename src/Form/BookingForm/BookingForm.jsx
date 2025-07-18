import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuthContext from "../../Hook/useAuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Sheared/Loading/LoadingSpinner";

const BookingForm = () => {
     const location = useLocation();
     const selectedPackage = location.state?.packageData;

     // console.log("Received Package Data:", selectedPackage);
     const { user } = useAuthContext();
     const axiosInstance = useAxiosSecure();
     const [tourDate, setTourDate] = useState(null);
     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     // console.log(selectedPackage)

     const { data: guides = [], isLoading } = useQuery({
          queryKey: ["tour-guides"],
          queryFn: async () => {
               const res = await axiosInstance.get("/users?role=tour-guide");
               return res.data;
          },
     });

     if (isLoading) return <LoadingSpinner />;


     const onSubmit = async (data) => {
          if (!user) {
               Swal.fire("Login Required", "Please log in to book the tour.", "info");
               return navigate("/login");
          }

          const bookingData = {
               packageName: selectedPackage?.name,
               touristName: user.displayName,
               touristEmail: user.email,
               touristImage: user.photoURL,
               price: selectedPackage?.price,
               tourDate,
               guideName: data.guideName,
               status: "pending",
          };

          try {
               await axiosInstance.post("/bookings", bookingData);

               Swal.fire({
                    title: "Confirm your Booking",
                    text: "Your booking request has been submitted!",
                    icon: "success",
                    confirmButtonText: "Go to My Bookings",
               }).then((result) => {
                    if (result.isConfirmed) {
                         navigate("/dashboard/myBookings");
                    }
               });
          } catch (err) {
               console.error(err);
               Swal.fire("Error", "Booking failed. Please try again.", "error");
          }
     };

     return (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
               <h2 className="text-2xl font-bold mb-4">Book Your Tour</h2>

               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Package Name */}
                    <div>
                         <label className="font-medium">Package Name</label>
                         <input
                              type="text"
                              value={selectedPackage?.name || ""}
                              readOnly
                              className="input input-bordered w-full"
                         />
                    </div>

                    {/* Tourist Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                              <label className="font-medium">Tourist Name</label>
                              <input
                                   type="text"
                                   value={user?.displayName}
                                   readOnly
                                   className="input input-bordered w-full"
                              />
                         </div>

                         <div>
                              <label className="font-medium">Email</label>
                              <input
                                   type="email"
                                   value={user?.email}
                                   readOnly
                                   className="input input-bordered w-full"
                              />
                         </div>
                    </div>

                    <div>
                         <label className="font-medium">Tourist Image URL</label>
                         <input
                              type="text"
                              value={user?.photoURL}
                              readOnly
                              className="input input-bordered w-full"
                         />
                    </div>

                    {/* Price */}
                    <div>
                         <label className="font-medium">Price</label>
                         <input
                              type="text"
                              value={selectedPackage?.price || ""}
                              readOnly
                              className="input input-bordered w-full"
                         />
                    </div>

                    {/* Tour Date */}
                    <div>
                         <label className="font-medium block mb-1">Tour Date</label>
                         <DatePicker
                              selected={tourDate}
                              onChange={(date) => setTourDate(date)}
                              dateFormat="dd/MM/yyyy"
                              minDate={new Date()}
                              placeholderText="Select a date"
                              className="input input-bordered w-full"
                              required
                         />
                    </div>

                    {/* Guide Selection */}
                    <div>
                         <label className="font-medium">Tour Guide</label>
                         <select
                              {...register("guideName", { required: true })}
                              className="select select-bordered w-full"
                         >
                              <option value="">Select a Guide</option>
                              {guides.map((guide) => (
                                   <option key={guide._id} value={guide.displayName}>
                                        {guide.displayName}
                                   </option>
                              ))}
                         </select>
                         {errors.guideName && <span className="text-red-500 text-sm">Guide is required</span>}
                    </div>

                    <button
                         type="submit"
                         className="btn btn-primary w-full mt-4"
                    >
                         Book Now
                    </button>
               </form>
          </div>
     );
};

export default BookingForm;
