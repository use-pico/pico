"use client";

import {type WithSourceQuery} from "@use-pico/rpc";
import {type FC}              from "react";
import {type BulkQuerySchema} from "../schema/BulkQuerySchema";
import {type BulkSchema}      from "../schema/BulkSchema";
import {BulkTable}            from "./BulkTable";

export namespace WithBulkTable {
    export interface Props extends Omit<BulkTable.Props, "withSourceQuery"> {
        service: string;
        withSourceQuery: WithSourceQuery<BulkSchema, BulkQuerySchema>;
    }
}

export const WithBulkTable: FC<WithBulkTable.Props> = (
    {
        service,
        withSourceQuery,
        ...props
    }
) => {
    return <withSourceQuery.store.Provider
        defaults={{
            where: {
                service,
            },
        }}
    >
        <BulkTable
            withSourceQuery={withSourceQuery}
            {...props}
        />
    </withSourceQuery.store.Provider>;
};
