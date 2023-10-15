import {
    Group,
    Text
}                       from "@pico/ui";
import {toHumanNumber}  from "@pico/utils";
import {type FC}        from "react";
import {IJobStatus}     from "../api/IJobStatus";
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
    if (!job || job.commit || IJobStatus.JOB_SETTLED.includes(job.status)) {
        return null;
    }
    return <Group gap={4}>
        <Text>{toHumanNumber({number: job.progress})}</Text>
        <Text c={"dimmed"}>%</Text>
    </Group>;
};
