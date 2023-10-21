import {type ErrorMessage} from "../api/ErrorMessage";
import {type Pipe}         from "../api/Pipe";
import {type ObjectSchema} from "../api/schema/ObjectSchema";
import {withObject}        from "../schema/object/withObject";
import {argsOf}            from "./argsOf";

export namespace merge {
    export type MergedSchemas<
        TObjectSchemas extends (
            | ObjectSchema<any, any>
            )[]
    > = TObjectSchemas extends [infer TFirstObjectSchema]
        ? TFirstObjectSchema extends | ObjectSchema<any, any>
            ? TFirstObjectSchema["object"]["shape"]
            : never
        : TObjectSchemas extends [
                infer TFirstObjectSchema,
                ...infer TRestObjectSchemas
            ]
            ? TFirstObjectSchema extends | ObjectSchema<any, any>
                ? TRestObjectSchemas extends (
                        | ObjectSchema<any, any>
                        )[]
                    ? {
                          [TKey in Exclude<
                        keyof TFirstObjectSchema["object"]["shape"],
                        keyof MergedSchemas<TRestObjectSchemas>
                    >]: TFirstObjectSchema["object"]["shape"][TKey];
                      } & MergedSchemas<TRestObjectSchemas>
                    : never
                : never
            : never;
}

export function merge<
    TObjectSchemas extends ObjectSchema.Schemas
>(
    schemas: TObjectSchemas,
    arg2?:
        | Pipe<ObjectSchema.Output<merge.MergedSchemas<TObjectSchemas>>>
        | ErrorMessage,
    arg3?: Pipe<ObjectSchema.Output<merge.MergedSchemas<TObjectSchemas>>>
): ObjectSchema<merge.MergedSchemas<TObjectSchemas>> {
    const [error, pipe] = argsOf<
        Pipe<ObjectSchema.Output<merge.MergedSchemas<TObjectSchemas>>>
    >(arg2, arg3);

    // Create and return object schema
    return withObject(
        schemas.reduce(
            (entries, schema) => ({...entries, ...schema.object.shape}),
            {}
        ) as merge.MergedSchemas<TObjectSchemas>,
        error,
        pipe
    );
}
