import { IRes } from "../types/responeType";

import { apiService } from "./apiService";
import { urls } from "../constants/constants";
import { IGroup } from "../interfaces/IGroup";

const groupService = {
    getAll: () : IRes<IGroup[]> => apiService.get(urls.groups.getAll),

    create: (dto: Partial<IGroup>): IRes<IGroup> => apiService.post(urls.groups.create, dto)
}

export {
    groupService
};