import {KyselyAdapter}              from "@auth/kysely-adapter";
import {type IContainer}            from "@use-pico/container";
import {withLogger}                 from "@use-pico/logger";
import {
    type Client,
    withClient
}                                   from "@use-pico/orm";
import NextAuth, {type AuthOptions} from "next-auth";
import {type Provider}              from "next-auth/providers";
import {withUserTokenService}       from "../container/withUserTokenService";

export namespace withAuthEndpoint {
    export interface Props {
        options?: Partial<AuthOptions>;
        providers: (Provider | null | false | undefined)[];
        container: IContainer.Type;
    }
}

export const withAuthEndpoint = (
    {
        options,
        providers,
        container,
    }: withAuthEndpoint.Props
) => {
    const userTokenService = withUserTokenService.use(container);
    const logger = withLogger("auth");

    return NextAuth({
        theme:     {
            logo:        "/assets/logo/logo.svg",
            brandColor:  "#1890ff",
            colorScheme: "light",
        },
        session:   {
            strategy: "jwt",
        },
        adapter:   KyselyAdapter(withClient.use(container) as Client<any>),
        providers: providers.filter(Boolean),
        callbacks: {
            jwt: async ({token}) => {
                try {
                    return await userTokenService.token(token);
                } catch (e) {
                    if (e instanceof Error) {
                        logger.error(e.message);
                        logger.error(e.stack);
                    }
                    throw e;
                }
            },
            // session: async (
            //     {
            //         session,
            //         token
            //     }
            // ) => {
            //     const $session: any = {...session};
            //     if ($session && token?.sub) {
            //         $session.user = {
            //             userId: token.sub,
            //             tokens: token.tokens,
            //             ...session.user,
            //         };
            //     }
            //     return $session as Session;
            // },
        },
        ...options,
    });
};
