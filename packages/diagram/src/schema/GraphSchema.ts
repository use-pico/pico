import {
    type PicoSchema,
    schema
}                   from "@use-pico/schema";
import {EdgeSchema} from "./EdgeSchema";
import {NodeSchema} from "./NodeSchema";

export const GraphSchema = schema(z => z.object({
    nodes: z.array(NodeSchema),
    edges: z.array(EdgeSchema),
}));
export type GraphSchema = typeof GraphSchema;
export namespace GraphSchema {
    export type Type = PicoSchema.Output<GraphSchema>;
}
