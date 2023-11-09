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
        text: {
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
        text,
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
            label={text.successCount(job.successCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.successCount, job.total)}
                color={"teal"}
            />
        </Tooltip>
        <Tooltip
            label={text.errorCount(job.errorCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.errorCount, job.total)}
                color={"red"}
            />
        </Tooltip>
        <Tooltip
            label={text.skipCount(job.skipCount)}
        >
            <Progress.Section
                animated={JobStatus.JOB_PENDING.includes(job.status)}
                value={toPercent(job.skipCount, job.total)}
                color={"yellow"}
            />
        </Tooltip>
    </Progress.Root>;
};
