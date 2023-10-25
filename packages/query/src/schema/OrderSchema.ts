import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const OrderSchema = schema(z => z.enum(["asc", "desc"], "Invalid order by value: may be ['asc', 'desc']"));
export type OrderSchema = typeof OrderSchema;
export namespace OrderSchema {
    export type Type = PicoSchema.Output<OrderSchema>;
}
