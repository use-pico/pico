import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.variants({
		v: [
			"a",
			"b",
		],
	})
	.def()
	.defaults({
		v: "b",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/variadic: handles empty/undefined arrays", () => {
	it("ignores empty arrays and collects from non-empty", () => {
		const out = merge<TestContract>(
			[],
			[
				{
					variant: {
						v: "a",
					},
				},
			],
			[],
		);
		expect(out.variant?.v).toBe("a");
	});
});
