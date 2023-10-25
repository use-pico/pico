import {
    describe,
    expect,
    test
} from "vitest";
import {
    isPartial,
    schema
} from "../src";

const Schema = schema(z => z.object({
    foo:      z.string,
    bar:      z.number$,
    optional: z.bool$,
}));

describe("partial works", () => {
    test("Partial is partial", () => {
        expect(isPartial(Schema, "foo")).toBeFalsy();
        expect(isPartial(Schema, "bar")).toBeTruthy();
        expect(isPartial(Schema, "optional")).toBeTruthy();
    });
});
