import {type IToken} from "./IToken";

export interface IUserTokenService {
    token<T extends IToken>(props: T): Promise<T>;

    defaults(): string[];
}
