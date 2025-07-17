import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthContext from '../../Hook/useAuthContext';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const MyAssignedTours = () => {
     const { user } = useAuthContext();
     const axiosInstance = useAxiosSecure();

     const { data: tours = [], isPending, refetch } = useQuery({
          queryKey: ['assigned-tours', user?.displayName],
          queryFn: async () => {
               const res = await axiosInstance.get(`/assigned-tours/${user.displayName}`);
               return res.data;
          },
          enabled: !!user?.displayName
     });

     const updateStatusMutation = useMutation({
          mutationFn: async ({ id, status }) => {
               const res = await axiosInstance.patch(`/bookings/status/${id}`, { status });
               return res.data;
          },
          onSuccess: () => refetch()
     });

     const handleReject = (tour) => {
          Swal.fire({
               title: 'Are you sure?',
               text: `Reject the tour for ${tour.touristName}?`,
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: 'Yes, reject it!',
          }).then((result) => {
               if (result.isConfirmed) {
                    updateStatusMutation.mutate({ id: tour._id, status: 'rejected' });
               }
          });
     };

     const handleAccept = (tour) => {
          updateStatusMutation.mutate({ id: tour._id, status: 'accepted' });
     };

     const formatDate = (isoDate) => {
          return new Date(isoDate).toLocaleString('en-BD', {
               dateStyle: 'medium',
               timeStyle: 'short',
          });
     };

     if (isPending) return <LoadingSpinner />;

     return (
          <div className="overflow-x-auto w-full">

               <h2 className="text-xl font-semibold mb-4">My Assigned Tours</h2>
               <table className="table w-full">
                    <thead>
                         <tr className="bg-gray-800 text-white">
                              <th>Package</th>
                              <th>Tourist</th>
                              <th>Date</th>
                              <th>Price (৳)</th>
                              <th>Status</th>
                              <th>Actions</th>
                         </tr>
                    </thead>
                    <tbody>
                         {tours.map((tour) => (
                              <tr key={tour._id}>
                                   <td>{tour.packageName}</td>
                                   <td>{tour.touristName}</td>
                                   <td>{formatDate(tour.tourDate)}</td>
                                   <td>{tour.price}</td>
                                   <td>
                                        <span className={`badge ${tour.status === 'in review' ? 'badge-info' :
                                                  tour.status === 'accepted' ? 'badge-success' :
                                                       tour.status === 'rejected' ? 'badge-error' :
                                                            'badge-warning'
                                             }`}>
                                             {tour.status}
                                        </span>
                                   </td>
                                   <td className="space-x-1">
                                        <button
                                             className="btn btn-xs btn-success"
                                             disabled={tour.status !== 'in review'}
                                             onClick={() => handleAccept(tour)}
                                        >
                                             Accept
                                        </button>
                                        <button
                                             className="btn btn-xs btn-error"
                                             disabled={tour.status !== 'in review'}
                                             onClick={() => handleReject(tour)}
                                        >
                                             Reject
                                        </button>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
               {tours.length === 0 && <p className='mt-10 ml-10 text-gray-500'>No tour assigned you tuor guide</p>}
          </div>
     );
};

export default MyAssignedTours;
