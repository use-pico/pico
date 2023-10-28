import {
    type IToken,
    type IUserTokenService
} from "@use-pico/auth";

export class UserTokenService implements IUserTokenService {
    public async token<T extends IToken>(props: T): Promise<T> {
        return {
            ...props,
            tokens: this.defaults(),
        };
    }

    public defaults(): string[] {
        return ["user"];
    }
}
