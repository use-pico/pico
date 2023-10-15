import {type WithMutation}   from "@use-pico/rpc";
import {type ResponseSchema} from "@use-pico/schema";
import {type JobQuerySchema} from "../schema/JobQuerySchema";

export type IWithJobDeleteMutation = WithMutation<JobQuerySchema, ResponseSchema>;
