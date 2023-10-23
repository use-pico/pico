import {
    describe,
    expect,
    test
}                            from "vitest";
import {ErrorResponseSchema} from "../schema/ErrorResponseSchema";
import {isError}             from "./isError";

describe("isError", () => {
    test("error is true", () => {
        expect(isError({
            error: {
                code: 42,
            },
        } as ErrorResponseSchema.Type)).toBe(true);
    });
    test("error is false", () => {
        expect(isError("nope")).toBe(false);
    });
});
