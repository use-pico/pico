"use client";

import {
    CountSchema,
    createQueryStore,
    type QuerySchema
}                                        from "@use-pico/query";
import {type IRepository}                from "@use-pico/repository";
import {
    type ArraySchema,
    type ResponseSchema
}                                        from "@use-pico/schema";
import {type IRepositoryRpcHandlerClass} from "../api/IRepositoryRpcHandlerClass";
import {type IRpcHandler}                from "../api/IRpcHandler";
import {type WithSourceQuery}            from "../api/WithSourceQuery";
import {withQuery}                       from "./withQuery";
import {withSourceQuery}                 from "./withSourceQuery";

export const withRpcSourceQuery = <
    TRequestSchema extends QuerySchema<any, any>,
    TResponseSchema extends ArraySchema<ResponseSchema>,
    TRepository extends IRepository<any>,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
    TCountHandler extends IRpcHandler<TRequestSchema, CountSchema>,
>(
    handler: IRepositoryRpcHandlerClass<TRequestSchema, TResponseSchema, TRepository, THandler> & {
        $countRpcHandler: IRepositoryRpcHandlerClass<TRequestSchema, CountSchema, TRepository, TCountHandler>
    },
): WithSourceQuery<
    TRepository["schema"]["shape"]["entity"],
    TRepository["schema"]["shape"]["filter"],
    TRepository["schema"]["shape"]["orderBy"]
> => {
    return withSourceQuery({
        service:        handler.$key,
        schema:         {
            filter:   handler.$querySchema.shape.filter,
            orderBy:  handler.$querySchema.shape.orderBy,
            response: handler.$responseSchema,
        },
        query:          createQueryStore({
            name:   "SourceQuery",
            schema: {
                filter:  handler.$querySchema.shape.filter,
                orderBy: handler.$querySchema.shape.orderBy,
            },
        }),
        withCountQuery: withQuery({
            service: handler.$key,
            schema:  {
                request:  handler.$requestSchema as QuerySchema<any, any>,
                response: CountSchema,
            },
        }),
    });
};
