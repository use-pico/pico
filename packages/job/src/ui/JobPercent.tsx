import {
    Group,
    Text
}                       from "@use-pico/ui";
import {toHumanNumber}  from "@use-pico/utils";
import {type FC}        from "react";
import {JobStatus}      from "../api/JobStatus";
import {type JobSchema} from "../schema/JobSchema";

export namespace JobPercent {
    export interface Props {
        job?: JobSchema.Type | null;
    }
}

export const JobPercent: FC<JobPercent.Props> = (
    {
        job,
    }
) => {
    if (!job || job.commit || JobStatus.JOB_SETTLED.includes(job.status)) {
        return null;
    }
    return <Group gap={4}>
        <Text>{toHumanNumber({number: job.progress})}</Text>
        <Text c={"dimmed"}>%</Text>
    </Group>;
};
