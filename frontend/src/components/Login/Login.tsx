import {SubmitHandler, useForm} from "react-hook-form";

import {useNavigate} from "react-router-dom";
import css from './Login.module.css'
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { authActions } from "../../store/slices/authSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import { login } from "../../validators/authValidator";
import { useAppSelector } from "../../hooks/useAppSelector";

const LogIn = () => {

    const dispatch = useAppDispatch()
    const {loginError} = useAppSelector(state => state.auth)
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
                {errors.email && <p>{errors.email.message}</p>}
                <h3>Password</h3>
                <input className={css.inputPassword} type="password" placeholder={'Password'} {...register('password')}/>
                {errors.password && <p>{errors.password.message}</p>}
                {loginError && <p>{loginError.message}</p>}
                <button className={css.buttonLog}>LOGIN</button>
            </form>
        </div>
    );
};

export {LogIn};