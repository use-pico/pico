import {OrderSchema} from "@use-pico/query";
import {
    type PicoSchema,
    withEnum,
    withRecord
}                    from "@use-pico/schema";

export const FileOrderBySchema = withRecord(withEnum(["name", "path"]), OrderSchema);
export type FileOrderBySchema = typeof FileOrderBySchema;
export namespace FileOrderBySchema {
    export type Type = PicoSchema.Output<FileOrderBySchema>;
}
