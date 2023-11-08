import {withAuth}     from "next-auth/middleware";
import {NextResponse} from "next/server";
import {getToken}     from "../utils/getToken";

export namespace withAuthMiddleware {
    export interface Props {
        routes?: Route[];
    }

    export interface Route {
        path: string;
        target: string;
        auth: boolean;
        tokens?: string[];
    }
}

export const withAuthMiddleware = (
    {
        routes = [],
    }: withAuthMiddleware.Props
) => {
    return withAuth(
        async request => {
            const token = await getToken({
                request,
            });
            for (const {
                path,
                target,
                auth
            } of routes) {
                if (request.nextUrl.pathname.includes(path)) {
                    if ((token && !auth) || (!token && auth)) {
                        return NextResponse.redirect(
                            new URL(
                                target,
                                request.url
                            )
                        );
                    }
                }
            }
            return NextResponse.next();
        },
        {
            callbacks: {
                async authorized({req}) {
                    const token = await getToken({request: req});
                    for (const {
                        path,
                        auth
                    } of routes) {
                        if (req.nextUrl.pathname.includes(path)) {
                            if (!token && auth) {
                                return false;
                            }
                        }
                    }
                    return true;
                },
            },
        }
    );
};
