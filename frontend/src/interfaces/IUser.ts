import { RoleEnum } from "../enums/RoleEnum";

export interface IUser {
    id: number;
    _id: string;
    email: string;
    name: string;
    surname: string;
    role: RoleEnum;
    isActive: boolean;
    isBanned: boolean;
    last_login: Date;
}