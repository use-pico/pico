import {
    Progress,
    Tooltip
}                  from "@use-pico/ui";
import {toPercent} from "@use-pico/utils";
import {
    type ComponentProps,
    type FC,
    ReactNode
}                  from "react";
import {JobStatus} from "../api/JobStatus";
import {JobSchema} from "../schema/JobSchema";

export namespace JobProgress {
    export interface Props {
        label: {
            successCount(count: number): ReactNode;
            errorCount(count: number): ReactNode;
            skipCount(count: number): ReactNode;
        };
        inline?: boolean;
        job?: JobSchema.Type | null;
        progressProps?: ComponentProps<typeof Progress.Root>;
    }
}

export const JobProgress: FC<JobProgress.Props> = (
    {
        label,
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
            label={label.successCount(job.successCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.successCount, job.total)}
                color={"teal"}
            />
        </Tooltip>
        <Tooltip
            label={label.errorCount(job.errorCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.errorCount, job.total)}
                color={"red"}
            />
        </Tooltip>
        <Tooltip
            label={label.skipCount(job.skipCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.skipCount, job.total)}
                color={"yellow"}
            />
        </Tooltip>
    </Progress.Root>;
};
