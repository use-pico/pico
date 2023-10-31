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
import {withList}           from "./list/withList";
import {withNaN}            from "./nan/withNaN";
import {withNull}           from "./null/withNull";
import {withNullish}        from "./nullish/withNullish";
import {withNumber}         from "./number/withNumber";
import {withObject}         from "./object/withObject";
import {withOptional}       from "./optional/withOptional";
import {withPartial}        from "./partial/withPartial";
import {withRecord}         from "./record/withRecord";
import {withString}         from "./string/withString";
import {withTuple}          from "./tuple/withTuple";
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
        /**
         * Direct access to number schema factory
         */
        _number: typeof withNumber;

        /**
         * Direct access to string schema factory
         */
        _string: typeof withString;

        /**
         * Create schema allowing "any" type
         */
        get any(): AnySchema;

        /**
         * Create schema allowing "any" type with "null | undefined"
         */
        get any$(): NullishSchema<AnySchema>;

        /**
         * Create array schema
         */
        array: typeof withArray;

        /**
         * Create bool schema
         */
        get bool(): BoolSchema;

        /**
         * Create optional bool schema
         */
        get bool$(): NullishSchema<BoolSchema>;

        /**
         * Create enum schema
         */
        enum: typeof withEnum;

        list: typeof withList;

        /**
         * Create NaN schema
         */
        get nan(): NanSchema;

        /**
         * Create string schema with non empty rule
         */
        get nonEmptyString(): StringSchema;

        /**
         * Create null schema
         */
        get null(): NullSchema;

        /**
         * Wrap schema as nullish()
         */
        nullish: typeof withNullish;

        /**
         * Create number schema
         */
        get number(): NumberSchema;

        /**
         * Create optional number schema
         */
        get number$(): NullishSchema<NumberSchema>;

        /**
         * Create an object schema
         */
        object: typeof withObject;
        /**
         * Wrap schema as optional
         */
        optional: typeof withOptional;
        /**
         * Mark all object schema properties as optional
         */
        partial: typeof withPartial;

        /**
         * Create record schema
         */
        record: typeof withRecord;

        /**
         * Create string schema
         */
        get string(): StringSchema;

        /**
         * Create optional string schema
         */
        get string$(): NullishSchema<StringSchema>;

        tuple: typeof withTuple;

        /**
         * Create union schema
         */
        union: typeof withUnion;
    }

    export interface Pipe {
        /**
         * Max length rule
         */
        maxLength: typeof maxLength;
        /**
         * Max value rule
         */
        maxValue: typeof maxValue;
        /**
         * Min length rule
         */
        minLength: typeof minLength;
        /**
         * Min value rule
         */
        minValue: typeof minValue;
        /**
         * Non-empty rule
         */
        nonEmpty: typeof nonEmpty;
        /**
         * Create rule with custom callback
         */
        toCustom: typeof toCustom;
    }
}

const Schema: schema.Schema = {
    _number: withNumber,
    _string: withString,
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
    list:    withList,
    get nan() {
        return withNaN();
    },
    get nonEmptyString() {
        return withString([nonEmpty()]);
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
    tuple: withTuple,
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
