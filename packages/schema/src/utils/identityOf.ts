import {type ObjectSchema}  from "../api/schema/ObjectSchema";
import {WithIdentitySchema} from "../common/WithIdentitySchema";
import {schema}             from "../schema/schema";
import {merge}              from "./merge";

export namespace identityOf {
    export type Props<
        TSchema extends ObjectSchema<any>,
    > = (factory: schema.Schema) => TSchema;
}

export const identityOf = <
    TSchema extends ObjectSchema<any>,
>(
    factory: identityOf.Props<TSchema>,
) => {
    return merge([
        WithIdentitySchema,
        schema(factory),
    ]);
};
