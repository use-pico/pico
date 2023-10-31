import {
    type ListSchema,
    type RecordSchema,
    schema
}                    from "@use-pico/schema";
import {OrderSchema} from "../schema/OrderSchema";

export const orderByOf = <
    const TValues extends ListSchema.Values,
>(
    input: TValues
): RecordSchema<ListSchema<TValues>, OrderSchema> => {
    return schema(z => z.record(z.list(input), OrderSchema));
};
