import {type WithMutation}   from "@pico/rpc";
import {type ResponseSchema} from "@pico/types";
import {type JobQuerySchema} from "../schema/JobQuerySchema";

export type IWithJobDeleteMutation = WithMutation<JobQuerySchema, ResponseSchema>;
