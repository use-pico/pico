import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    schema
}                    from "@use-pico/schema";

export const JobOrderBySchema = schema(z => z.record(z.enum(["created", "status"]), OrderSchema));
export type JobOrderBySchema = typeof JobOrderBySchema;
export namespace JobOrderBySchema {
    export type Type = PicoSchema.Output<JobOrderBySchema>;
}
