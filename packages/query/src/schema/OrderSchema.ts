import {
    type Schema,
    withEnum
} from "@use-pico/schema";

export const OrderSchema = withEnum(["asc", "desc"], "Invalid order by value: may be ['asc', 'desc']");
export type OrderSchema = typeof OrderSchema;
export namespace OrderSchema {
    export type Type = Schema.Output<OrderSchema>;
}
