import {type WithIdentitySchema} from "@pico/query";
import {type WithMutation}       from "@pico/rpc";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobInterruptMutation = WithMutation<WithIdentitySchema, JobSchema>;
