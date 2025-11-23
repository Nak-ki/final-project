import {Navigate} from "react-router-dom";
import { authService } from "../services/authService";
import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren{

}

const LoginedUser:FC<IProps>  = ({children}) => {
    const token = authService.getAccessToken();

    if (token) {
        return <Navigate to={'/orders'}/>
    }

    return (<>{children}</>)
};

export {LoginedUser};