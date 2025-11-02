import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authService } from "../../services/authService";
import { useEffect } from "react";
import { authActions } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {Logout, ManageAccounts} from '@mui/icons-material';
import css from "./Header.module.css";
import { RoleEnum } from "../../enums/RoleEnum";

const Header = () => {
    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const access = authService.getAccessToken();

    console.log(access)

    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me())
        } else if (!access) {
            authService.deleteTokens()

            navigate("/login")
        }
    }, [dispatch])


    return (
        <div className={css.Header}>
            <div className={css.logo}>
                <h1>Logo</h1>
            </div>
                <div className={css.tools}>
                    <p>{currentUser && currentUser.name}</p>
                    { currentUser && currentUser.role === RoleEnum.ADMIN && <button className={css.adminButton}><ManageAccounts/></button>}
                    <button className={css.logoutButton}><Logout/></button>
                </div>
        </div>
    );
};

export { Header };
