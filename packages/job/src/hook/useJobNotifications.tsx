import {type WithSourceQuery} from "@use-pico/rpc";
import {
    Group,
    notifications
}                             from "@use-pico/ui";
import {useEffect}            from "react";
import {JobStatus}            from "../api/JobStatus";
import {JobQuerySchema}       from "../schema/JobQuerySchema";
import {JobSchema}            from "../schema/JobSchema";
import {JobProgress}          from "../ui/JobProgress";
import {JobServiceInline}     from "../ui/JobServiceInline";
import {JobStatusInline}      from "../ui/JobStatusInline";

export namespace useJobNotifications {
    export interface Props {
        withJobQuery: WithSourceQuery<JobSchema, JobQuerySchema>;
        interval?: number;
    }
}

export const useJobNotifications = (
    {
        withJobQuery,
        interval = 2500,
    }: useJobNotifications.Props
) => {
    const result = withJobQuery.useQueryEx({
        request: {},
        options: {
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
                                       job={job}
                                       progressProps={{
                                           size: "xs",
                                       }}
                                   />
                               </>,
                    loading: JobStatus.JOB_PENDING.includes(job.status),
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
                                       job={job}
                                       progressProps={{
                                           size: "xs",
                                       }}
                                   />
                               </>,
                    loading: JobStatus.JOB_PENDING.includes(job.status),
                    autoClose: false,
                });
            });
    }, [result.data]);
};
