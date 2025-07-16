import React from 'react';
import { useParams } from 'react-router';

const TourGuideProfilePage = () => {
     const {email} = useParams();
     console.log(email)
     return (
          <div>
               hi
          </div>
     );
};

export default TourGuideProfilePage;