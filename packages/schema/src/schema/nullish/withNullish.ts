import {type PicoSchema}    from "../../api/PicoSchema";
import {type NullishSchema} from "../../api/schema/NullishSchema";

export function withNullish<
    TWrapped extends PicoSchema,
    TDefault extends PicoSchema.Input<TWrapped> | undefined = undefined,
>(
    wrapped: TWrapped,
    default$?: TDefault | (() => TDefault),
): NullishSchema<TWrapped, TDefault> {
    return {
        schema: "nullish",
        wrapped,
        get default() {
            return typeof default$ === "function"
                ? (default$ as () => TDefault)()
                : (default$ as TDefault);
        },
        parse(input, info) {
            let default_: TDefault;
            const value = (input === null || input === undefined) &&
            (default_ = this.default) &&
            default_ !== undefined
                ? default_
                : input;

            if (value === null || value === undefined) {
                return {output: value};
            }

            return wrapped.parse(value, info);
        },
        async parseAsync(input, info) {
            return this.parse(input, info);
        },
    };
}
