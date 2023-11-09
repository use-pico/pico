import {tx}             from "@use-pico/i18n";
import {
    Group,
    StatInline
}                       from "@use-pico/ui";
import {type FC}        from "react";
import {type JobSchema} from "../schema/JobSchema";

export namespace JobStats {
    export interface Props {
        inline?: boolean;
        job?: JobSchema.Type | null;
    }
}

export const JobStats: FC<JobStats.Props> = (
    {
        inline,
        job,
    }
) => {
    if (!job || (job.commit && !inline)) {
        return null;
    }
    return <Group gap={"xs"}>
        <StatInline
            text={{
                label: tx()`Success count`,
            }}
            count={job.successCount}
            textProps={{
                c: "green.7",
            }}
        />
        <StatInline
            text={{
                label: tx()`Error count`,
            }}
            count={job.errorCount}
            textProps={{
                c: "red.6",
            }}
        />
        <StatInline
            text={{
                label: tx()`Skip count`,
            }}
            count={job.skipCount}
            textProps={{
                c: "orange.6",
            }}
        />
        <StatInline
            text={{
                label: tx()`Total count`,
            }}
            count={job.total}
        />
    </Group>;
};
