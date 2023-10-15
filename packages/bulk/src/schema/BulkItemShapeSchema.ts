import {z} from "@use-pico/utils";

export const BulkItemShapeSchema = z.object({
    bulkId:  z.string().nonempty({message: "Non-empty"}),
    service: z.string().nonempty({message: "Non-empty"}),
    status:  z.number(),
    values:  z.any(),
    request: z.any(),
});
export type BulkItemShapeSchema = typeof BulkItemShapeSchema;
export namespace BulkItemShapeSchema {
    export type Type = z.infer<BulkItemShapeSchema>;
}
