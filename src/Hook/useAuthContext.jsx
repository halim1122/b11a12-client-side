import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuthContext = () => {

     const userInfo = useContext(AuthContext);

     return userInfo;
};

export default useAuthContext;