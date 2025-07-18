import axios from 'axios';
import React from 'react';

const useAxios = () => {
     const axiose = axios.create({
          baseURL: `http://localhost:5000`
     })
     return axiose;
};

export default useAxios;