import {type z} from "zod";

export type OrderBySchema = z.ZodSchema;
export namespace OrderBySchema {
    export type Type = z.infer<OrderBySchema>;
}
