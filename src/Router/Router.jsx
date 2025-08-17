import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayouts/RootLayout/RootLayout";
import HomeLayout from "../MainLayouts/HomeLayout/HomeLayout";
import AuthLayout from "../MainLayouts/AuthLayout/AuthLayout";
import LoginForm from "../Form/LoginForm/LoginForm";
import RegisterForm from "../Form/Registerform/RegisterForm";
import DashboardLayout from "../MainLayouts/DashboardLayout/DashboardLayout";
import ManageProfile from "../Dashboard/ManageProfile/ManageProfile";
import ManageStories from "../Dashboard/ManageStories/ManageStories";
import AddStories from "../Dashboard/AddStories/AddStories";
import JoinAsTourGuide from "../Dashboard/JoinAsTourGuide/JoinAsTourGuide";
import PrivateProvider from "../Provider/PrivateProvider";
import AddPackages from "../Dashboard/AddPackages/AddPackages";
import AllTrips from "../pages/AllTrips/AllTrips";
import AboutUs from "../pages/AboutUs/AboutUs";
import PackageDetailsPage from "../pages/PackageDetailsPage/PackageDetailsPage";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";
import ManageCandidates from "../Dashboard/ManageCandidates/ManageCandidates";
import TourGuideProfilePage from "../pages/TourGuideProfilePage/TourGuideProfilePage";
import AllStories from "../pages/AllStoies/AllStories";
import BookingForm from "../Form/BookingForm/BookingForm";
import MyBooking from "../Dashboard/MyBooking/MyBooking";
import Payment from "../Form/Payment/Payment";
import PaymentHistory from "../Dashboard/PaymentHistory/PaymentHistory";
import MyAssignedTours from "../Dashboard/MyAssignedTours/MyAssignedTours";
import ManageProfileAdmin from "../Dashboard/ManageProfileAdmin/ManageProfileAdmin";
import PrivateAdmin from "../Provider/PrivateAdmin";
import ForbiddenPage from "../pages/Forbiden/ForbiddenPage";
import PrivateTourGuide from "../Provider/PrivateTourGuide";
import PrivateUser from "../Provider/PrivateUser";

export const router = createBrowserRouter([
     {
          path: '/',
          Component: RootLayout,
          children: [
               {
                    index: true,
                    Component: HomeLayout
               }, {
                    path: 'community',
                    Component: AllStories
               },
               {
                    path: 'forbidden',
                    Component: ForbiddenPage
               },
               {
                    path: 'allTrips',
                    Component: AllTrips
               },
               {
                    path: 'aboutUs',
                    Component: AboutUs
               },
               {
                    path: 'PackageDetails/:id',
                    element:<PackageDetailsPage></PackageDetailsPage>
               },
               {
                    path: 'tourGuideProfile/:email',
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
          path: '/dashboard',
          element: <PrivateProvider>
               <DashboardLayout></DashboardLayout>
          </PrivateProvider>,
          children: [
               {
                    index: true,
                    Component: HomeLayout,
               },{
                    path: 'manageProfile',
                    element:<PrivateUser><ManageProfile></ManageProfile></PrivateUser>
               },{
                    path: 'managesProfile',
                    element:<PrivateTourGuide><ManageProfile></ManageProfile></PrivateTourGuide>
               },
               {
                    path: 'myBookings',
                    element:<PrivateUser><MyBooking></MyBooking></PrivateUser>
               },
               {
                    path: 'payment/:bookingId',
                    Component: Payment
               },
               {
                    path: 'paymentHistory',
                    element:<PrivateUser><PaymentHistory></PaymentHistory></PrivateUser>
               },
               {
                    path: 'manageStories',
                    Component: ManageStories
               },
               {
                    path: 'addStories',
                    Component: AddStories
               },
               {
                    path: 'addPackage',
                    element: <PrivateAdmin><AddPackages></AddPackages></PrivateAdmin>
               },
               {
                    path: 'joinAsTourGuide',
                    element:<PrivateUser><JoinAsTourGuide></JoinAsTourGuide></PrivateUser>
               },
               {
                    path: 'manageUsers',
                    element:<PrivateAdmin><ManageUsers></ManageUsers></PrivateAdmin>
               },
               {
                    path: 'manageCandidates',
                    element: <PrivateAdmin><ManageCandidates></ManageCandidates></PrivateAdmin>
               },
               {
                    path: 'bookingForm',
                    element:<PrivateUser><BookingForm></BookingForm></PrivateUser>
               },
               {
                    path: 'myAssignedTour',
                    element: <PrivateTourGuide><MyAssignedTours></MyAssignedTours></PrivateTourGuide>
               },
               {
                    path: 'manageProfileAdmin',
                    element: <PrivateAdmin><ManageProfileAdmin></ManageProfileAdmin></PrivateAdmin>
               }
          ]
     }
])