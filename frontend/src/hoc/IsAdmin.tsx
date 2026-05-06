import {Navigate} from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

interface IProps extends PropsWithChildren{

}

const IsAdmin:FC<IProps>  = ({children}) => {
    const {currentUser} = useAppSelector(state => state.auth)

    console.log(currentUser);
    if (currentUser) {
        if (currentUser.role !== "admin"){
            return <Navigate to={'/orders'}/>
        }
    }

    return (<>{children}</>)
};

export {IsAdmin};