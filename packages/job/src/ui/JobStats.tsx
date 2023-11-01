import {WithTranslationProvider} from "@use-pico/i18n";
import {
    Group,
    StatInline
}                                from "@use-pico/ui";
import {type FC}                 from "react";
import {type JobSchema}          from "../schema/JobSchema";

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
    return <WithTranslationProvider
        withTranslation={{
            namespace: "common.job",
        }}
    >
        <Group gap={"xs"}>
            <StatInline
                withLabel={"stats.success"}
                count={job.successCount}
                textProps={{
                    c: "green.7",
                }}
            />
            <StatInline
                withLabel={"stats.error"}
                count={job.errorCount}
                textProps={{
                    c: "red.6",
                }}
            />
            <StatInline
                withLabel={"stats.skip"}
                count={job.skipCount}
                textProps={{
                    c: "orange.6",
                }}
            />
            <StatInline
                withLabel={"stats.total"}
                count={job.total}
            />
        </Group>
    </WithTranslationProvider>;
};
