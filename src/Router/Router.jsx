import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayouts/RootLayout/RootLayout";
import HomeLayout from "../MainLayouts/HomeLayout/HomeLayout";
import AuthLayout from "../MainLayouts/AuthLayout/AuthLayout";
import LoginForm from "../Form/LoginForm/LoginForm";
import RegisterForm from "../Form/Registerform/RegisterForm";
import DashboardLayout from "../MainLayouts/DashboardLayout/DashboardLayout";
import ManageProfile from "../Dashboard/ManageProfile/ManageProfile";
import MyBookings from "../Dashboard/MyBookings/MyBookings";
import ManageStories from "../Dashboard/ManageStories/ManageStories";
import AddStories from "../Dashboard/AddStories/AddStories";
import JoinAsTourGuide from "../Dashboard/JoinAsTourGuide/JoinAsTourGuide";
import PrivateProvider from "../Provider/PrivateProvider";
import AddPackages from "../Dashboard/AddPackages/AddPackages";
import Community from "../pages/Community/Community";
import AllTrips from "../pages/AllTrips/AllTrips";
import AboutUs from "../pages/AboutUs/AboutUs";
import PackageDetailsPage from "../pages/PackageDetailsPage/PackageDetailsPage";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";
import ManageCandidates from "../Dashboard/ManageCandidates/ManageCandidates";
import TourGuideProfilePage from "../pages/TourGuideProfilePage/TourGuideProfilePage";

export const router = createBrowserRouter([
     {
          path: '/',
          Component: RootLayout,
          children: [
               {
                    index: true,
                    Component: HomeLayout
               },{
                    path:'community',
                    Component: Community
               },
               {
                    path: 'allTrips',
                    Component: AllTrips
               },
               {
                    path:'aboutUs',
                    Component: AboutUs
               },
               {
                    path: 'PackageDetails/:id',
                    element: <PrivateProvider>
                         <PackageDetailsPage></PackageDetailsPage>
                    </PrivateProvider>
               },
               {
                    path: 'tourGuideProfile/:id',
                    element: <PrivateProvider>
                         <TourGuideProfilePage></TourGuideProfilePage>
                    </PrivateProvider>
               }
          ]
     },
     {
          path: '/',
          Component: AuthLayout,
          children: [
               {
                    path: 'login',
                    Component: LoginForm
               },
               {
                    path: 'register',
                    Component: RegisterForm
               }
          ]
     },
     {
          path:'/dashboard',
          element: <PrivateProvider>
               <DashboardLayout></DashboardLayout>
          </PrivateProvider>,
          children:[
               {
                    index: true,
                    Component: HomeLayout,
               },{
                    path: 'manageProfile',
                    Component: ManageProfile,
               },
               {
                    path:'myBookings',
                    Component: MyBookings
               },
               {
                    path:'manageStories',
                    Component: ManageStories
               },
               {
                    path:'addStories',
                    Component: AddStories
               },
               {
                    path:'addPackage',
                    Component: AddPackages
               },
               {
                    path:'joinAsTourGuide',
                    Component: JoinAsTourGuide
               },
               {
                    path:'manageUsers',
                    Component: ManageUsers
               },
               {
                    path:'manageCandidates',
                    Component: ManageCandidates
               }
          ]
     }
])