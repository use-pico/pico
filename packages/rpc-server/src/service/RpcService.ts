import {
    getToken,
    UserService,
    withUserService,
    withUserSession
}                         from "@use-pico/auth-server";
import {
    type IContainer,
    lazyOf,
    withContainer
}                         from "@use-pico/container";
import {
    type IRedisService,
    withRedisService
}                         from "@use-pico/redis";
import {
    RpcBulkRequestSchema,
    RpcBulkResponseSchema,
    RpcResponseSchema
}                         from "@use-pico/rpc";
import {
    ErrorSchema,
    parse,
    parse$
}                         from "@use-pico/schema";
import {NextResponse}     from "next/server";
import {type IHandler}    from "../api/IHandler";
import {type IRpcService} from "../api/IRpcService";

export class RpcService implements IRpcService {
    static inject = [
        lazyOf(withContainer.inject),
        lazyOf(withRedisService.inject),
    ];

    constructor(
        protected container: IContainer.Type,
        protected redisService: IRedisService,
    ) {
    }

    public async handle(
        {
            request,
            context
        }: IRpcService.HandleProps
    ): Promise<NextResponse> {
        const user = await getToken({cookies: request.cookies});
        const bulks = parse$(RpcBulkRequestSchema, await request.json());
        if (!bulks.success) {
            return NextResponse.json({
                error: {
                    code:    422,
                    message: "Some strange request, so here you have some strange response",
                },
            } as ErrorSchema.Type, {
                status: 422,
            });
        }

        const container = this.container.child();
        /**
         * Because some services needs an access container itself, it must be connected to the right (child) container
         * or it would resolve services from the global container.
         */
        withContainer.value(container, container);
        if (user) {
            /**
             * When we have user, we must create a new UserService as it's bound to global container, so
             * it would not see current user session.
             */
            withUserService.bind(container, UserService);
            /**
             * Bind user session to the container.
             */
            withUserSession.value(container, {
                userId: user.sub as string,
                user,
                tokens: user.tokens as string[],
            });
        }
        context?.(container);

        const response = new Map<string, RpcResponseSchema.Type>();

        for (const [id, bulk] of Object.entries(bulks.data.bulk)) {
            try {
                const {
                    handle,
                    schema,
                    cache,
                } = container.resolve<IHandler<any, any>>(bulk.service);

                response.set(id, {
                    data: await this.redisService.cache(
                        [bulk.service, bulk.data],
                        async () => parse(
                            schema.response,
                            await handle({
                                request: parse(schema.request, bulk.data),
                                container,
                            })
                        ),
                        cache?.bypass
                    ),
                });
            } catch (e) {
                console.error(e);
                if (e instanceof Error) {
                    response.set(id, {
                        error: {
                            code:    500,
                            message: e.message,
                        },
                    });
                    continue;
                }
                response.set(id, {
                    error: {
                        code:    500,
                        message: "An unknown error",
                    },
                });
            }
        }

        return NextResponse.json<RpcBulkResponseSchema.Type>({
            bulk: Object.fromEntries(response),
        });
    }
}
