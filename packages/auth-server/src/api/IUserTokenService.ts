import {type IToken} from "@use-pico/auth";

export interface IUserTokenService {
    token<T extends IToken>(props: T): Promise<T>;

    defaults(): string[];
}
