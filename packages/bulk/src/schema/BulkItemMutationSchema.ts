import {type PicoSchema}     from "@use-pico/schema";
import {withMutationSchema}  from "@use-pico/source";
import {BulkItemQuerySchema} from "./BulkItemQuerySchema";
import {BulkItemShapeSchema} from "./BulkItemShapeSchema";

export const BulkItemMutationSchema = withMutationSchema({
    shape: BulkItemShapeSchema,
    query: BulkItemQuerySchema,
});
export type BulkItemMutationSchema = typeof BulkItemMutationSchema;
export namespace BulkItemMutationSchema {
    export type Type = PicoSchema.Output<BulkItemMutationSchema>;
}
