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

export const router = createBrowserRouter([
     {
          path: '/',
          Component: RootLayout,
          children: [
               {
                    index: true,
                    Component: HomeLayout
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
                    path:'joinAsTourGuide',
                    Component: JoinAsTourGuide
               }
          ]
     }
])