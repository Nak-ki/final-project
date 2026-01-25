export interface IComment {
    _id: string;
    name: string;
    surname: string;
    date: string
    body: string;
    createdAt: Date;
    _userId: string;
    _orderId: string;
    updatedAt: Date;
}