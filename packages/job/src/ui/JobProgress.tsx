import {Translation} from "@use-pico/i18n";
import {
    Progress,
    Tooltip
}                    from "@use-pico/ui";
import {toPercent}   from "@use-pico/utils";
import {
    type ComponentProps,
    type FC
}                    from "react";
import {IJobStatus}  from "../api/IJobStatus";
import {JobSchema}   from "../schema/JobSchema";

export namespace JobProgress {
    export interface Props {
        inline?: boolean;
        job?: JobSchema.Type | null;
        progressProps?: ComponentProps<typeof Progress.Root>;
    }
}

export const JobProgress: FC<JobProgress.Props> = (
    {
        inline,
        job,
        progressProps,
    }
) => {
    if (!job || (job.commit && !inline)) {
        return <Progress.Root
            size={"xl"}
            {...progressProps}
        />;
    }
    return <Progress.Root
        size={"xl"}
        {...progressProps}
    >
        <Tooltip
            label={<Translation withLabel={"successCount"} values={{count: job.successCount}}/>}
        >
            <Progress.Section
                animated={IJobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.successCount, job.total)}
                color={"teal"}
            />
        </Tooltip>
        <Tooltip
            label={<Translation withLabel={"errorCount"} values={{count: job.errorCount}}/>}
        >
            <Progress.Section
                animated={IJobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.errorCount, job.total)}
                color={"red"}
            />
        </Tooltip>
        <Tooltip
            label={<Translation withLabel={"skipCount"} values={{count: job.skipCount}}/>}
        >
            <Progress.Section
                animated={IJobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.skipCount, job.total)}
                color={"yellow"}
            />
        </Tooltip>
    </Progress.Root>;
};
