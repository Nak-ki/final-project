import { authService } from "../services/authService";
import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

interface IProps extends PropsWithChildren{

}

const Refresh:FC<IProps>  = ({children}) => {
    const navigate = useNavigate()
    const token = authService.getAccessToken();
    const {currentUser} = useAppSelector(state => state.auth)


    if (!token && !currentUser) {
        navigate("/login")
    }

    return (<>{children}</>)
};

export {Refresh};