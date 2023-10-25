import {
    type PicoSchema,
    type RequestSchema
}                              from "@use-pico/schema";
import {type JobSchema}        from "../schema/JobSchema";
import {type JobQueryMutation} from "./JobQueryMutation";

export interface IJobManager<
    TRequestSchema extends RequestSchema,
> {
    service: string;
    useJob: () => JobSchema.Type | undefined | null;
    mutation: JobQueryMutation.Mutation<TRequestSchema>;

    start(request: PicoSchema.Output<TRequestSchema>): void;

    interrupt(): void;

    delete(): void;

    isSettled(): boolean;

    isRunning(): boolean;

    isPending(): boolean;

    isCommit(): boolean;

    isLoading(): boolean;

    isDisabled(): boolean;

    isFetching(): boolean;

    withCommit(): boolean;

    watch: JobQueryMutation.WithWatch.Query;
}
