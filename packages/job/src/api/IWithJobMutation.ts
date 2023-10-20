import {type WithMutation}      from "@use-pico/rpc";
import {type ResponseSchema}    from "@use-pico/schema";
import {type JobMutationSchema} from "../schema/JobMutationSchema";

export type IWithJobMutation = WithMutation<JobMutationSchema, ResponseSchema>;
