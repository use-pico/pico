import {
    type ObjectSchema,
    type PicoSchema
} from "@use-pico/schema";

/**
 * This is the most important schema of a form: it defines the shape
 * of internal values and enforces a developer to define *all* values on
 * the form and also guides with form item usage (so there is guaranteed
 * all form items are known to a form).
 */
export type ValuesSchema = ObjectSchema<any>;
export namespace ValuesSchema {
    export type Type = PicoSchema.Output<ValuesSchema>;
}
