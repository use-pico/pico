import {
    type IWithMutation,
    type IWithQuery
}                               from "@use-pico/query";
import {
    type NullishSchema,
    type RequestSchema,
    type WithIdentitySchema
}                               from "@use-pico/schema";
import {type JobMutationSchema} from "../schema/JobMutationSchema";
import {type JobSchema}         from "../schema/JobSchema";

/**
 * Here are all queries/mutations a job needs to work.
 */
export namespace JobQueryMutation {
    export namespace WithAsyncMutation {
        export type Mutation<
            TRequestSchema extends RequestSchema,
        > = IWithMutation.Result<TRequestSchema, JobSchema>;
    }

    export namespace WithWatch {
        export type Query = IWithQuery.Result<NullishSchema<JobSchema>>;
    }

    export interface WithMutation<
        TRequestSchema extends RequestSchema,
    > {
        withAsyncMutation: IWithMutation<TRequestSchema, JobSchema>;
        withInterruptMutation: IWithMutation<WithIdentitySchema, JobSchema>;
        withJobMutation: IWithMutation<JobMutationSchema, JobSchema>;
    }

    export interface Mutation<
        TRequestSchema extends RequestSchema,
    > {
        asyncMutation: WithAsyncMutation.Mutation<TRequestSchema>;
        interruptMutation: IWithMutation.Result<WithIdentitySchema, JobSchema>;
        jobMutation: IWithMutation.Result<JobMutationSchema, JobSchema>;
    }
}
