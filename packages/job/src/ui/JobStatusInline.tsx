import {IconMinus}      from "@tabler/icons-react";
import {WithIcon}       from "@use-pico/ui";
import {type FC}        from "react";
import {type JobSchema} from "../schema/JobSchema";
import {JobIconMap}     from "./JobIconMap";

export namespace JobStatusInline {
    export interface Props {
        job: JobSchema.Type;
    }
}

export const JobStatusInline: FC<JobStatusInline.Props> = (
    {
        job,
    }
) => {
    return <WithIcon icon={JobIconMap[job.status] ?? <IconMinus/>}/>;
};
