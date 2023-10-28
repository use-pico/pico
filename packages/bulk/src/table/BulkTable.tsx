"use client";

import {
    DateTimeInline,
    WithTranslationProvider
}                             from "@use-pico/i18n";
import {type IHrefProps}      from "@use-pico/navigation";
import {Table}                from "@use-pico/table";
import {
    BoolInline,
    ButtonLink,
    Group
}                             from "@use-pico/ui";
import {type FC}              from "react";
import {type BulkQuerySchema} from "../schema/BulkQuerySchema";
import {type BulkSchema}      from "../schema/BulkSchema";
import {BulkStatsInline}      from "../ui/BulkStatsInline";

export namespace BulkTable {
    export type Columns =
        | "name"
        | "commit"
        | "stats"
        | "created";

    export interface Props extends Omit<
        Table.Props<
            Columns,
            BulkSchema,
            BulkQuerySchema
        >,
        "columns"
    > {
        toBulkHref?(bulk: BulkSchema.Type): IHrefProps;

        withStatsQuery: BulkStatsInline.Props["withSourceQuery"];
    }
}

export const BulkTable: FC<BulkTable.Props> = (
    {
        toBulkHref,
        withStatsQuery,
        ...props
    }
) => {
    return <WithTranslationProvider
        withTranslation={{
            namespace: "common.bulk",
        }}
    >
        <Table<BulkTable.Columns, BulkSchema, BulkQuerySchema>
            columns={{
                name:    {
                    render: ({item}) => {
                        return toBulkHref ? <ButtonLink
                            href={toBulkHref(item)}
                            label={item.name}
                            disabled={item.commit}
                            buttonProps={{
                                size: "md",
                            }}
                        /> : item.name;
                    },
                },
                stats:   {
                    render: ({item}) => <BulkStatsInline bulkId={item.id} withSourceQuery={withStatsQuery}/>,
                    width:  32,
                },
                commit:  {
                    render: ({item: {commit}}) => <Group grow>
                        <BoolInline
                            bool={commit}
                        />
                    </Group>,
                    width:  10,
                },
                created: {
                    render: ({item: {created}}) => <DateTimeInline date={created}/>,
                    width:  15,
                },
            }}
            {...props}
        />
    </WithTranslationProvider>;
};
