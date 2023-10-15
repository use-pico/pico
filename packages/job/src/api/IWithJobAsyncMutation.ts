import {type WithMutation}  from "@pico/rpc";
import {type RequestSchema} from "@pico/schema";
import {type JobSchema}     from "../schema/JobSchema";

export type IWithJobAsyncMutation<TRequestSchema extends RequestSchema> = WithMutation<TRequestSchema, JobSchema>;
