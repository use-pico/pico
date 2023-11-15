import {decode}                 from "next-auth/jwt";
import {cookies as coolCookies} from "next/headers";
import {NextRequest}            from "next/server";

export namespace getToken {
    export interface Props {
        cookies?: ReturnType<typeof coolCookies> | NextRequest["cookies"];
        secret?: string;
    }
}

export const getToken = async (
    {
        cookies = coolCookies(),
        secret = process.env.NEXTAUTH_SECRET || "nope",
    }: getToken.Props = {
        cookies: coolCookies(),
        secret:  process.env.NEXTAUTH_SECRET || "nope",
    },
) => {
    const cookie = cookies.get("next-auth.session-token")?.value ?? cookies.get("__Secure-next-auth.session-token")?.value;
    if (!cookie) {
        return undefined;
    }
    return cookie ? await decode({
        token: cookie,
        secret,
    }) : undefined;
};
