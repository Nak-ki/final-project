import { IRes } from "../types/responeType";

import { apiService } from "./apiService";
import { urls } from "../constants/constants";

const commentService = {

    create: (body: Partial<{body:string}>, id: string): IRes<void> => apiService.post(urls.comments.create(id), body)
}

export {
   commentService
};