import {RoleEnum} from "../enums/role.enum";
import { IOrder } from "./order.interface";

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

export interface IDataUser {
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
    total: IOrder[],
    aggre: IOrder[],
    in_work: IOrder[],
    disaggre: IOrder[],
    dubbing: IOrder[],

}

export interface IUserRes {
    id: number;
    _id: string;
    email: string;
    name: string;
    surname: string;
    role: RoleEnum;
    isActive: boolean;
    isBanned: boolean;
    last_login: Date;
    statistics: {
        total: number,
        aggre: number,
        in_work: number,
        disaggre: number,
        dubbing: number,
    }
}

export type ISignIn  = Pick<IUser, "email" | "password">;

export type ICreateManager = Pick<IUser, "email" | "name" | "surname">;