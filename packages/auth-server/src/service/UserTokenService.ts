import {type JWT}               from "next-auth/jwt";
import {type IUserTokenService} from "../api/IUserTokenService";

export class UserTokenService implements IUserTokenService {
    public async token(props: JWT): Promise<JWT> {
        return {
            ...props,
            tokens: this.defaults(),
        };
    }

    public defaults(): string[] {
        return ["user"];
    }
}
