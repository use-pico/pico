"use client";

import {useParam$}         from "@pico/navigation";
import {type FilterSchema} from "@pico/query";
import {
    safeJsonOf,
    type z
}                          from "@pico/utils";
import {type ReactNode}    from "react";

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
