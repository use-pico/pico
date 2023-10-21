import {
    type PicoSchema,
    type RecordSchema,
    type StringSchema
}                         from "@use-pico/schema";
import {type OrderSchema} from "./OrderSchema";

export type OrderBySchema = RecordSchema<StringSchema, OrderSchema>;
export namespace OrderBySchema {
    export type Type = PicoSchema.Output<OrderBySchema>;
}
