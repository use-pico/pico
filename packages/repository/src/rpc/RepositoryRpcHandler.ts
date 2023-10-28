import {AbstractRpcHandler} from "@use-pico/rpc";
import {
    type RequestSchema,
    type ResponseSchema
}                           from "@use-pico/schema";
import {type IRepository}   from "../api/IRepository";

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
