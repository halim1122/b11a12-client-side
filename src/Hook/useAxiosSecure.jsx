import axios from 'axios';
import useAuthContext from './useAuthContext';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000`
});

const useAxiosSecure = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(true); // ✅ force refresh
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
