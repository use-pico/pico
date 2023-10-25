import {
    describe,
    expect,
    test
}                   from "vitest";
import {toCustom}   from "../src/pipe/toCustom";
import {withNumber} from "../src/schema/number/withNumber";
import {withObject} from "../src/schema/object/withObject";
import {parse}      from "../src/schema/parse";
import {withString} from "../src/schema/string/withString";
import {merge}      from "../src/utils/merge";

export function comparable(value: any): any {
    if (Array.isArray(value)) {
        return value.map((item) => comparable(item));
    }
    if (value && typeof value === "object") {
        return Object.entries(value).reduce<Record<string, any>>(
            (object, [key, value]) => {
                if (typeof value === "function") {
                    object[key] = expect.any(Function);
                } else {
                    object[key] = comparable(value);
                }
                return object;
            },
            {}
        );
    }
    return value;
}

describe("merge", () => {
    test("should merge object schemas", () => {
        const schema = merge([
            withObject({key1: withString()}),
            withObject({key2: withNumber()}),
        ]);
        expect(schema).toEqual(
            comparable(withObject({
                key1: withString(),
                key2: withNumber()
            }))
        );
        const input = {
            key1: "1",
            key2: 2
        };
        const output1 = parse(schema, input);
        expect(output1).toEqual(input);
        expect(() => parse(schema, {key1: "1"})).toThrowError();
        expect(() => parse(schema, {key2: 2})).toThrowError();
    });

    test("should overwrite schema of key", () => {
        const schema = merge([
            withObject({key: withString()}),
            withObject({key: withNumber()}),
        ]);
        expect(schema.shape.key).toEqual(comparable(withNumber()));
        const input = {key: 123};
        const output = parse(schema, input);
        expect(output).toEqual(input);
        expect(() => parse(schema, {key: "test"})).toThrowError();
    });

    test("should throw custom error", () => {
        const error = "Value is not an object!";
        const schema = merge(
            [withObject({key1: withString()}), withObject({key2: withNumber()})],
            error
        );
        expect(() => parse(schema, 123)).toThrowError(error);
    });

    test("should execute pipe", () => {
        const input = {
            key1: "1",
            key2: 1
        };
        const transformInput = () => ({
            key1: "2",
            key2: 2
        });
        const output1 = parse(
            merge(
                [withObject({key1: withString()}), withObject({key2: withNumber()})],
                [toCustom(transformInput)]
            ),
            input
        );
        const output2 = parse(
            merge([withObject({key1: withString()}), withObject({key2: withNumber()})], "Error", [
                toCustom(transformInput),
            ]),
            input
        );
        expect(output1).toEqual(transformInput());
        expect(output2).toEqual(transformInput());
    });
});
