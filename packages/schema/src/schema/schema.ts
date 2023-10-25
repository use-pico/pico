import {type PicoSchema} from "../api/PicoSchema";
import {maxLength}       from "../pipe/maxLength";
import {maxValue}        from "../pipe/maxValue";
import {minLength}       from "../pipe/minLength";
import {minValue}        from "../pipe/minValue";
import {nonEmpty}        from "../pipe/nonEmpty";
import {toCustom}        from "../pipe/toCustom";
import {withAny}         from "./any/withAny";
import {withArray}       from "./array/withArray";
import {withBool}        from "./bool/withBool";
import {withEnum}        from "./enum/withEnum";
import {withNaN}         from "./nan/withNaN";
import {withNull}        from "./null/withNull";
import {withNullish}     from "./nullish/withNullish";
import {withNumber}      from "./number/withNumber";
import {withObject}      from "./object/withObject";
import {withOptional}    from "./optional/withOptional";
import {withPartial}     from "./partial/withPartial";
import {withRecord}      from "./record/withRecord";
import {withString}      from "./string/withString";
import {withUnion}       from "./union/withUnion";

export namespace schema {
    export interface Factory<TSchema extends PicoSchema> {
        /**
         * Factory function with all the juice stuff from schema package.
         *
         * @param z we're all used to the big "Z", aren't we?
         * @param p pipes
         */
        (z: Schema, p: Pipe): TSchema;
    }

    export interface Schema {
        any: typeof withAny;
        array: typeof withArray;
        bool: typeof withBool;
        enum: typeof withEnum;
        nan: typeof withNaN;
        null: typeof withNull;
        nullish: typeof withNullish;
        number: typeof withNumber;
        object: typeof withObject;
        optional: typeof withOptional;
        partial: typeof withPartial;
        record: typeof withRecord;
        string: typeof withString;
        union: typeof withUnion;
    }

    export interface Pipe {
        maxLength: typeof maxLength;
        maxValue: typeof maxValue;
        minLength: typeof minLength;
        minValue: typeof minValue;
        nonEmpty: typeof nonEmpty;
        toCustom: typeof toCustom;
    }
}

const Schema: schema.Schema = {
    any:      withAny,
    array:    withArray,
    bool:     withBool,
    enum:     withEnum,
    nan:      withNaN,
    null:     withNull,
    nullish:  withNullish,
    number:   withNumber,
    object:   withObject,
    optional: withOptional,
    partial:  withPartial,
    record:   withRecord,
    string:   withString,
    union:    withUnion,
};
const Pipe: schema.Pipe = {
    maxLength,
    maxValue,
    minLength,
    minValue,
    nonEmpty,
    toCustom,
};

/**
 * Schema factory with all the pieces available; (maybe) a bit bigger bundle size using this, but DX is much
 * better.
 */
export const schema = <
    TSchema extends PicoSchema,
>(
    factory: schema.Factory<TSchema>
): TSchema => factory(Schema, Pipe);
