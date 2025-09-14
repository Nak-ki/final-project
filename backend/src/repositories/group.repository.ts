
import { ICreateGroup, IGroup } from "../interfaces/group.interface";
import { Group } from "../models/group.model";

class GroupRepository {

    public async getGroups(): Promise<IGroup[]> {
        return await Group.find()
    }

    public async createGroup(dto: ICreateGroup): Promise<IGroup> {
        return await Group.create(dto);
    }

    public async getByName(dto: ICreateGroup): Promise<IGroup> {
        return await Group.findOne(dto)
    }

}

export const groupRepository = new GroupRepository();
