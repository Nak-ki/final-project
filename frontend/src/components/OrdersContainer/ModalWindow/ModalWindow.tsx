import { FC, useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import css from './ModalWindow.module.css'
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { IOrderWithComments } from "../../../interfaces/IOrder";
import { joiResolver } from "@hookform/resolvers/joi";
import { updateOrder } from "../../../validators/orderValidator";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { orderActions } from "../../../store/slices/orderSlice";
import { groupActions } from "../../../store/slices/groupSlice";

interface IProps {
    order: IOrderWithComments;

}

const ModalWindow :FC<IProps> = ({order}) => {
    const [changeInput, setChangeInput] = useState<boolean>(false);
    const {handleSubmit, register, reset, formState:{errors}, setValue, getValues} = useForm<{group:string, status:string, name:string, sum:number, surname:string,  alreadyPaid: number, email: string, course: string, phone: string, course_format: string, age: number, course_type: string}>({
        mode:"all",
        resolver: joiResolver(updateOrder)
    })

    // const inputRef = useRef(null)

    const {groups} = useAppSelector(state => state.group)
    const dispatch = useAppDispatch()


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (order.name){
            setValue('name', order.name)
        }
        if (order.surname){
            setValue('surname',order.surname)
        }
        if (order.email){

            setValue('email', order.email)
        }
        if (order.phone){

            setValue('phone', order.phone)
        }
        if (order.age){

            setValue('age', order.age)
        }
        if (order.course){

            setValue('course', order.course)
        }
        if (order.course_format){

            setValue('course_format', order.course_format)
        }
        if (order.course_type){

            setValue('course_type', order.course_type)
        }
        if (order.status){

            setValue('status', order.status)
        }else {
            setValue('status', 'In work')
        }
        if (order.group){

            setValue('group', order.group)
        }
        if (order.sum){

            setValue('sum', order.sum)
        }
        if (order.alreadyPaid){

            setValue('alreadyPaid', order.alreadyPaid)
        }

    }, [order]);

    const editDTO : SubmitHandler<{group:string, status:string, name:string, sum:number, surname:string,  alreadyPaid: number, email: string, course: string, phone: string, course_format: string, age: number, course_type: string}> = (dto) => {
        console.log(dto);
        dispatch(orderActions.update({id: order._id, body: dto}))
        handleClose()
    }

    const addGroup = () => {
        const values = getValues("group")
        dispatch(groupActions.create({name: values}))
       // dispatch(groupActions.create({name: inputRef.current.value}));
        // console.log(inputRef.current.value);
       setChangeInput(false)
    }

        return (
            <div>
                <button className={css.editButton} onClick={handleOpen}>EDIT</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={css.style}>
                        <form onSubmit={handleSubmit(editDTO)} className={css.formWindow}>
                            <div className={css.inputDiv}>
                                <label>Group
                                    { changeInput ?
                                        <>
                                            <input type="text" name={"group"} placeholder={'Group'} {...register("group")}/>
                                            <div>
                                                <button type="button" onClick={() => setChangeInput(false)}>SELECT</button>
                                                <button type="button" onClick={addGroup}>ADD GROUP</button>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <select name={"group"} {...register("group")}>
                                                <option value="">all groups</option>
                                                {
                                                    groups && groups.map((group) => <option value={group.name}>{group.name}</option>)
                                                }
                                            </select>
                                            <div>
                                                <button type="button" onClick={() => setChangeInput(true)} className={css.addGroups}>ADD GROUPS</button>
                                            </div>
                                        </>
                                    }
                                   </label>
                               </div>
                            <label>Status
                                <select name={"status"} {...register("status")}>
                                    <option value="">all status</option>
                                    <option value="In work">In work</option>
                                    <option value="New">New</option>
                                    <option value="Aggre">Aggre</option>
                                    <option value="Disaggre">Disaggre</option>
                                    <option value="Dubbing">Dubbing</option>
                                </select>
                            </label>

                            <label>Name
                                <input className={errors.name && css.inputError} type={"text"} name={"name"} placeholder={"Name"} {...register("name")} />
                                {errors.name && errors.name.message}
                            </label>
                            <label>Sum
                                <input className={errors.sum && css.inputError} type={"number"} name={"sum"} placeholder={"Sum"} {...register("sum")} />
                                {errors.sum && errors.sum.message}
                            </label>
                            <label>Surname
                                <input className={errors.surname && css.inputError} type={"text"} name={"surname"} placeholder={"surname"} {...register("surname")} />
                                {errors.surname && errors.surname.message}
                            </label>
                            <label>Already Paid
                                <input className={errors.alreadyPaid && css.inputError} type={"number"} name={"alreadyPaid"} placeholder={"Already paid"} {...register("alreadyPaid")} />
                                {errors.alreadyPaid && errors.alreadyPaid.message}
                            </label>
                            <label>Email
                                <input className={errors.email && css.inputError} type={"text"} name={"email"} placeholder={"Email"} {...register("email")} />
                                {errors.email && errors.email.message}
                            </label>
                            <label>Course
                                <select name={"course"} {...register("course")}>
                                    <option value="">all courses</option>
                                    <option value="FS">FS</option>
                                    <option value="QACX">QACX</option>
                                    <option value="JCX">JCX</option>
                                    <option value="JSCX">JSCX</option>
                                    <option value="FE">FE</option>
                                    <option value="PCX">PCX</option>
                                </select>
                            </label>
                            <label>Phone
                                <input className={errors.phone && css.inputError} type={"text"} name={"phone"} placeholder={"Phone"} {...register("phone")} />
                                {errors.phone && errors.phone.message}
                            </label>
                            <label>Course format
                                <select name={"course_format"} {...register("course_format")}>
                                    <option value="">all course_format</option>
                                    <option value="static">static</option>
                                    <option value="online">online</option>
                                </select>
                            </label>
                            <label>Age
                                <input className={errors.age && css.inputError} type={"number"} name={"age"} placeholder={"Age"} {...register("age")} />
                                {errors.age && errors.age.message}
                            </label>
                            <label>Course type
                                <select name={"course_type"} {...register("course_type")}>
                                    <option value="">all course_type</option>
                                    <option value="pro">pro</option>
                                    <option value="minimal">minimal</option>
                                    <option value="premium">premium</option>
                                    <option value="incubator">incubator</option>
                                    <option value="vip">vip</option>
                                </select>
                            </label>
                            <div className={css.buttonsDiv}>
                                <button onClick={handleClose}>CLOSE</button>
                                <button>SUBMIT</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        );
};

export {ModalWindow};