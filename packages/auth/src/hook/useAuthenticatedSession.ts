"use client";

import {useSession} from "next-auth/react";
import {useRouter}  from "next/router";
import {useEffect}  from "react";

export namespace useAuthenticatedSession {
    export interface Props {
        redirect?: string;
    }
}

export const useAuthenticatedSession = (
    {
        redirect,
    }: useAuthenticatedSession.Props
) => {
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (redirect && session.status === "authenticated") {
                await router.push(redirect);
            }
        })();
    }, [redirect, session.status]);
    return session;
};
