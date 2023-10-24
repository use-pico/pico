import {type PicoSchema}    from "../../api/PicoSchema";
import {type ObjectSchema}  from "../../api/schema/ObjectSchema";
import {type PartialSchema} from "../../api/schema/PartialSchema";
import {withObject}         from "../object/withObject";
import {withOptional}       from "../optional/withOptional";

export function withPartial<
    TObjectSchema extends ObjectSchema<any>,
>(schema: TObjectSchema): PartialSchema<TObjectSchema> {
    let $schema: TObjectSchema;

    return {
        schema: "partial",
        _parse(input, info) {
            $schema = $schema || withObject(
                Object.entries(schema.shape).reduce(
                    (shapes, [key, schema]) => ({
                        ...shapes,
                        [key]: withOptional(schema as PicoSchema),
                    }),
                    {}
                )
            );

            return $schema._parse(input, info);
        },
        async _parseAsync(input, info) {
            return this._parse(input, info);
        },
    };
}
