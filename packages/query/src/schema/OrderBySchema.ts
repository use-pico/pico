import {type z}           from "@pico/utils";
import {type OrderSchema} from "./OrderSchema";

export type OrderBySchema = z.ZodRecord<z.ZodEnum<any>, OrderSchema>;
export namespace OrderBySchema {
    export type Type = z.infer<OrderBySchema>;
}
