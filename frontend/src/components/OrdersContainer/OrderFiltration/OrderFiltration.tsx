import { SubmitHandler, useForm } from "react-hook-form";
import { IFiltration } from "../../../interfaces/iFiltration";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { groupActions } from "../../../store/slices/groupSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InsertDriveFile, Replay } from "@mui/icons-material";

import css from "./OrderFiltration.module.css"


const OrderFiltration = () => {
    const dispatch = useAppDispatch()
    const {groups} = useAppSelector(state => state.group)
    const [query, setQuery] = useSearchParams()

    const [typeForStartDate, setTypeForStartDate] = useState<boolean>(false);
    const [typeForEndDate, setTypeForEndDate] = useState<boolean>(false);

    const {handleSubmit, reset, setValue, register } = useForm<IFiltration>()

    const {currentUser} = useAppSelector(state => state.auth)

    const newParams = new URLSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(groupActions.getAll())

        if (query.get('name')){
            setValue('name', query.get('name'))
        }
        if (query.get('surname')){
            setValue('surname', query.get('surname'))
        }
        if (query.get('email')){

            setValue('email', query.get('email'))
        }
        if (query.get('phone')){

            setValue('phone', query.get('phone'))
        }
        if (query.get('age')){

            setValue('age', query.get('age'))
        }
        if (query.get('course')){

            setValue('course', query.get('course'))
        }
        if (query.get('course_format')){

            setValue('course_format', query.get('course_format'))
        }
        if (query.get('course_type')){

            setValue('course_type', query.get('course_type'))
        }
        if (query.get('status')){

            setValue('status', query.get('status'))
        }
        if (query.get('group')){

            setValue('group', query.get('group'))
        }
        if (query.get('start_date')){

            setValue('start_date', query.get('start_date'))
        }
        if (query.get('end_date')){

            setValue('end_date', query.get('end_date'))
        }
        if (query.get('manager')){
            setValue('manager', true)
        }else {
            setValue('manager', false)
        }
    }, [query]);

    const change : SubmitHandler<IFiltration> = async (queries) => {
        if (queries.name) {
            newParams.set('name', queries.name);
        }else {
            setQuery(prev => {

                prev.delete('name')
                prev.delete('page')
                return prev
            })
        }
        if (queries.surname) {
            newParams.set('surname', queries.surname);
        }else {
            setQuery(prev => {

                prev.delete('surname')
                prev.delete('page')
                return prev
            })
        }
        if (queries.email) {
            newParams.set('email', queries.email);
        }else {
            setQuery(prev => {

                prev.delete('email')
                prev.delete('page')
                return prev
            })
        }
        if (queries.phone) {
            newParams.set('phone', queries.phone);
        }else {
            setQuery(prev => {

                prev.delete('phone')
                prev.delete('page')
                return prev
            })
        }
        if (queries.age) {
            newParams.set('age', queries.age);
        }else {
            setQuery(prev => {

                prev.delete('age')
                prev.delete('page')
                return prev
            })
        }
        if (queries.course) {
            newParams.set('course', queries.course);
        }else {
            setQuery(prev => {

                prev.delete('course')
                prev.delete('page')
                return prev
            })
        }
        if (queries.course_format) {
            newParams.set('course_format', queries.course_format);
        }else {
            setQuery(prev => {

                prev.delete('course_format')
                prev.delete('page')
                return prev
            })
        }
        if (queries.course_type) {
            newParams.set('course_type', queries.course_type);
        }else {
            setQuery(prev => {

                prev.delete('course_type')
                prev.delete('page')
                return prev
            })
        }if (queries.status) {
            newParams.set('status', queries.status);
        }else {
            setQuery(prev => {

                prev.delete('status')
                prev.delete('page')
                return prev
            })
        }if (queries.group) {
            newParams.set('group', queries.group);
        }else {
            setQuery(prev => {

                prev.delete('group')
                prev.delete('page')
                return prev
            })
        }
        if (queries.start_date) {
            newParams.set('start_date', queries.start_date);
        }else {
            setQuery(prev => {

                prev.delete('start_date')
                prev.delete('page')
                return prev
            })
        }
        if (queries.end_date) {
            newParams.set('end_date', queries.end_date);
        }else {
            setQuery(prev => {

                prev.delete('end_date')
                prev.delete('page')
                return prev
            })
        }if (queries.manager) {
            newParams.set('manager', (queries.manager).toString());
        }else {
            setQuery(prev => {

                prev.delete('manager')
                prev.delete('page')
                return prev
            })
        }

        setQuery(newParams)

    }

    const resetForm = () => {
        reset()
        navigate('/orders')
    }




    return (
        <div className={css.MainDivFiltration}>
           <form className={css.FormFiltration} onChange={handleSubmit(change)}>
               <div className={css.DivInputs}>
                   <input type={"text"} name={"name"} placeholder={"Name"} {...register("name")} />
                   <input type={"text"} name={"surname"} placeholder={"Surname"} {...register("surname")} />
                   <input type={"text"} name={"email"} placeholder={"Email"} {...register("email")} />
                   <input type={"text"} name={"phone"} placeholder={"Phone"} {...register("phone")} />
                   <input type={"text"} name={"age"} placeholder={"Age"} {...register("age")} />
                   <select name={"course"} {...register("course")}>
                       <option value="">all courses</option>
                       <option value="FS">FS</option>
                       <option value="QACX">QACX</option>
                       <option value="JCX">JCX</option>
                       <option value="JSCX">JSCX</option>
                       <option value="FE">FE</option>
                       <option value="PCX">PCX</option>
                   </select>
                   <select name={"course_format"} {...register("course_format")}>
                       <option value="">all course_format</option>
                       <option value="static">static</option>
                       <option value="online">online</option>
                   </select>
                   <select name={"course_type"} {...register("course_type")}>
                       <option value="">all course_type</option>
                       <option value="pro">pro</option>
                       <option value="minimal">minimal</option>
                       <option value="premium">premium</option>
                       <option value="incubator">incubator</option>
                       <option value="vip">vip</option>
                   </select>
                   <select name={"status"} {...register("status")}>
                       <option value="">all status</option>
                       <option value="In work">In work</option>
                       <option value="New">New</option>
                       <option value="Aggre">Aggre</option>
                       <option value="Disaggre">Disaggre</option>
                       <option value="Dubbing">Dubbing</option>
                   </select>
                   <select name={"group"} {...register("group")}>
                       <option value="">all groups</option>
                       {
                           groups && groups.map((group) => <option value={group.name}>{group.name}</option>)
                       }

                   </select>
                   <input type={typeForStartDate ? "date":"text"} name={"start_date"} placeholder={"Start_date"} onClick={() => setTypeForStartDate(true)} {...register("start_date")} />
                   <input type={typeForEndDate ? "date":"text"} name={"end_date"} placeholder={"End_date"} onClick={() => setTypeForEndDate(true)} {...register("end_date")} />

               </div>
               <div className={css.MyCheckbox}>
                   <label>
                       My
                       <input type={"checkbox"} value={currentUser && currentUser.name} name={"manager"} {...register("manager")} />
                   </label>
               </div>
           </form>
            <div className={css.DivButtons}>
                <button onClick={() => resetForm()}> <Replay/> </button>
                <button> <InsertDriveFile/> </button>
            </div>
        </div>
    );
};

export { OrderFiltration };
