import axios from 'axios';
import React from 'react';

const useAxios = () => {
     const axiose = axios.create({
          baseURL: `https://tourist-for-server-site.vercel.app`
     })
     return axiose;
};

export default useAxios;