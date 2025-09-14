
import { ApiError } from "../errors/api.error";
import { ICreateGroup, IGroup } from "../interfaces/group.interface";
import { groupRepository } from "../repositories/group.repository";

class GroupService {
    public async getGroups(): Promise<IGroup[]> {
      return await groupRepository.getGroups()

    }

    public async createGroup( dto: ICreateGroup): Promise<IGroup> {
        const ifNameUnique = await groupRepository.getByName(dto)

        if (ifNameUnique) {
            throw new ApiError("This name of group exist", 409)
        }

        return await groupRepository.createGroup(dto);
    }

}

export const groupService = new GroupService();