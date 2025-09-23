import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

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
		const out = tweaks<TestContract>([
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
