import { ICreateManager, IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { IUserQuery } from "../interfaces/user-query.interface";

class UserService{
    public async createManager(dto: ICreateManager): Promise<IUser> {
        const lastId = await userRepository.getLastIdUser()
        return await userRepository.create(dto, lastId + 1);
    }

    public async getAll(query: IUserQuery): Promise<{data: IUser[], total: number, limit: number}> {

        const [entities, total, limit] = await userRepository.getAll(query)
        return {data: entities, total, limit};
    }

}

export const userService = new UserService();