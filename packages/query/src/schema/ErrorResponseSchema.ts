import {
    type PicoSchema,
    withNullish,
    withNumber,
    withObject,
    withRecord,
    withString,
    withUnion
} from "@use-pico/schema";

export const ErrorResponseSchema = withObject({
    error: withObject({
        message: withNullish(withString()),
        code:    withNumber(),
        paths:   withNullish(
            withRecord(
                withUnion([
                    withNullish(
                        withRecord(withString())
                    ),
                    withNullish(withString()),
                ])
            )
        ),
    }),
});
export type ErrorResponseSchema = typeof ErrorResponseSchema;
export namespace ErrorResponseSchema {
    export type Type = PicoSchema.Output<ErrorResponseSchema>;
}
