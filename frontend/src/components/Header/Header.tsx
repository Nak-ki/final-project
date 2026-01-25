import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authService } from "../../services/authService";
import { useEffect } from "react";
import { authActions } from "../../store/slices/authSlice";
import {Logout, ManageAccounts} from '@mui/icons-material';
import css from "./Header.module.css";
import { RoleEnum } from "../../enums/RoleEnum";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const {currentUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const access = authService.getAccessToken();

    const logout = async () => {
        const {meta: {requestStatus}} = await dispatch(authActions.logout())

        if (requestStatus === 'fulfilled') {
            navigate("/login");
        }

    }

    useEffect(() => {
        if (access && !currentUser) {
            dispatch(authActions.me())
        }

    }, [dispatch, access])


    return (
        <div className={css.Header}>
            <div className={css.logo}>
                <h1>Logo</h1>
            </div>
                <div className={css.tools}>
                    <p>{currentUser && currentUser.name}</p>
                    { currentUser && currentUser.role === RoleEnum.ADMIN && <button className={css.adminButton}><ManageAccounts/></button>}
                    <button onClick={logout} className={css.logoutButton}><Logout/></button>
                </div>
        </div>
    );
};

export { Header };
