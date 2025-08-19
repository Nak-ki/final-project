import {RoleEnum} from "../enums/role.enum";

export interface IUser {
    id: number;
    _id: string;
    email: string;
    name: string;
    surname: string;
    password: string;
    role: RoleEnum;
    isActive: boolean;
    isBanned: boolean;
    last_login: Date;
}

export type ISignIn  = Pick<IUser, "email" | "password">;

export type ICreateManager = Pick<IUser, "email" | "name" | "surname">;