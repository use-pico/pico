import {type z} from "@use-pico/utils";

/**
 * This is the most important schema of a form: it defines the shape
 * of internal values and enforces developer to define *all* values on
 * the form and also guides with form item usage (so there is guaranteed
 * all form items are known to a form).
 */
export type ValuesSchema<TShape extends z.ZodRawShape = z.ZodRawShape> = z.ZodObject<TShape>;
export namespace ValuesSchema {
    export type Type<TShape extends z.ZodRawShape> = z.infer<ValuesSchema<TShape>>;
}
