import { IDataUser, IUser, IUserRes } from "../interfaces/user.interface";

class UserPresenter {
    public UserPublicInfo(info: IUser): Partial<IUser> {
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

    public getAllUsers(entities: IDataUser[], total: number, limit: number, page: string): {
        data: IUserRes[],
        total: number,
        limit: number,
        page: string
    } {
        return {
            data: entities.map(this.UserResDTO),
            total,
            limit,
            page
        }
    }

    public UserResDTO(entity: IDataUser): IUserRes {
        return {
            _id: entity._id,
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            role: entity.role,
            last_login: entity.last_login,
            isActive: entity.isActive,
            isBanned: entity.isBanned,
            statistics:{
                total: entity.total.length,
                aggre: entity.aggre.length,
                in_work: entity.in_work.length,
                disaggre: entity.disaggre.length,
                dubbing: entity.dubbing.length,
            }
        }
    }
}

export const userPresenter = new UserPresenter();