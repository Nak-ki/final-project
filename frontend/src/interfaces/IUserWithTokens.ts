import { IUser } from "./IUser";
import { ITokenPair } from "./ITokenPair";

export interface IUserWithTokens {
    user: IUser
    tokens: ITokenPair
}