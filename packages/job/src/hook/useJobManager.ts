"use client";

import {
    useInvalidator,
    useMutation,
    useQueryEx
}                              from "@use-pico/query";
import {type RequestSchema}    from "@use-pico/schema";
import {useErrorNotification}  from "@use-pico/ui";
import {
    useEffect,
    useState
}                              from "react";
import {type IJobManager}      from "../api/IJobManager";
import {type JobQueryMutation} from "../api/JobQueryMutation";
import {JobStatus}             from "../api/JobStatus";
import {type JobFilterSchema}  from "../schema/JobFilterSchema";
import {type JobSchema}        from "../schema/JobSchema";

export namespace useJobManager {
    export interface Props<
        TRequestSchema extends RequestSchema,
    > {
        service: string;
        mutation: JobQueryMutation.WithMutation<TRequestSchema>;
        query: JobQueryMutation.Query;
        filter?: JobFilterSchema.Type;
        interval?: number;

        onJob?(job: JobSchema.Type): void;

        onStart?(job: JobSchema.Type): void;

        onSuccess?(job: JobSchema.Type): void;

        onError?(job: JobSchema.Type): void;

        onInterrupt?(job: JobSchema.Type): void;

        onSettled?(job: JobSchema.Type): void;
    }
}
export type useJobManager<
    TRequestSchema extends RequestSchema,
> = typeof useJobManager<TRequestSchema>;

export const useJobManager = <
    TRequestSchema extends RequestSchema,
>(
    {
        service,
        filter,
        mutation,
        query,
        interval = 1000,
        onJob,
        onStart,
        onSuccess,
        onError,
        onInterrupt,
        onSettled,
    }: useJobManager.Props<TRequestSchema>
): IJobManager<TRequestSchema> => {
    const [job, setJob] = useState<JobSchema.Type | null | undefined>();
    const asyncMutation = useMutation({withMutation: mutation.withAsyncMutation});
    const interruptMutation = useMutation({withMutation: mutation.withInterruptMutation});
    const jobMutation = useMutation({withMutation: mutation.withJobMutation});
    const watchInvalidator = useInvalidator({invalidator: query.withFindByQuery});
    const errorNotification = useErrorNotification();
    const watch = useQueryEx({
        withQuery: query.withFindByQuery,
        request:   {
            where: {
                service,
            },
            filter,
        },
        options:   {
            refetchInterval: interval,
        },
    });

    useEffect(() => {
        setJob(prev => {
            if (!watch.isSuccess) {
                return null;
            } else if (!watch.data) {
                return watch.data;
            } else if (prev?.status === watch.data?.status) {
                return watch.data;
            }

            onJob?.(watch.data);

            const check = [
                {
                    status:  [JobStatus.ERROR],
                    handler: onError,
                },
                {
                    status:  [JobStatus.SUCCESS],
                    handler: onSuccess,
                },
                {
                    status:  JobStatus.JOB_SETTLED,
                    handler: onSettled,
                },
            ] as const;

            for (const {
                status,
                handler
            } of check) {
                /**
                 * Do not break loop as there could be more handlers on the same status.
                 */
                prev?.status !== undefined && prev.status !== watch.data.status && status.includes(watch.data.status) && handler?.(watch.data);
            }

            return watch.data;
        });
    }, [watch.data]);

    const isRunning = () => {
        return job?.status === JobStatus.RUNNING;
    };
    const isPending = () => {
        return JobStatus.JOB_PENDING.includes(job?.status ?? -1);
    };
    const isSettled = () => {
        return JobStatus.JOB_SETTLED.includes(job?.status ?? -1);
    };

    return {
        service,
        useJob:     () => {
            return job;
        },
        mutation:   {
            asyncMutation,
            jobMutation,
            interruptMutation,
        },
        start:      request => {
            asyncMutation.mutate(request, {
                onSuccess: job => {
                    setJob(job);
                    onStart?.(job);
                },
                onError:   () => {
                    errorNotification({
                        withTranslation: {
                            label: "start",
                        },
                    });
                },
            });
        },
        interrupt:  () => {
            job && setJob({
                ...job,
                status: JobStatus.INTERRUPTED,
            });
            !job && errorNotification({
                withTranslation: {
                    label: "interrupt.no-job",
                },
            });
            job && interruptMutation.mutate({
                id: job.id,
            }, {
                onSuccess: async job => {
                    await watchInvalidator();
                    onInterrupt?.(job);
                },
                onError:   () => {
                    errorNotification({
                        withTranslation: {
                            label: "interrupt",
                        },
                    });
                }
            });
        },
        delete:     () => {
            jobMutation.mutate({
                delete: {
                    where: {
                        service,
                    },
                },
            }, {
                onSuccess: async () => {
                    setJob(null);
                    await watchInvalidator();
                },
                onError:   () => {
                    errorNotification({
                        withTranslation: {
                            label: "delete",
                        },
                    });
                }
            });
        },
        isSettled,
        isRunning,
        isCommit:   () => {
            return job?.commit ?? false;
        },
        isLoading:  () => {
            if (asyncMutation.isPending) {
                return true;
            } else if (isRunning()) {
                return true;
            } else if (job === undefined) {
                return true;
            } else if (isPending()) {
                return true;
            } else if (watch.isLoading) {
                return true;
            }
            return false;
        },
        isDisabled: () => {
            return !!job && isSettled() && !job?.commit;
        },
        isFetching: () => {
            return asyncMutation.isPending || interruptMutation.isPending || jobMutation.isPaused || watch.isLoading;
        },
        isPending:  () => {
            return JobStatus.JOB_PENDING.includes(job?.status || -1);
        },
        withCommit: () => {
            return !!job && isSettled() && !job.commit;
        },
        watch
    };
};
