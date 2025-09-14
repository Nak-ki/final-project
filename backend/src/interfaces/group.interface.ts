
export interface IGroup {
    _id: string
    name: string
}

export type ICreateGroup = Pick<IGroup, "name">;
