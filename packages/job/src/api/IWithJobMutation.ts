import {type WithMutation}   from "@use-pico/rpc";
import {type ResponseSchema} from "@use-pico/schema";
import {type MutationSchema} from "@use-pico/source";
import {type JobQuerySchema} from "../schema/JobQuerySchema";
import {type JobShapeSchema} from "../schema/JobShapeSchema";

export type IWithJobMutation = WithMutation<MutationSchema<JobShapeSchema, JobQuerySchema>, ResponseSchema>;
