import {type WithQuery}          from "@use-pico/rpc";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobFetch = WithQuery<WithIdentitySchema, JobSchema>;
