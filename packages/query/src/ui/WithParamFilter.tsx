"use client";

import {useParam$}         from "@pico/ui";
import {
    safeJsonOf,
    type z
}                          from "@pico/utils";
import {type ReactNode}    from "react";
import {type FilterSchema} from "../schema/FilterSchema";

export namespace WithParamFilter {
    export interface Props<
        TFilterSchema extends FilterSchema,
    > {
        name?: string;
        schema: TFilterSchema;

        children(filter?: z.infer<TFilterSchema>): ReactNode;
    }
}

export const WithParamFilter = <
    TFilterSchema extends FilterSchema,
>(
    {
        name = "filter",
        schema,
        children,
    }: WithParamFilter.Props<TFilterSchema>
) => {
    return children(
        safeJsonOf(schema, useParam$(name))
    );
};
