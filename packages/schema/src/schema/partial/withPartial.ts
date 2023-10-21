import {type PicoSchema}    from "../../api/PicoSchema";
import {type ObjectSchema}  from "../../api/schema/ObjectSchema";
import {type PartialSchema} from "../../api/schema/PartialSchema";
import {withOptional}       from "../optional/withOptional";

export function withPartial<
    TObjectSchema extends ObjectSchema<any>,
>(schema: TObjectSchema): PartialSchema<TObjectSchema> {
    let $schema: TObjectSchema;

    return {
        schema: "partial",
        parse:  (input, info) => {
            $schema = $schema || Object.entries(schema.object.shape).reduce(
                (shapes, [key, schema]) => ({
                    ...shapes,
                    [key]: withOptional(schema as PicoSchema),
                }),
                {}
            );

            return $schema.parse(input, info);
        },
        async parseAsync(input, info) {
            return this.parse(input, info);
        },
    };
}
