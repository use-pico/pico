import {type IRepository}   from "@use-pico/repository";
import {AbstractRpcHandler} from "@use-pico/rpc-server";
import {
    type RequestSchema,
    type ResponseSchema
}                           from "@use-pico/schema";

export abstract class RepositoryRpcHandler<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
    TRepository extends IRepository<any>,
> extends AbstractRpcHandler<
    TRequestSchema,
    TResponseSchema
> {
    protected constructor(
        protected repository: TRepository,
        requestSchema: TRequestSchema,
        responseSchema: TResponseSchema,
        protected querySchema = repository.schema.shape.query,
        protected mutationSchema = repository.schema.shape.mutation,
    ) {
        super(
            requestSchema,
            responseSchema
        );
    }
}
