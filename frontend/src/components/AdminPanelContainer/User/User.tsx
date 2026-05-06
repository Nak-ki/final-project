import {FC} from 'react';
import { IUserRes } from "../../../interfaces/IUser";
import css from "./User.module.css"

interface IProps {
    user: IUserRes

}

const User :FC<IProps> = ({user}) => {


 return (
  <div className={css.mainDiv}>
      <div className={css.userInfoDiv}>
          {user.id && <p>id: {user.id}</p>}
          {user.email && <p>email: {user.email}</p>}
          {user.name && <p>name: {user.name}</p>}
          {user.surname && <p>surname: {user.surname}</p>}
          {user.isActive && <p>is_active: {user.isActive}</p>}
          {user.last_login && <p>last_login: {user.last_login.toString()}</p>}
      </div>
      <div className={css.statisticDiv}>
          <p>total: {user.statistics.total}</p>
          {user.statistics.agree !== 0 && <p>agree: {user.statistics.agree}</p>}
          {user.statistics.in_work !== 0  && <p>in_work: {user.statistics.in_work}</p>}
          {user.statistics.disagree !== 0  && <p>disagree: {user.statistics.disagree}</p>}
          {user.statistics.dubbing !== 0 && <p>dubbing: {user.statistics.dubbing}</p>}
      </div>
      <div className={css.divButtons}>
          { user.isActive === "true" ?  <button>RECOVERY PASSWORD</button> :  <button>ACTIVATE</button> }
          { user.isBanned === "true" ?   <button>UNBAN</button> :   <button>BAN</button> }
      </div>
  </div>
 );
};

export { User };