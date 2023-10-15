import {type WithIdentitySchema} from "@pico/query";
import {type WithQuery}          from "@pico/rpc";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobFetch = WithQuery<WithIdentitySchema, JobSchema>;
