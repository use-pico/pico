import {type WithMutation}       from "@pico/rpc";
import {type WithIdentitySchema} from "@pico/schema";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobInterruptMutation = WithMutation<WithIdentitySchema, JobSchema>;
