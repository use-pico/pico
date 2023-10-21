"use client";

import {useParam$}         from "@use-pico/navigation";
import {type FilterSchema} from "@use-pico/query";
import {type PicoSchema}   from "@use-pico/schema";
import {safeJsonOf}        from "@use-pico/utils";
import {type ReactNode}    from "react";

export namespace WithParamFilter {
    export interface Props<
        TFilterSchema extends FilterSchema,
    > {
        name?: string;
        schema: TFilterSchema;

        children(filter?: PicoSchema.Output<TFilterSchema>): ReactNode;
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
