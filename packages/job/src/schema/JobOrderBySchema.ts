import {sortOf}          from "@use-pico/query";
import {type PicoSchema} from "@use-pico/schema";

export const JobOrderBySchema = sortOf(["created", "status"]);
export type JobOrderBySchema = typeof JobOrderBySchema;
export namespace JobOrderBySchema {
    export type Type = PicoSchema.Output<JobOrderBySchema>;
}
