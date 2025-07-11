import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import LoadingSpinner from "../Sheared/Loading/LoadingSpinner";
import { Navigate } from "react-router";


const PrivateProvider= ({ children}) => {
     const { user, loading } = useContext(AuthContext);

     if(loading) {
          return <LoadingSpinner/>
     }

     if(!user) {
         return <Navigate to='/login'></Navigate>
     }

     return children;
};

export default PrivateProvider;