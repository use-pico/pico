import {type RequestSchema} from "@pico/types";
import {
    Divider,
    Group,
    Stack
}                           from "@pico/ui";
import {type FC}            from "react";
import {type IJobManager}   from "../api/IJobManager";
import {JobProgress}        from "./JobProgress";
import {JobStats}           from "./JobStats";
import {JobStatusText}      from "./JobStatusText";
import {JobToolbar}         from "./JobToolbar";

export namespace JobControlInline {
    export interface Props<
        TRequestSchema extends RequestSchema,
    > {
        jobManager: IJobManager<TRequestSchema>;
    }
}
export type JobControlInline<
    TRequestSchema extends RequestSchema,
> = FC<JobControlInline.Props<TRequestSchema>>;

export const JobControlInline = <
    TRequestSchema extends RequestSchema,
>(
    {
        jobManager,
    }: JobControlInline.Props<TRequestSchema>
) => {
    const job = jobManager.useJob();
    return <Stack gap={0} my={"md"}>
        <Group>
            <JobStatusText inline job={job}/>
            <Divider orientation={"vertical"}/>
            <JobStats inline job={job}/>
            <JobToolbar jobManager={jobManager}/>
        </Group>
        {job && <JobProgress
            job={job}
            progressProps={{
                size: "xs",
            }}
        />}
    </Stack>;
};
