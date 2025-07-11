import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Sheared/Header/Navbar';
import Footer from '../../Sheared/Footer/Footer';

const RootLayout = () => {
     return (
          <div>
               <Navbar></Navbar>
               <Outlet></Outlet>
               <Footer></Footer>
          </div>
     );
};

export default RootLayout;