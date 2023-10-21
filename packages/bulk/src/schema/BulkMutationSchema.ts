import {type PicoSchema}    from "@use-pico/schema";
import {withMutationSchema} from "@use-pico/source";
import {BulkQuerySchema}    from "./BulkQuerySchema";
import {BulkShapeSchema}    from "./BulkShapeSchema";

export const BulkMutationSchema = withMutationSchema({
    shape: BulkShapeSchema,
    query: BulkQuerySchema,
});
export type BulkMutationSchema = typeof BulkMutationSchema;
export namespace BulkMutationSchema {
    export type Type = PicoSchema.Output<BulkMutationSchema>;
}
