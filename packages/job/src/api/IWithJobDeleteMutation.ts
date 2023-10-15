import {type WithMutation}   from "@pico/rpc";
import {type ResponseSchema} from "@pico/schema";
import {type JobQuerySchema} from "../schema/JobQuerySchema";

export type IWithJobDeleteMutation = WithMutation<JobQuerySchema, ResponseSchema>;
