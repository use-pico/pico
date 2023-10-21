import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    withEnum,
    withRecord
}                    from "@use-pico/schema";

export const JobOrderBySchema = withRecord(withEnum(["created", "status"]), OrderSchema);
export type JobOrderBySchema = typeof JobOrderBySchema;
export namespace JobOrderBySchema {
    export type Type = PicoSchema.Output<JobOrderBySchema>;
}
