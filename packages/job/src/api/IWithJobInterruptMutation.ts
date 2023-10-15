import {type WithMutation}       from "@use-pico/rpc";
import {type WithIdentitySchema} from "@use-pico/schema";
import {type JobSchema}          from "../schema/JobSchema";

export type IWithJobInterruptMutation = WithMutation<WithIdentitySchema, JobSchema>;
