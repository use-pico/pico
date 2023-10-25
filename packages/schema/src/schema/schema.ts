import {type PicoSchema}    from "../api/PicoSchema";
import {type AnySchema}     from "../api/schema/AnySchema";
import {type BoolSchema}    from "../api/schema/BoolSchema";
import {type NanSchema}     from "../api/schema/NanSchema";
import {type NullishSchema} from "../api/schema/NullishSchema";
import {type NullSchema}    from "../api/schema/NullSchema";
import {type NumberSchema}  from "../api/schema/NumberSchema";
import {type StringSchema}  from "../api/schema/StringSchema";
import {maxLength}          from "../pipe/maxLength";
import {maxValue}           from "../pipe/maxValue";
import {minLength}          from "../pipe/minLength";
import {minValue}           from "../pipe/minValue";
import {nonEmpty}           from "../pipe/nonEmpty";
import {toCustom}           from "../pipe/toCustom";
import {withAny}            from "./any/withAny";
import {withArray}          from "./array/withArray";
import {withBool}           from "./bool/withBool";
import {withEnum}           from "./enum/withEnum";
import {withNaN}            from "./nan/withNaN";
import {withNull}           from "./null/withNull";
import {withNullish}        from "./nullish/withNullish";
import {withNumber}         from "./number/withNumber";
import {withObject}         from "./object/withObject";
import {withOptional}       from "./optional/withOptional";
import {withPartial}        from "./partial/withPartial";
import {withRecord}         from "./record/withRecord";
import {withString}         from "./string/withString";
import {withUnion}          from "./union/withUnion";

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
        get any(): AnySchema;

        get any$(): NullishSchema<AnySchema>;

        array: typeof withArray;

        get bool(): BoolSchema;

        get bool$(): NullishSchema<BoolSchema>;

        enum: typeof withEnum;

        get nan(): NanSchema;

        get null(): NullSchema;

        nullish: typeof withNullish;

        get number(): NumberSchema;

        get number$(): NullishSchema<NumberSchema>;

        _number: typeof withNumber;

        object: typeof withObject;
        optional: typeof withOptional;
        partial: typeof withPartial;
        record: typeof withRecord;

        get string(): StringSchema;

        get string$(): NullishSchema<StringSchema>;

        get nonEmptyString(): StringSchema;

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
    get any() {
        return withAny();
    },
    get any$() {
        return withNullish(withAny());
    },
    array: withArray,
    get bool() {
        return withBool();
    },
    get bool$() {
        return withNullish(withBool());
    },
    enum: withEnum,
    get nan() {
        return withNaN();
    },
    get null() {
        return withNull();
    },
    nullish: withNullish,
    get number() {
        return withNumber();
    },
    get number$() {
        return withNullish(withNumber());
    },
    _number: withNumber,
    object:   withObject,
    optional: withOptional,
    partial:  withPartial,
    record:   withRecord,
    get string() {
        return withString();
    },
    get string$() {
        return withNullish(withString());
    },
    get nonEmptyString() {
        return withString([nonEmpty()]);
    },
    union: withUnion
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
