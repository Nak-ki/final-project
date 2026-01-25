import { FC } from "react";
import { IOrderWithComments } from "../../../interfaces/IOrder";
import css from  "./Order.module.css"
import { useDropdownOrderContext } from "../../../hooks/useDropdownOrderContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { comment } from "../../../validators/commentValidator";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { commentActions } from "../../../store/slices/commentSlice";
import { ModalWindow } from "../ModalWindow/ModalWindow";


interface IProps {
    order: IOrderWithComments,
    index: number
}

const Order: FC<IProps> = ({order, index}) => {
    const {reset, register, handleSubmit, formState: {errors}} = useForm<{body:string}>({
        mode: "all",
        resolver: joiResolver(comment)
    })
    const dispatch = useAppDispatch()

    const {dropdownOrder, setDropdownOrder} = useDropdownOrderContext()
    const isGrey = index % 2

    const openDropdown = () => {
        if (dropdownOrder !== `tr${order.id}`) {
            setDropdownOrder(`tr${order.id}`)
        }else {
            setDropdownOrder(null)
        }
    }

    const submitComment: SubmitHandler<{ body: string }> = ({body})=> {
        dispatch(commentActions.createComment({body, id: order._id}))
        reset()
    }

    return (
      <>
        <tr className={isGrey !== 0 ? css.even : css.odd} onClick={openDropdown}>
          <td>{order.id}</td>
          <td>{order.name ? order.name : "null"}</td>
          <td>{order.surname ? order.surname : "null"}</td>
          <td>{order.email ? order.email : "null"}</td>
          <td>{order.phone ? order.phone : "null"}</td>
          <td>{order.age ? order.age : "null"}</td>
          <td>{order.course ? order.course : "null"}</td>
          <td>{order.course_format ? order.course_format : "null"}</td>
          <td>{order.course_type ? order.course_type : "null"}</td>
          <td>{order.status ? order.status : "null"}</td>
          <td>{order.sum ? order.sum : 'null'}</td>
          <td>{order.alreadyPaid ? order.alreadyPaid : "null"}</td>
          <td>{order.group ? order.group : "null"}</td>
          <td>{order.created_at ? order.created_at : "null"}</td>
          <td>{order.manager ? order.manager : "null"}</td>
        </tr>
          {dropdownOrder === `tr${order.id}` &&
              <tr className={isGrey !== 0 ? css.treven : css.trodd}>
                  <td colSpan={15}>
                      <div className={isGrey !== 0 ? css.dropdownGrey : css.dropdownWhite}>
                          <p className={css.message}><b>Message</b>: {order.msg ? order.msg : "null"}</p>
                          <p className={css.utm}>UTM: {order.utm ? order.utm : "null"}</p>
                          <div className={css.divForm}>
                              {/*{ order.comments.length > 0 && <div  className={css.commentsDiv}>*/}
                              {/*    {order.comments.length > 0 && order.comments.map(comment =>*/}
                              {/*        <div className={css.commentDiv}>*/}
                              {/*            <p className={css.p}>{comment.body}</p>*/}
                              {/*            <p className={css.p}>{comment.name} {comment.surname} {comment.createdAt}</p>*/}
                              {/*        </div>)}*/}
                              { order.comments && <div  className={css.commentsDiv}>
                                  {order.comments && order.comments.map(comment =>
                                      <div className={css.commentDiv}>
                                          <p className={css.p}>{comment.body}</p>
                                          <p className={css.p}>{comment.name} {comment.surname} {comment.date}</p>
                                      </div>)}
                              </div>}
                              <form className={css.form} onSubmit={handleSubmit(submitComment)}>
                                  <input className={errors.body ? css.inputError : css.input} placeholder={'Comment'} name={'body'} {...register("body")}/>

                                  <button className={css.button} >SUBMIT</button>
                                  {errors.body && errors.body.message}
                              </form>
                          </div>
                          <ModalWindow order={order}/>
                      </div>
                  </td>
              </tr>


          }

      </>
    );
};

export { Order };
