import {z} from "@pico/utils";

export const BulkShapeSchema = z.object({
    name:    z.string().nonempty({message: "Non-empty"}),
    service: z.string().nonempty({message: "Non-empty"}),
});
export type BulkShapeSchema = typeof BulkShapeSchema;
export namespace BulkShapeSchema {
    export type Type = z.infer<BulkShapeSchema>;
}
