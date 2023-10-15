import {
    type WithIdentitySchema,
    type WithMutation
}                           from "@pico/query";
import {type RequestSchema} from "@pico/types";
import {type z}             from "@pico/utils";
import {JobQuerySchema}     from "../schema/JobQuerySchema";
import {JobSchema}          from "../schema/JobSchema";

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

    watch: IWithQuery.Result<z.ZodNullable<z.ZodOptional<JobSchema>>>;
}
