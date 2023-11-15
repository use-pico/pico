import {type JWT} from "next-auth/jwt";

export interface IUserTokenService {
    token(props: JWT): Promise<JWT>;

    defaults(): string[];
}
