import { model, Schema } from "mongoose";
import { IGroup } from "../interfaces/group.interface";


const GroupSchema = new Schema(
    {
        name: {type: String, unique: true, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Group = model<IGroup>("groups", GroupSchema);