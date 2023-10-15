import {FilterSchema} from "@pico/query";
import {z}            from "@pico/utils";

export const BulkFilterSchema = FilterSchema.merge(z.object({
    service:    z.string().nullish(),
    withCommit: z.boolean().nullish(),
    user:       z.boolean().nullish(),
}));
export type BulkFilterSchema = typeof BulkFilterSchema;
export namespace BulkFilterSchema {
    export type Type = z.infer<BulkFilterSchema>;
}
