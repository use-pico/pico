"use client";

import {useQueryEx}            from "@use-pico/query";
import {type IWithSourceQuery} from "@use-pico/source";
import {
    Group,
    notifications
}                              from "@use-pico/ui";
import {useEffect}             from "react";
import {JobStatus}             from "../api/JobStatus";
import {JobQuerySchema}        from "../schema/JobQuerySchema";
import {JobSchema}             from "../schema/JobSchema";
import {JobProgress}           from "../ui/JobProgress";
import {JobServiceInline}      from "../ui/JobServiceInline";
import {JobStatusInline}       from "../ui/JobStatusInline";

export namespace useJobNotifications {
    export interface Props {
        label: {
            progress: JobProgress.Props["label"];
        };
        withJobQuery: IWithSourceQuery<JobQuerySchema, JobSchema>;
        interval?: number;
    }
}

export const useJobNotifications = (
    {
        label,
        withJobQuery,
        interval = 2500,
    }: useJobNotifications.Props
) => {
    const result = useQueryEx({
        withQuery: withJobQuery,
        request:   {},
        options:   {
            refetchInterval: interval,
        },
    });
    useEffect(() => {
        if (!result.isSuccess) {
            return;
        }
        result.data
            .filter(job => !job.commit)
            // .filter(job => IJobStatus.JOB_PENDING.includes(job.status) || IJobStatus.JOB_SETTLED.includes(job.status))
            // .filter(job => IJobStatus.JOB_PENDING.includes(job.status))
            .map(job => {
                notifications.show({
                    id:        `job-${job.id}`,
                    message:   <>
                                   <Group gap={"xs"}>
                                       <JobStatusInline job={job}/>
                                       <JobServiceInline job={job}/>
                                   </Group>
                                   <JobProgress
                                       label={label.progress}
                                       job={job}
                                       progressProps={{
                                           size: "xs",
                                       }}
                                   />
                               </>,
                    loading:   JobStatus.JOB_PENDING.includes(job.status),
                    autoClose: false,
                });
                notifications.update({
                    id:        `job-${job.id}`,
                    message:   <>
                                   <Group gap={"xs"}>
                                       <JobStatusInline job={job}/>
                                       <JobServiceInline job={job}/>
                                   </Group>
                                   <JobProgress
                                       label={label.progress}
                                       job={job}
                                       progressProps={{
                                           size: "xs",
                                       }}
                                   />
                               </>,
                    loading:   JobStatus.JOB_PENDING.includes(job.status),
                    autoClose: false,
                });
            });
    }, [result.data]);
};
