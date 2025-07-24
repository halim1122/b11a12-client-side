import useAuthContext from '../Hook/useAuthContext';
import LoadingSpinner from '../Sheared/Loading/LoadingSpinner';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router';

const PrivateUser = ({ children }) => {
     const { user, loading } = useAuthContext();
     const axiosInstance = useAxiosSecure();

     const { data: dbUser = {}, isLoading } = useQuery({
          queryKey: ["userRole", user?.email],
          queryFn: async () => {
               const res = await axiosInstance.get(`/users/${user?.email}`);
               return res.data;
          },
          enabled: !!user?.email
     });

     if (loading || isLoading) {
          return <LoadingSpinner />
     }

     if (!user || dbUser?.role !== "user"){
          return <Navigate to='/forbidden'></Navigate>
     }

     return children;
};

export default PrivateUser;