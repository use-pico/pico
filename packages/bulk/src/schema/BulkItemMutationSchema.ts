import {withMutationSchema}  from "@use-pico/source";
import {type z}              from "@use-pico/utils";
import {BulkItemQuerySchema} from "./BulkItemQuerySchema";
import {BulkItemShapeSchema} from "./BulkItemShapeSchema";

export const BulkItemMutationSchema = withMutationSchema({
    shape: BulkItemShapeSchema,
    query: BulkItemQuerySchema,
});
export type BulkItemMutationSchema = typeof BulkItemMutationSchema;
export namespace BulkItemMutationSchema {
    export type Type = z.infer<BulkItemMutationSchema>;
}
