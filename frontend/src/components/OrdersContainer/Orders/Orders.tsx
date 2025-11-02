
import { useEffect } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { orderActions } from "../../../store/slices/orderSlice";
import { Order } from "../Order/Order";
import css from "./Orders.module.css"
import { OrderPagination } from "../OrderPagination/OrderPagination";
import { OrderFiltration } from "../OrderFiltration/OrderFiltration";


const Orders = () => {
    const {orders} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const {search} = useLocation()
    const [query, setQuery]  = useSearchParams()

    useEffect(() => {
        dispatch(orderActions.getAll({query: search}))
    }, [query])


    const sortedOrders = (column: string) => {
        switch (column) {
            case "id":
                if (query.get('order') === 'id') {
                    setQuery(prev => {
                        prev.set('order', '-id')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'id')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "name":
                if (query.get('order') === 'name') {
                    setQuery(prev => {
                        prev.set('order', '-name')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'name')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "surname":
                if (query.get('order') === 'surname') {
                    setQuery(prev => {
                        prev.set('order', '-surname')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'surname')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "email":
                if (query.get('order') === 'email') {
                    setQuery(prev => {
                        prev.set('order', '-email')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'email')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "phone":
                if (query.get('order') === 'phone') {
                    setQuery(prev => {
                        prev.set('order', '-phone')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'phone')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "age":
                if (query.get('order') === 'age') {
                    setQuery(prev => {
                        prev.set('order', '-age')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'age')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "course":
                if (query.get('order') === 'course') {
                    setQuery(prev => {
                        prev.set('order', '-course')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'course')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "course_format":
                if (query.get('order') === 'course_format') {
                    setQuery(prev => {
                        prev.set('order', '-course_format')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'course_format')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "course_type":
                if (query.get('order') === 'course_type') {
                    setQuery(prev => {
                        prev.set('order', '-course_type')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'course_type')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "status":
                if (query.get('order') === 'status') {
                    setQuery(prev => {
                        prev.set('order', '-status')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'status')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "sum":
                if (query.get('order') === 'sum') {
                    setQuery(prev => {
                        prev.set('order', '-sum')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'sum')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "already_paid":
                if (query.get('order') === 'already_paid') {
                    setQuery(prev => {
                        prev.set('order', '-already_paid')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'already_paid')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "group":
                if (query.get('order') === 'group') {
                    setQuery(prev => {
                        prev.set('order', '-group')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'group')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "created_at":
                if (query.get('order') === 'created_at') {
                    setQuery(prev => {
                        prev.set('order', '-created_at')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'created_at')
                        prev.delete('page')
                        return prev
                    })
                }
                break

            case "manager":
                if (query.get('order') === 'manager') {
                    setQuery(prev => {
                        prev.set('order', '-manager')
                        prev.delete('page')
                        return prev
                    })
                }else {
                    setQuery(prev => {
                        prev.set('order', 'manager')
                        prev.delete('page')
                        return prev
                    })
                }
                break
        }

    }

    return (
        <div className={css.MainDiv}>
        <OrderFiltration/>
            <table>
                <thead>
                <tr>
                    <th onClick={() => sortedOrders('id')}>id</th>
                    <th onClick={() => sortedOrders('name')}>name</th>
                    <th onClick={() => sortedOrders('surname')}>surname</th>
                    <th onClick={() => sortedOrders('email')}>email</th>
                    <th onClick={() => sortedOrders('phone')}>phone</th>
                    <th onClick={() => sortedOrders('age')}>age</th>
                    <th onClick={() => sortedOrders('course')}>course</th>
                    <th onClick={() => sortedOrders('course_format')}>course_format</th>
                    <th onClick={() => sortedOrders('course_type')}>course_type</th>
                    <th onClick={() => sortedOrders('status')}>status</th>
                    <th onClick={() => sortedOrders('sum')}>sum</th>
                    <th onClick={() => sortedOrders('already_paid')}>already_paid</th>
                    <th onClick={() => sortedOrders('group')}>group</th>
                    <th onClick={() => sortedOrders('created_at')}>created_at</th>
                    <th onClick={() => sortedOrders('manager')}>manager</th>
                </tr>
                </thead>
                <tbody>
                {orders && orders.map(order => <Order key={order.id} order={order}/>)}
                </tbody>
            </table>
            <OrderPagination/>
        </div>
    );
};

export { Orders };
