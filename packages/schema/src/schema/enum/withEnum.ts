import {type ErrorMessage} from "../../api/ErrorMessage";
import {type EnumSchema}   from "../../api/schema/EnumSchema";
import {issuesOf}          from "../../utils/issuesOf";
import {withSchema}        from "../withSchema";

export function withEnum<
    TEnum extends EnumSchema.Enum,
>(
    value: TEnum,
    error?: ErrorMessage,
): EnumSchema<TEnum> {
    return withSchema({
        schema: "enum",
        enum:   value,
        _parse(input, info) {
            if (!Object.values(value).includes(input as any)) {
                return issuesOf(
                    info,
                    "type",
                    "enum",
                    error || "Given value is not a valid value of the enum",
                    input
                );
            }

            return {output: input as TEnum[keyof TEnum]};
        },
    });
}
