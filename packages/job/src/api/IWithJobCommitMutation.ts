import {type WithMutation}       from "@pico/rpc";
import {type WithIdentitySchema} from "@pico/schema";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobCommitMutation = WithMutation<WithIdentitySchema, JobSchema>;
