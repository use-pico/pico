import {
    type IWithMutation,
    type IWithQuery
}                               from "@use-pico/query";
import {
    type NullishSchema,
    type RequestSchema,
    type ResponseSchema,
    type WithIdentitySchema
}                               from "@use-pico/schema";
import {type MutationSchema}    from "@use-pico/source";
import {type JobMutationSchema} from "../schema/JobMutationSchema";
import {type JobQuerySchema}    from "../schema/JobQuerySchema";
import {type JobSchema}         from "../schema/JobSchema";
import {type JobShapeSchema}    from "../schema/JobShapeSchema";

/**
 * Here are all queries/mutations a job needs to work.
 */
export namespace JobQueryMutation {
    export type WithAsyncMutation<
        TRequestSchema extends RequestSchema,
    > = IWithMutation<TRequestSchema, JobSchema>;

    export namespace WithAsyncMutation {
        export type Mutation<
            TRequestSchema extends RequestSchema,
        > = IWithMutation.Result<TRequestSchema, JobSchema>;
    }

    export type WithFetchQuery = IWithQuery<WithIdentitySchema, JobSchema>;

    export type WithFindByQuery = IWithQuery<
        JobQuerySchema,
        NullishSchema<JobSchema>
    >;

    export type WithInterruptMutation = IWithMutation<WithIdentitySchema, JobSchema>;

    export namespace WithInterruptMutation {
        export type Mutation = IWithMutation.Result<WithIdentitySchema, JobSchema>;
    }

    export type WithJobMutation = IWithMutation<JobMutationSchema, ResponseSchema>;

    export namespace WithJobMutation {
        export type Mutation = IWithMutation.Result<MutationSchema<JobShapeSchema, JobQuerySchema>, JobQuerySchema>;
    }

    export namespace WithWatch {
        export type Query = IWithQuery.Result<NullishSchema<JobSchema>>;
    }

    export interface WithMutation<
        TRequestSchema extends RequestSchema,
    > {
        withAsyncMutation: WithAsyncMutation<TRequestSchema>;
        withInterruptMutation: WithInterruptMutation;
        withJobMutation: WithJobMutation;
    }

    export interface Mutation<
        TRequestSchema extends RequestSchema,
    > {
        asyncMutation: WithAsyncMutation.Mutation<TRequestSchema>;
        interruptMutation: WithInterruptMutation.Mutation;
        jobMutation: WithJobMutation.Mutation;
    }

    export interface Query {
        withFindByQuery: WithFindByQuery;
    }
}
