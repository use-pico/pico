import {type WithIdentitySchema} from "@pico/query";
import {type WithMutation}       from "@pico/rpc";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobCommitMutation = WithMutation<WithIdentitySchema, JobSchema>;
