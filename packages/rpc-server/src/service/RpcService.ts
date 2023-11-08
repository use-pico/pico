import {
    type IContainer,
    withContainer
}                         from "@use-pico/container";
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
        withContainer.inject,
    ];

    constructor(
        protected container: IContainer.Type,
    ) {
    }

    public async handle({request}: IRpcService.HandleProps): Promise<NextResponse> {
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

        const response = new Map<string, RpcResponseSchema.Type>();

        for (const [id, bulk] of Object.entries(bulks.data.bulk)) {
            try {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("");
                    }, Math.random() * 10 * 100);
                });

                const {
                    handle,
                    schema
                } = container.resolve<IHandler<any, any>>(bulk.service);

                response.set(id, {
                    data: parse(
                        schema.response,
                        await handle({
                            request: parse(schema.request, bulk.data),
                            container,
                        })
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
