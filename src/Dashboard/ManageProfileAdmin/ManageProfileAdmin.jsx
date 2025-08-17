import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ManageProfile from '../ManageProfile/ManageProfile';
import useAuthContext from '../../Hook/useAuthContext';
import TopRatedPackagesChart from '../../pages/TopRatedPackagesChart/TopRatedPackagesChart';

const axiosInstance = axios.create({
     baseURL: 'https://tourist-for-server-site.vercel.app',
});


const fetchStat = async (url) => {
     const res = await axiosInstance.get(url);
     return res.data.total;
};

const ManageProfileAdmin = () => {

     const { user } = useAuthContext();

     const { data: admin = {}, isLoading } = useQuery({
          queryKey: ["userRole", user?.email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/users/${user.email}`);
               return res.data;
          },
          enabled: !!user?.email
     });



     const totalPayment = useQuery({
          queryKey: ['totalPayment'],
          queryFn: () => fetchStat('/stats/total-payment'),
     });
     const totalGuides = useQuery({
          queryKey: ['totalGuides'],
          queryFn: () => fetchStat('/stats/total-guides'),
     });
     const totalPackages = useQuery({
          queryKey: ['totalPackages'],
          queryFn: () => fetchStat('/stats/total-packages'),
     });
     const totalClients = useQuery({
          queryKey: ['totalClients'],
          queryFn: () => fetchStat('/stats/total-clients'),
     });
     const totalStories = useQuery({
          queryKey: ['totalStories'],
          queryFn: () => fetchStat('/stats/total-stories'),
     });

     if (isLoading) return <p>Loading admin...</p>;

     return (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
               <h2 className="text-2xl font-bold mb-4">Manage Profile</h2>
               <p className="mb-2">Welcome, {admin.displayName || admin.email}!</p>
               <ManageProfile></ManageProfile>

               <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-100 p-4 rounded">
                         <h3 className="font-semibold">Total Payment</h3>
                         <p>৳ {totalPayment.data?.toLocaleString() || 0}</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded">
                         <h3 className="font-semibold">Total Guides</h3>
                         <p>{totalGuides.data || 0}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded">
                         <h3 className="font-semibold">Total Packages</h3>
                         <p>{totalPackages.data || 0}</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded">
                         <h3 className="font-semibold">Total Clients</h3>
                         <p>{totalClients.data || 0}</p>
                    </div>
                    <div className="bg-pink-100 p-4 rounded col-span-2">
                         <h3 className="font-semibold">Total Stories</h3>
                         <p>{totalStories.data || 0}</p>
                    </div>
               </div>
          </div>
     );
};

export default ManageProfileAdmin;