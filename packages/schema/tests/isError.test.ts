import {
    describe,
    expect,
    test
}                    from "vitest";
import {ErrorSchema} from "../src";
import {isError}     from "../src/utils/isError";

describe("isError", () => {
    test("error is true", () => {
        expect(isError({
            error: {
                code: 42,
            },
        } as ErrorSchema.Type)).toBe(true);
    });
    test("error is false", () => {
        expect(isError("nope")).toBe(false);
    });
});
