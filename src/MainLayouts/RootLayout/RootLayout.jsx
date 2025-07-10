import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
     return (
          <div>
               header
               <Outlet></Outlet>
               footer
          </div>
     );
};

export default RootLayout;