"use client";

import {type WithSourceQuery}   from "@use-pico/rpc";
import {type FC}                from "react";
import {type BulkFilterSchema}  from "../schema/BulkFilterSchema";
import {type BulkOrderBySchema} from "../schema/BulkOrderBySchema";
import {type BulkSchema}        from "../schema/BulkSchema";
import {BulkTable}              from "./BulkTable";

export namespace WithBulkTable {
    export interface Props extends Omit<BulkTable.Props, "withSourceQuery"> {
        service: string;
        withSourceQuery: WithSourceQuery<BulkSchema, BulkFilterSchema, BulkOrderBySchema>;
    }
}

export const WithBulkTable: FC<WithBulkTable.Props> = (
    {
        service,
        withSourceQuery,
        ...props
    }
) => {
    return <withSourceQuery.query.Provider
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
    </withSourceQuery.query.Provider>;
};
