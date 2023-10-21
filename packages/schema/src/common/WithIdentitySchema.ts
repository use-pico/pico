import {type PicoSchema} from "../api/PicoSchema";
import {nonEmpty}        from "../pipe/nonEmpty";
import {withObject}      from "../schema/object/withObject";
import {withString}      from "../schema/string/withString";

export const WithIdentitySchema = withObject({
    id: withString([nonEmpty("Non-empty")]),
});
export type WithIdentitySchema = typeof WithIdentitySchema;
export namespace WithIdentitySchema {
    export type Type = PicoSchema.Output<WithIdentitySchema>;
}
