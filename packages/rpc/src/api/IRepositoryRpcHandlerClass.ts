import {type IRepository}      from "@use-pico/repository";
import {
    type RequestSchema,
    type ResponseSchema
}                              from "@use-pico/schema";
import {type IRpcHandler}      from "./IRpcHandler";
import {type IRpcHandlerClass} from "./IRpcHandlerClass";

export interface IRepositoryRpcHandlerClass<
    TRequestSchema extends RequestSchema,
    TResponseSchema extends ResponseSchema,
    TRepository extends IRepository<any>,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
> extends IRpcHandlerClass<
    TRequestSchema,
    TResponseSchema,
    THandler
> {
    readonly $querySchema: TRepository["schema"]["shape"]["query"];
    readonly $mutationSchema: TRepository["schema"]["shape"]["mutation"];
}
