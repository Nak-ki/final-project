import { ICreateManager, IUser, IUserRes } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { IUserQuery } from "../interfaces/user-query.interface";
import { userPresenter } from "../presenters/user.presenter";

class UserService{
    public async createManager(dto: ICreateManager): Promise<IUser> {
        const lastId = await userRepository.getLastIdUser()
        return await userRepository.create(dto, lastId + 1);
    }

    public async getAll(query: IUserQuery): Promise<{data: IUserRes[], total: number, limit: number, page: string}> {

        const [entities, total, limit] = await userRepository.getAll(query)

        return userPresenter.getAllUsers(entities, total, limit, query.page);
    }

    public async getById(userId: string): Promise<IUser> {
        return await userRepository.getById(userId);
    }

}

export const userService = new UserService();