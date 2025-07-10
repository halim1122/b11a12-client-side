import { createBrowserRouter } from "react-router";
import RootLayout from "../MainLayouts/RootLayout/RootLayout";
import HomeLayout from "../MainLayouts/HomeLayout/HomeLayout";

export const router = createBrowserRouter([
     {
          path: '/',
          Component: RootLayout,
          children:[
               {
                    index: true,
                    Component: HomeLayout
               }
          ]
     }
])