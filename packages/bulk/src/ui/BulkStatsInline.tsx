import {WithTranslationProvider} from "@use-pico/i18n";
import {QueryResult}             from "@use-pico/query";
import {type WithQuery}          from "@use-pico/rpc";
import {type WithIdentitySchema} from "@use-pico/schema";
import {
    NativeBreadcrumbs,
    SkeletonButtons,
    StatInline
}                                from "@use-pico/ui";
import {type FC}                 from "react";
import {type BulkStatsSchema}    from "../schema/BulkStatsSchema";

export namespace BulkStatsInline {
    export interface Props {
        bulkId: string;
        withSourceQuery: WithQuery<WithIdentitySchema, BulkStatsSchema>;
        refresh?: number;
    }
}

export const BulkStatsInline: FC<BulkStatsInline.Props> = (
    {
        bulkId,
        withSourceQuery,
        refresh,
    }
) => {
    const result = withSourceQuery.useQueryEx({
        request: {
            id: bulkId,
        },
        options: {
            refetchInterval: refresh,
        },
    });
    return <WithTranslationProvider
        withTranslation={{
            namespace: "common.bulk",
        }}
    >
        <QueryResult
            WithLoading={() => <SkeletonButtons/>}
            result={result}
            WithSuccess={({data: {statusCount}}) => <NativeBreadcrumbs>
                {statusCount.new > 0 && <StatInline
                    withLabel={"stats.new"}
                    count={statusCount.new}
                    textProps={{
                        c: "blue.6",
                    }}
                />}
                {statusCount.pending > 0 && <StatInline
                    withLabel={"stats.pending"}
                    count={statusCount.pending}
                    textProps={{
                        c: "orange.6",
                    }}
                />}
                {statusCount.success > 0 && <StatInline
                    withLabel={"stats.success"}
                    count={statusCount.success}
                    textProps={{
                        c: "green.6",
                    }}
                />}
                {statusCount.error > 0 && <StatInline
                    withLabel={"stats.error"}
                    count={statusCount.error}
                    textProps={{
                        c: "red.6",
                    }}
                />}
                {statusCount.settled > 0 && <StatInline
                    withLabel={"stats.settled"}
                    count={statusCount.settled}
                    textProps={{
                        c: "gray.6",
                    }}
                />}
            </NativeBreadcrumbs>}
        />
    </WithTranslationProvider>;
};
