import {withAuth} from "next-auth/middleware";

export namespace withAuthMiddleware {
    export interface Props {
        routes?: Route[];
    }

    export interface Route {
        path: string;
        tokens?: string[];
    }
}

export const withAuthMiddleware = (
    {
        routes = [],
    }: withAuthMiddleware.Props
) => {
    return withAuth(
        () => {
        },
        {
            callbacks: {
                authorized: ({
                                 req,
                                 token
                             }) => {
                    if (!token) {
                        for (const route of routes) {
                            if (req.nextUrl.pathname.includes(route.path)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        }
    );
};
