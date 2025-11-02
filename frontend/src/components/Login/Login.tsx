import {SubmitHandler, useForm} from "react-hook-form";

import {useNavigate} from "react-router-dom";
import css from './Login.module.css'
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../store/slices/authSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import { login } from "../../validators/authValidator";

const LogIn = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const {register, handleSubmit, formState: {errors}} = useForm<{email:string, password:string}>({
        mode: "all",
        resolver: joiResolver(login)
    })

    const toLogin:SubmitHandler<{email:string, password:string}> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}))


        if (requestStatus === 'fulfilled') {
            navigate('/orders')
        }
    }

    return (
        <div className={css.loginDiv}>
            <form className={css.loginForm}  onSubmit={handleSubmit(toLogin)}>
                <h3>Email</h3>
                <input className={css.inputEmail} type="text" placeholder={'Email'} {...register('email')}/>
                <h3>Password</h3>
                <input className={css.inputPassword} type="password" placeholder={'Password'} {...register('password')}/>
                <button className={css.buttonLog}>LOGIN</button>
            </form>
        </div>
    );
};

export {LogIn};