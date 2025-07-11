import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../Layouts/AuthLayouts/Provider/AuthProvider/AuthProvider';

const axiosSecure = axios.create({
     baseURL: `http://localhost:5000`
});
const useAxiosSecure = () => {

     const { user } = useContext(AuthContext);

     axiosSecure.interceptors.request.use(config => {
          config.headers.Authorization = `Bearer ${user.accessToken}`
          return config;
     }, error => {
          return Promise.reject(error);
     });
     return axiosSecure;
};

export default useAxiosSecure;