import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false, select: false },
        role: {
            enum: RoleEnum,
            type: String,
            required: true,
            default: RoleEnum.MANAGER,
        },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        isActive: { type: Boolean, default: false },
        isBanned: { type: Boolean, default: false },
        last_login: { type: String, default: null },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("users", userSchema);