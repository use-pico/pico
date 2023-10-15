import {FilterSchema} from "@pico/query";
import {z}            from "@pico/utils";

export const BulkItemFilterSchema = FilterSchema.merge(z.object({
    bulkId:   z.string().nullish(),
    service:  z.string().nullish(),
    status:   z.number().nullish(),
    statusIn: z.array(z.number()).nullish(),
}));
export type BulkItemFilterSchema = typeof BulkItemFilterSchema;
export namespace BulkItemFilterSchema {
    export type Type = z.infer<BulkItemFilterSchema>;
}
