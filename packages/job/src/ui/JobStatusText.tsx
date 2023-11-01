import {Translation}    from "@use-pico/i18n";
import {
    type FC,
    type ReactNode
}                       from "react";
import {JobStatus}      from "../api/JobStatus";
import {type JobSchema} from "../schema/JobSchema";

export namespace JobStatusText {
    export interface Props {
        job?: JobSchema.Type | null;
        inline?: boolean;
        defaultText?: ReactNode;
        withStatus?: number[];
    }
}

export const JobStatusText: FC<JobStatusText.Props> = (
    {
        job,
        inline = false,
        defaultText,
        withStatus = JobStatus.JOB_PENDING,
    }
) => {
    if (job && (inline || withStatus.includes(job.status))) {
        return <Translation namespace={"common.job.status"} withLabel={`${job.status}`}/>;
    }
    return defaultText;
};
