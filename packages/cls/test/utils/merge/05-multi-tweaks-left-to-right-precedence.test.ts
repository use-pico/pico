import { describe, expect, it } from "vitest";
import { contract, merge } from "../../../src";

const TestCls = contract()
	.variants({
		size: [
			"sm",
			"md",
			"lg",
		],
	})
	.def()
	.defaults({
		size: "lg",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/merge/multi tweaks precedence", () => {
	it("earlier array items should override later items (left-to-right wins)", () => {
		const out = merge<TestContract>([
			{
				variant: {
					size: "lg",
				},
			},
			{
				variant: {
					size: "md",
				},
			},
			{
				variant: {
					size: "sm",
				},
			},
		]);
		expect(out.variant?.size).toBe("lg");
	});
});
