import {type IUserSession} from "@use-pico/auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: IUserSession;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        tokens: string[];
    }
}
