import {
    type IContainer,
    withContainer
}                             from "@use-pico/container";
import {ErrorResponseSchema}  from "@use-pico/query";
import {parse$}               from "@use-pico/schema";
import {NextResponse}         from "next/server";
import {type IRpcHandler}     from "../api/IRpcHandler";
import {type IRpcService}     from "../api/IRpcService";
import {RpcBulkRequestSchema} from "../schema/RpcBulkRequestSchema";
import {RpcResponseSchema}    from "../schema/RpcResponseSchema";
import {AbstractRpcHandler}   from "./AbstractRpcHandler";

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
            } as ErrorResponseSchema.Type, {
                status: 422,
            });
        }

        const response = new Map<string, RpcResponseSchema.Type<any>>();

        for (const [id, bulk] of Object.entries(bulks.data.bulk)) {
            try {
                const handler = this.container.resolve<IRpcHandler<any, any>>(bulk.service);
                if (!(handler instanceof AbstractRpcHandler)) {
                    throw new Error(`Requested handler [${bulk.service}] is not RPC Handler`);
                }
                response.set(id, {
                    data: await handler.handle(bulk.data),
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

        return NextResponse.json(Object.fromEntries(response));
    }
}
