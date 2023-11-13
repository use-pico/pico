import {td}             from "@use-pico/i18n";
import {type FC}        from "react";
import {type JobSchema} from "../schema/JobSchema";

export namespace JobServiceInline {
    export interface Props {
        job: JobSchema.Type;
    }
}

export const JobServiceInline: FC<JobServiceInline.Props> = (
    {
        job,
    }
) => {
    return td()(`Service [${job.service}]`);
};
