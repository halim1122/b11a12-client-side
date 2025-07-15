import React from 'react';
import { useParams } from 'react-router';

const PackageDetailsPage = () => {
     const { id } = useParams();
     console.log(id)
     return (
          <div>

          </div>
     );
};

export default PackageDetailsPage;