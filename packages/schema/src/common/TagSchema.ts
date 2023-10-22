import {type PicoSchema} from "../api/PicoSchema";
import {nonEmpty}        from "../pipe/nonEmpty";
import {withNullish}     from "../schema/nullish/withNullish";
import {withNumber}      from "../schema/number/withNumber";
import {withObject}      from "../schema/object/withObject";
import {withString}      from "../schema/string/withString";

export const TagSchema = withObject({
    id:    withString([nonEmpty()]),
    code:  withString([nonEmpty()]),
    label: withString([nonEmpty()]),
    group: withString([nonEmpty()]),
    sort:  withNullish(withNumber()),
});
export type TagSchema = typeof TagSchema;
export namespace TagSchema {
    export type Type = PicoSchema.Output<TagSchema>;
}
