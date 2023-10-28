import {Translation}              from "@use-pico/i18n";
import {
    JobAsync,
    JobSchema
}                                 from "@use-pico/job";
import {type WithQuery}           from "@use-pico/query";
import {type WithSourceQuery}     from "@use-pico/rpc";
import {type WithIdentitySchema}  from "@use-pico/schema";
import {ButtonBar}                from "@use-pico/ui";
import {type FC}                  from "react";
import {type IUseBulkJobManager}  from "../../api/IUseBulkJobManager";
import {type BulkItemQuerySchema} from "../../schema/BulkItemQuerySchema";
import {type BulkItemSchema}      from "../../schema/BulkItemSchema";
import {type BulkStatsSchema}     from "../../schema/BulkStatsSchema";

export namespace BulkJobTab {
    export interface Props {
        withBulkStats: WithQuery<WithIdentitySchema, BulkStatsSchema>;
        withSourceQuery: WithSourceQuery<BulkItemSchema, BulkItemQuerySchema>;
        useJobManager: IUseBulkJobManager;
        bulkId: string,

        onSuccess?(job: JobSchema.Type): void;
    }
}

export const BulkJobTab: FC<BulkJobTab.Props> = (
    {
        withBulkStats,
        withSourceQuery,
        useJobManager,
        bulkId,
        onSuccess,
    }
) => {
    const statsInvalidator = withBulkStats.useInvalidator();
    const bulkInvalidator = withSourceQuery.useInvalidator();
    const jobManager = useJobManager({
        onSuccess: async job => {
            await statsInvalidator();
            await bulkInvalidator();
            onSuccess?.(job);
        },
    });
    return <>
        <ButtonBar>
            <JobAsync
                inline
                toRequest={() => ({
                    id: bulkId,
                })}
                jobManager={jobManager}
                label={<Translation namespace={"common.bulk.import"} withLabel={"button"}/>}
                buttonProps={{
                    size: "md",
                }}
            />
        </ButtonBar>
    </>;
};
