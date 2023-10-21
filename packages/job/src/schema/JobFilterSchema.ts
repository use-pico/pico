import {FilterSchema} from "@use-pico/query";
import {
    merge,
    PicoSchema,
    withArray,
    withBool,
    withNullish,
    withNumber,
    withObject,
    withString
}                     from "@use-pico/schema";

export const JobFilterSchema = merge([
    FilterSchema,
    withObject({
        status:    withNullish(withNumber()),
        statusIn:  withNullish(
            withArray(
                withNumber()
            )
        ),
        service:   withNullish(withString()),
        serviceIn: withNullish(
            withArray(
                withNumber()
            )
        ),
        reference: withNullish(withString()),
        commit:    withNullish(withBool()),
        userId:    withNullish(withString()),
        user:      withNullish(withBool()),
    }),
]);
export type JobFilterSchema = typeof JobFilterSchema;
export namespace JobFilterSchema {
    export type Type = PicoSchema.Output<JobFilterSchema>;
}
