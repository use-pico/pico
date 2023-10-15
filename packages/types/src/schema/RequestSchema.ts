import {type z} from "@pico/utils";

export type RequestSchema<TShape extends z.ZodRawShape = z.ZodRawShape> = z.ZodObject<TShape, "strip">;
export namespace RequestSchema {
    export type Type<TShape extends z.ZodRawShape = z.ZodRawShape> = z.infer<RequestSchema<TShape>>;
}
