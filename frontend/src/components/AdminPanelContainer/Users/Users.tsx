
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useEffect } from "react";
import { userActions } from "../../../store/slices/userSlice";
import { orderActions } from "../../../store/slices/orderSlice";
import { User } from "../User/User";
import { UserPagination } from "../UserPagination/UserPagination";
import css from "./Users.module.css"
import { CreateModalWindow } from "../CreateModaWindow/CreateModaWindow";

const Users = () => {
    const {users, createTrigger} = useAppSelector(state => state.user);
    const {statistics} = useAppSelector(state => state.order);
    const {search} = useLocation()
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(userActions.getAll({query:search}));
        dispatch(orderActions.getStatistics())

    }, [createTrigger, search]);
    console.log(statistics);

    return (
        <div className={css.mainDiv}>
            <div className={css.mainStatisticDiv}>
                <div className={css.divP}><p>Orders statistic:</p></div>
                {statistics &&
                <div className={css.divStatistic}>
                    {<p>total: {statistics.total ? statistics.total : "0"}</p>}
                    {<p>agree: {statistics.agree ? statistics.agree : "0"}</p>}
                    {<p>in_work: {statistics.in_work ? statistics.in_work : "0"}</p>}
                    {<p>disagree: {statistics.disagree ? statistics.disagree : "0"}</p>}
                    {<p>dubbing: {statistics.dubbing ? statistics.dubbing : "0"}</p>}
                    {<p>new: {statistics.new ? statistics.new : "0"}</p>}
                </div>
                }
            </div>
            <CreateModalWindow/>
            <div className={css.usersDiv}>
                {users && users.map((user) => <User key={user.id} user={user} />)}
            </div>
        <UserPagination/>
        </div>
    );
};

export { Users };
