import {
    type EnumSchema,
    schema
}                    from "@use-pico/schema";
import {OrderSchema} from "../schema/OrderSchema";

export const orderByOf = <TEnum extends EnumSchema.Enum>(input: TEnum) => {
    return schema(z => z.record(z.enum(input), OrderSchema));
};
