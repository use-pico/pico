import {
    type WithMutation as CoolWithMutation,
    type WithQuery as CoolWithQuery
}                                                    from "@use-pico/query";
import {type WithFindByQuery as CoolWithFindByQuery} from "@use-pico/rpc";
import {
    type NullishSchema,
    type RequestSchema,
    type ResponseSchema,
    type WithIdentitySchema
}                                                    from "@use-pico/schema";
import {type MutationSchema}                         from "@use-pico/source";
import {type JobMutationSchema}                      from "../schema/JobMutationSchema";
import {type JobQuerySchema}                         from "../schema/JobQuerySchema";
import {type JobSchema}                              from "../schema/JobSchema";
import {type JobShapeSchema}                         from "../schema/JobShapeSchema";

/**
 * Here are all queries/mutations a job needs to work.
 */
export namespace JobQueryMutation {
    export type WithAsyncMutation<
        TRequestSchema extends RequestSchema,
    > = CoolWithMutation<TRequestSchema, JobSchema>;

    export namespace WithAsyncMutation {
        export type Mutation<
            TRequestSchema extends RequestSchema,
        > = CoolWithMutation.Result<TRequestSchema, JobSchema>;
    }

    export type WithFetchQuery = CoolWithQuery<WithIdentitySchema, JobSchema>;

    export type WithFindByQuery = CoolWithFindByQuery<
        NullishSchema<JobSchema>,
        JobQuerySchema
    >;

    export type WithInterruptMutation = CoolWithMutation<WithIdentitySchema, JobSchema>;

    export namespace WithInterruptMutation {
        export type Mutation = CoolWithMutation.Result<WithIdentitySchema, JobSchema>;
    }

    export type WithJobMutation = CoolWithMutation<JobMutationSchema, ResponseSchema>;

    export namespace WithJobMutation {
        export type Mutation = CoolWithMutation.Result<MutationSchema<JobShapeSchema, JobQuerySchema>, JobQuerySchema>;
    }

    export namespace WithWatch {
        export type Query = CoolWithQuery.Result<NullishSchema<JobSchema>>;
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
