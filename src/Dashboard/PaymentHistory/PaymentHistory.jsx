import { useQuery } from '@tanstack/react-query';
import useAuthContext from '../../Hook/useAuthContext';
import LoadingSpinner from '../../Sheared/Loading/LoadingSpinner';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const formatDate = (iso) => new Date(iso).toLocaleString();


const PaymentHistory = () => {

     const { user } = useAuthContext()
     const axiosInstance = useAxiosSecure();

     const { data: payments = [], isPending ,refetch} = useQuery({
          queryKey: ['payments', user?.email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/payments?email=${user.email}`);
               return res.data;
          },
     });

     if (isPending) {
          return <LoadingSpinner />
     }
     refetch();
     return (
          <div className="p-4 min-h-screen">
               <h2 className="text-xl font-bold mb-4">My Payment History</h2>
               <div className="overflow-x-auto">
                    <table className="table table-zebra w-full min-w-[700px]">
                         <thead>
                              <tr className="bg-gray-800 text-white">
                                   <th>Email</th>
                                   <th>Booking ID</th>
                                   <th>Amount (৳)</th>
                                   <th>Transaction ID</th>
                                   <th>Time</th>
                              </tr>
                         </thead>
                         <tbody>
                              {payments.length === 0 ? (
                                   <tr>
                                        <td colSpan={6} className=" text-2xl md:text-4xl text-center mt-10 md:mt-24 text-gray-500">
                                             No Payment History Found
                                        </td>
                                   </tr>
                              ) : (
                                   payments.map((payment, index) => (
                                        <tr key={index}>
                                             <td className="text-xs">{payment.email}</td>
                                             <td className="text-xs">
                                                  {payment.parcelId}
                                             </td>
                                             <td>{payment.amount}</td>
                                             <td className="text-xs">
                                                  {payment.transactionId}
                                             </td>
                                             <td className="text-xs">
                                                  {formatDate(payment.paid_at)}
                                             </td>
                                        </tr>
                                   ))
                              )}
                         </tbody>
                    </table>
               </div>

          </div>
     );
};

export default PaymentHistory;