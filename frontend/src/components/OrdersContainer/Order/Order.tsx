import { FC } from "react";
import { IOrderWithComments } from "../../../interfaces/IOrder";
import  "./Order.module.css"


interface IProps {
    order: IOrderWithComments
}

const Order: FC<IProps> = ({order}) => {

    return (
      <tr>
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
    );
};

export { Order };
