import {
    minValue,
    type Schema,
    withNumber,
    withObject
} from "@use-pico/schema";

export const CursorSchema = withObject({
    page: withNumber([minValue(0, "Page must be greater than zero")]),
    size: withNumber([minValue(1, "Page size must be greater than one to get any data")]),
});
export type CursorSchema = typeof CursorSchema;
export namespace CursorSchema {
    export type Type = Schema.Output<CursorSchema>;
}
