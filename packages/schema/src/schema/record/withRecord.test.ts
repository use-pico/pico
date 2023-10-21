import {
    describe,
    expect,
    test
}                   from "vitest";
import {maxLength}  from "../../pipe/maxLength";
import {minLength}  from "../../pipe/minLength";
import {toCustom}   from "../../pipe/toCustom";
import {withAny}    from "../any/withAny";
import {withNumber} from "../number/withNumber";
import {withObject} from "../object/withObject";
import {parse}      from "../parse";
import {ParseError} from "../ParseError";
import {withString} from "../string/withString";
import {withUnion}  from "../union/withUnion";
import {withRecord} from "./withRecord";

describe("record", () => {
    test("should pass only objects", () => {
        const schema1 = withRecord(withNumber());
        const input1 = {
            key1: 1,
            key2: 2
        };
        const output1 = parse(schema1, input1);
        expect(output1).toEqual(input1);
        expect(() => parse(schema1, {test: "hello"})).toThrowError();
        expect(() => parse(schema1, "test")).toThrowError();
        expect(() => parse(schema1, 123)).toThrowError();

        const schema2 = withRecord(
            withString([
                minLength(3),
            ]),
            withUnion([withString(), withNumber()])
        );
        const input2 = {
            1234: 1234,
            test: "hello"
        };
        const output2 = parse(schema2, input2);
        expect(output2).toEqual(input2);
        expect(() => parse(schema2, {a: "test"})).toThrowError();
        expect(() => parse(schema2, {test: null})).toThrowError();
        expect(() => parse(schema2, "test")).toThrowError();
        expect(() => parse(schema2, 123)).toThrowError();
    });

    test("should throw custom error", () => {
        const error = "Value is not an object!";
        const schema = withRecord(withString(), error);
        expect(() => parse(schema, 123)).toThrowError(error);
    });

    test("should throw every issue", () => {
        const schema1 = withRecord(withNumber());
        const input1 = {
            1: "1",
            2: 2,
            3: "3",
            4: "4"
        };
        expect(() => parse(schema1, input1)).toThrowError();
        try {
            parse(schema1, input1);
        } catch (error) {
            expect((error as ParseError).issues.length).toBe(3);
        }

        const schema2 = withRecord(withString([minLength(2)]), withNumber());
        const input2 = {
            "1": "1",
            2:   2,
            3:   "3"
        };
        expect(() => parse(schema2, input2)).toThrowError();
        try {
            parse(schema2, input2);
        } catch (error) {
            expect((error as ParseError).issues.length).toBe(5);
        }
    });

    test("should throw only first issue", () => {
        const info = {abortEarly: true};

        const schema1 = withRecord(withNumber());
        const input1 = {
            1: "1",
            2: 2,
            3: "3"
        };
        expect(() => parse(schema1, input1, info)).toThrowError();
        try {
            parse(schema1, input1, info);
        } catch (error) {
            expect((error as ParseError).issues.length).toBe(1);
            expect((error as ParseError).issues[0].origin).toBe("value");
        }

        const schema2 = withRecord(withString([minLength(2)]), withNumber());
        const input2 = {
            "1": "1",
            2:   2,
            3:   "3"
        };
        expect(() => parse(schema2, input2, info)).toThrowError();
        try {
            parse(schema2, input2, info);
        } catch (error) {
            expect((error as ParseError).issues.length).toBe(1);
            expect((error as ParseError).issues[0].origin).toBe("key");
        }
    });

    test("should return issue path", () => {
        const schema1 = withRecord(withNumber());
        const input1 = {
            a: 1,
            b: "2",
            c: 3
        };
        const result1 = schema1.parse(input1);
        expect(result1.issues?.[0].path).toEqual([
            {
                schema: "record",
                input:  input1,
                key:    "b",
                value:  input1.b,
            },
        ]);

        const schema2 = withRecord(withObject({key: withString()}));
        const input2 = {
            a: {key: "test"},
            b: {key: 123}
        };
        const result2 = schema2.parse(input2);
        expect(result2.issues?.[0].origin).toBe("value");
        expect(result2.issues?.[0].path).toEqual([
            {
                schema: "record",
                input:  input2,
                key:    "b",
                value:  input2.b,
            },
            {
                schema: "object",
                input:  input2.b,
                key:    "key",
                value:  input2.b.key,
            },
        ]);

        const schema3 = withRecord(withString([maxLength(1)]), withNumber());
        const input3 = {
            a:  1,
            bb: 2,
            c:  3
        };
        const result3 = schema3.parse(input3);
        expect(result3.issues?.[0].origin).toBe("key");
        expect(result3.issues?.[0].path).toEqual([
            {
                schema: "record",
                input:  input3,
                key:    "bb",
                value:  input3.bb,
            },
        ]);
    });

    test("should execute pipe", () => {
        const input = {
            key1: 1,
            key2: 1
        };
        const transformInput = (): Record<string, number> => ({
            key1: 2,
            key2: 2
        });
        const output1 = parse(withRecord(withNumber(), [toCustom(transformInput)]), input);
        const output2 = parse(
            withRecord(withString(), withNumber(), [toCustom(transformInput)]),
            input
        );
        const output3 = parse(
            withRecord(withNumber(), "Error", [toCustom(transformInput)]),
            input
        );
        const output4 = parse(
            withRecord(withString(), withNumber(), "Error", [toCustom(transformInput)]),
            input
        );
        expect(output1).toEqual(transformInput());
        expect(output2).toEqual(transformInput());
        expect(output3).toEqual(transformInput());
        expect(output4).toEqual(transformInput());
    });

    test("should prevent prototype pollution", () => {
        const schema = withRecord(withString(), withAny());
        const input = JSON.parse("{\"__proto__\":{\"polluted\":\"yes\"}}") as any;
        expect(input.__proto__.polluted).toBe("yes");
        expect(({} as any).polluted).toBeUndefined();
        const output = parse(schema, input);
        expect(output.__proto__.polluted).toBeUndefined();
        expect(output.polluted).toBeUndefined();
    });
});
