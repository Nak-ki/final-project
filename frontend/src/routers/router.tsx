import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginPage } from "../pages/LoginPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { OrderPage } from "../pages/OrderPage";
import { LoginedUser } from "../hoc/LoginedUser";
import { Refresh } from "../hoc/Refresh";
import { AdminPanelPage } from "../pages/AdminPanelPage";
import { IsAdmin } from "../hoc/IsAdmin";

export const router = createBrowserRouter([
    {
        path: "/", element:<MainLayout/>, children: [
            {
                index: true, element:<Navigate to={"/login"}/>
            },
            {
                element:<LoginedUser><PublicLayout/></LoginedUser>, children: [
                    {
                        path: "login", element: <LoginPage/>
                    }
                ]
            },
            {
                element:<Refresh><AuthLayout/></Refresh>, children: [
                    {
                        path: "orders", element: <OrderPage/>
                    },
                    {
                        path: "adminPanel", element: <IsAdmin><AdminPanelPage/></IsAdmin>
                    }
                ],
            }
        ]
    }
])