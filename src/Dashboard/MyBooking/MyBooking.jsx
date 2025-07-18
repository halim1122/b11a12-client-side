import React, { useState } from 'react';
import useAuthContext from '../../Hook/useAuthContext';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import ConfettiComponent from '../../ConfettiComponent';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const MyBooking = () => {
     const { user } = useAuthContext();
     const axiosInstance = useAxiosSecure();
     const navigate = useNavigate();
     const [viewBooking, setViewBooking] = useState(null);

     const { data: bookings = [], isPending, refetch } = useQuery({
          queryKey: ['bookings', user.email],
          queryFn: async () => {
               const result = await axiosInstance.get(`/bookings?email=${user.email}`);
               return result.data;
          },
          enabled: !!user?.email
     });

     console.log(bookings)

     if (isPending) return <LoadingSpinner />;

     const handleView = (booking) => {
          setViewBooking(booking);
     };

     const handlePay = (id) => {
          navigate(`/dashboard/payment/${id}`);
     };

     const handleDelete = async (booking) => {
          const result = await Swal.fire({
               title: "Are you sure?",
               text: `You want to delete ${booking.packageName}?`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               cancelButtonColor: "#3085d6",
               confirmButtonText: "Yes, delete it!",
          });

          if (result.isConfirmed) {
               try {
                    const res = await axiosInstance.delete(`/bookings/${booking._id}`);
                    if (res.data.deletedCount) {
                         Swal.fire({
                              title: "Deleted!",
                              text: `Booking has been deleted.`,
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500,
                         });
                    }
                    refetch();
               } catch (err) {
                    Swal.fire("Error", err.message, "error");
               }
          }
     };

     const formatDate = (isoDate) => {
          return new Date(isoDate).toLocaleString("en-BD", {
               dateStyle: "medium",
               timeStyle: "short",
          });
     };

     return (
          <div className="w-full overflow-x-auto">
               {bookings.length === 0 && <p className='text-gray-500 min-h-screen text-2xl md:text-4xl text-center mt-10 md:mt-24'>No Booking Any Package</p>}
               <table className="table table-zebra w-full min-w-[700px]">
                    <thead>
                         <tr className='bg-gray-800 text-white'>
                              <th className="text-xs md:text-sm">Package</th>
                              <th className="text-xs md:text-sm">Guide</th>
                              <th className="text-xs md:text-sm">Tour Date</th>
                              <th className="text-xs md:text-sm">Price (৳)</th>
                              <th className="text-xs md:text-sm">Status</th>
                              <th className="text-xs md:text-sm">Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {bookings.map((booking) => (
                              <tr key={booking._id}>
                                   <td className="text-xs md:text-sm">{booking.packageName}</td>
                                   <td className="text-xs md:text-sm">{booking.guideName}</td>
                                   <td className="text-xs md:text-sm">{formatDate(booking.tourDate)}</td>
                                   <td className="text-xs md:text-sm">{booking.price}</td>
                                   <td>
                                        <span className={`badge text-xs ${booking.status === "pending"
                                                  ? "badge-warning"
                                                  : booking.status === "in review"
                                                       ? "badge-info"
                                                       : booking.status === "accepted"
                                                            ? "badge-success"
                                                            : "badge-error"
                                             }`}>
                                             {booking.status}
                                        </span>
                                   </td>
                                   <td className="space-x-1">
                                        <button
                                             className="btn btn-xs text-white bg-[#007777]"
                                             onClick={() => handleView(booking)}
                                        >
                                             View
                                        </button>
                                        {booking.status === "pending" && (
                                             <>
                                                  <button
                                                       className="btn btn-xs btn-success"
                                                       onClick={() => handlePay(booking._id)}
                                                  >
                                                       Pay
                                                  </button>
                                                  <button
                                                       className="btn btn-xs btn-error"
                                                       onClick={() => handleDelete(booking)}
                                                  >
                                                       Cancel
                                                  </button>
                                             </>
                                        )}
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>

               {viewBooking && (
                    <dialog open className="modal modal-open">
                         <div className="modal-box max-w-2xl w-full">
                              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center border-b pb-2">📄 Booking Details</h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                                   <div>
                                        <p><span className="font-semibold">📦 Package:</span> {viewBooking.packageName}</p>
                                        <p><span className="font-semibold">👤 Tourist:</span> {viewBooking.touristName}</p>
                                        <p><span className="font-semibold">📧 Email:</span> {viewBooking.touristEmail}</p>
                                        <p><span className="font-semibold">🧭 Guide:</span> {viewBooking.guideName}</p>
                                        <p><span className="font-semibold">🗓️ Date:</span> {formatDate(viewBooking.tourDate)}</p>
                                        <p><span className="font-semibold">💳 Price:</span> ৳{viewBooking.price}</p>
                                        <p>
                                             <span className="font-semibold">📌 Status:</span>{" "}
                                             <span className={`badge px-2 py-1 text-xs ${viewBooking.status === "pending"
                                                       ? "badge-warning"
                                                       : viewBooking.status === "in review"
                                                            ? "badge-info"
                                                            : viewBooking.status === "accepted"
                                                                 ? "badge-success"
                                                                 : "badge-error"
                                                  }`}>
                                                  {viewBooking.status}
                                             </span>
                                        </p>
                                   </div>

                                   <div className="flex justify-center items-center">
                                        <img
                                             src={viewBooking.touristImage}
                                             alt="Tourist"
                                             className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border shadow"
                                        />
                                   </div>
                              </div>

                              <div className="modal-action mt-6 flex justify-end">
                                   <button className="btn btn-outline" onClick={() => setViewBooking(null)}>
                                        Close
                                   </button>
                              </div>
                         </div>
                    </dialog>

               )}
               {bookings.length === 3 && <ConfettiComponent/>}
          </div>
     );
};

export default MyBooking;
