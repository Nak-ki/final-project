import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { PublicLayout } from "../layouts/PublicLayout";
import { LoginPage } from "../pages/LoginPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { OrderPage } from "../pages/OrderPage";
import { LoginedUser } from "../hoc/LoginedUser";
import { Refresh } from "../hoc/Refresh";

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
                    }
                ]
            }
        ]
    }
])