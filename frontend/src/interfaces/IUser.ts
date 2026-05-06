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

export interface IUserRes {
    id: number;
    _id: string;
    email: string;
    name: string;
    surname: string;
    role: RoleEnum;
    isActive: string;
    isBanned: string;
    last_login: string;
    statistics: {
        total: number,
        agree: number,
        in_work: number,
        disagree: number,
        dubbing: number,
    }
}