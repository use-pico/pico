import {type PicoSchema}     from "../../api/PicoSchema";
import {type OptionalSchema} from "../../api/schema/OptionalSchema";

export function withOptional<
    TWrapped extends PicoSchema,
    TDefault extends PicoSchema.Input<TWrapped> | undefined = undefined,
>(
    wrapped: TWrapped,
    default$?: TDefault | (() => TDefault),
): OptionalSchema<TWrapped, TDefault> {
    return {
        schema: "optional",
        wrapped,
        get default() {
            return typeof default$ === "function"
                ? (default$ as () => TDefault)()
                : (default$ as TDefault);
        },
        parse(input, info) {
            const value = input === undefined ? this.default : input;

            if (value === undefined) {
                return {output: value};
            }

            return wrapped.parse(value, info);
        },
    };
}
