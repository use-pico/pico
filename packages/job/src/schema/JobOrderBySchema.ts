import {z} from "@use-pico/utils";

export const JobOrderBySchema = z.record(z.enum(["created", "status"]), z.enum(["asc", "desc"]));
export type JobOrderBySchema = typeof JobOrderBySchema;
export namespace JobOrderBySchema {
    export type Type = z.infer<JobOrderBySchema>;
}
