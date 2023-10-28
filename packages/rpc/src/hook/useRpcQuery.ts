"use client";

import {
    type QuerySchema,
    type WithQuery
}                              from "@use-pico/query";
import {
    type ArraySchema,
    type ResponseSchema
}                              from "@use-pico/schema";
import {useMemo}               from "react";
import {type IRpcHandler}      from "../api/IRpcHandler";
import {type IRpcHandlerClass} from "../api/IRpcHandlerClass";
import {withRpcQuery}          from "./withRpcQuery";

export const useRpcQuery = <
    TRequestSchema extends QuerySchema<any, any>,
    TResponseSchema extends ArraySchema<ResponseSchema>,
    THandler extends IRpcHandler<TRequestSchema, TResponseSchema>,
>(
    handler: IRpcHandlerClass<TRequestSchema, TResponseSchema, THandler>,
    options?: WithQuery.Options<TRequestSchema, TResponseSchema>["options"],
): WithQuery.Result<
    TRequestSchema
> => {
    const {useQuery} = useMemo(() => withRpcQuery(handler), [handler.$key]);
    return useQuery(options);
};
