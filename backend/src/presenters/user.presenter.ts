import { IUser } from "../interfaces/user.interface";

class UserPresenter {
    public UserPublicInfo (info: IUser) : Partial<IUser>{
        return {
            _id: info._id,
            id: info.id,
            name: info.name,
            surname: info.surname,
            email: info.email,
            role: info.role,
            last_login: info.last_login,
            isActive: info.isActive,
            isBanned: info.isBanned,
        }
    }
}

export const userPresenter = new UserPresenter();