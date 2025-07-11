import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayouts/RootLayout/RootLayout";
import HomeLayout from "../MainLayouts/HomeLayout/HomeLayout";
import AuthLayout from "../MainLayouts/AuthLayout/AuthLayout";
import LoginForm from "../Form/LoginForm/LoginForm";
import RegisterForm from "../Form/Registerform/RegisterForm";

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
     }
])