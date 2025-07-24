import LoadingSpinner from "../Sheared/Loading/LoadingSpinner";
import { Navigate, useLocation } from "react-router";
import useAuthContext from "../Hook/useAuthContext";


const PrivateProvider = ({ children }) => {
     const { user, loading } = useAuthContext();
     const location = useLocation();

     if (loading) {
          return <LoadingSpinner />
     }

     if (!user) {
          return <Navigate to="/login" state={{ from: location }} replace />;
     }


          return children;
};

export default PrivateProvider;