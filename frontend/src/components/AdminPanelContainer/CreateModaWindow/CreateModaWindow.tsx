import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import css from './CreateModalWindow.module.css'
import { SubmitHandler, useForm } from "react-hook-form";

import { joiResolver } from "@hookform/resolvers/joi";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { userActions } from "../../../store/slices/userSlice";
import { createUser } from "../../../validators/userValidator";



const CreateModalWindow  = () => {

    const {handleSubmit, register, reset, formState:{errors}} = useForm<{name:string, surname:string, email: string}>({
        mode:"all",
        resolver: joiResolver(createUser)
    })

    const dispatch = useAppDispatch()


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset()
    }



    const createManager : SubmitHandler<{name:string, surname:string, email: string}> = async (dto) => {
        const {meta: {requestStatus}} =  await dispatch(userActions.create(dto))

        if (requestStatus === 'fulfilled') {
            reset()
            handleClose()
        }
    }

    return (
        <>
            <div className={css.divCreate}>
                <button className={css.createButton} onClick={() => handleOpen()}>CREATE</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={css.style}>
                    <form onSubmit={handleSubmit(createManager)} className={css.formWindow}>
                        <label>Email
                            <input className={errors.email && css.inputError} type={"text"} name={"email"} placeholder={"Email"} {...register("email")} />
                            {errors.email && errors.email.message}
                        </label>
                        <label>Name
                            <input className={errors.name && css.inputError} type={"text"} name={"name"} placeholder={"Name"} {...register("name")} />
                            {errors.name && errors.name.message}
                        </label>
                        <label>Surname
                            <input className={errors.surname && css.inputError} type={"text"} name={"surname"} placeholder={"surname"} {...register("surname")} />
                            {errors.surname && errors.surname.message}
                        </label>
                        <div className={css.buttonsDiv}>
                            <button onClick={handleClose}>CLOSE</button>
                            <button>SUBMIT</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export {CreateModalWindow};