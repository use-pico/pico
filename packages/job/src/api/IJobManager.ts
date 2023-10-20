import {
    type WithMutation,
    type WithQuery
}                            from "@use-pico/query";
import {
    type RequestSchema,
    type WithIdentitySchema
}                            from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {type z}              from "@use-pico/utils";
import {type JobQuerySchema} from "../schema/JobQuerySchema";
import {type JobSchema}      from "../schema/JobSchema";
import {JobShapeSchema}      from "../schema/JobShapeSchema";

export interface IJobManager<
    TRequestSchema extends RequestSchema,
> {
    service: string;
    useJob: () => JobSchema.Type | undefined | null;
    asyncMutation: WithMutation.Result<TRequestSchema, JobSchema>;
    commitMutation: WithMutation.Result<WithIdentitySchema, JobSchema>;
    interruptMutation: WithMutation.Result<WithIdentitySchema, JobSchema>;
    jobMutation: WithMutation.Result<MutationSchema<JobShapeSchema, JobQuerySchema>, JobQuerySchema>;

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
