import {
    type ListSchema,
    type PicoSchema,
    type RecordSchema
}                         from "@use-pico/schema";
import {type OrderSchema} from "./OrderSchema";

export type OrderBySchema = RecordSchema<ListSchema<any>, OrderSchema>;
export namespace OrderBySchema {
    export type Type = PicoSchema.Output<OrderBySchema>;
}
