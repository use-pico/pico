import {
    type WithMutation,
    type WithQuery
}                            from "@use-pico/query";
import {
    type RequestSchema,
    type WithIdentitySchema
}                            from "@use-pico/schema";
import {type z}              from "@use-pico/utils";
import {type JobQuerySchema} from "../schema/JobQuerySchema";
import {type JobSchema}      from "../schema/JobSchema";

export interface IJobManager<
    TRequestSchema extends RequestSchema,
> {
    service: string;
    useJob: () => JobSchema.Type | undefined | null;
    asyncMutation: WithMutation.Result<TRequestSchema, JobSchema>;
    commitMutation: WithMutation.Result<WithIdentitySchema, JobSchema>;
    interruptMutation: WithMutation.Result<WithIdentitySchema, JobSchema>;
    deleteMutation: WithMutation.Result<JobQuerySchema, any>;

    start(request: z.infer<TRequestSchema>): void;

    commit(): void;

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

    watch: WithQuery.Result<z.ZodNullable<z.ZodOptional<JobSchema>>>;
}
