import {decode}      from "next-auth/jwt";
import {NextRequest} from "next/server";

export namespace getToken {
    export interface Props {
        request: NextRequest;
        secret?: string;
    }
}

export const getToken = async (
    {
        request,
        secret = process.env.NEXTAUTH_SECRET || "nope",
    }: getToken.Props,
) => {
    const cookie = request.cookies.get("next-auth.session-token")?.value ?? request.cookies.get("__Secure-next-auth.session-token")?.value;
    if (!cookie) {
        return undefined;
    }
    return cookie ? await decode({
        token: cookie,
        secret,
    }) : undefined;
};
