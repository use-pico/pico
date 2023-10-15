import {type WithQuery}          from "@pico/rpc";
import {type WithIdentitySchema} from "@pico/schema";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobFetch = WithQuery<WithIdentitySchema, JobSchema>;
