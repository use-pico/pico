import {type WithMutation}  from "@use-pico/rpc";
import {type RequestSchema} from "@use-pico/schema";
import {type JobSchema}     from "../schema/JobSchema";

export type IWithJobAsyncMutation<TRequestSchema extends RequestSchema> = WithMutation<TRequestSchema, JobSchema>;
