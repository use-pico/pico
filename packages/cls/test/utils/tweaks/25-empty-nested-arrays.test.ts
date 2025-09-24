import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { tweaks } from "../../../src/utils/tweaks";

const TestCls = contract()
	.slots([
		"root",
		"label",
		"icon",
	])
	.variants({
		size: [
			"sm",
			"md",
			"lg",
		],
		variant: [
			"primary",
			"secondary",
		],
	})
	.def()
	.defaults({
		size: "md",
		variant: "primary",
	})
	.cls();

type TestContract = (typeof TestCls)["contract"];

describe("utils/tweaks/empty nested arrays", () => {
	it("handles empty arrays and deeply nested empty structures", () => {
		const out = tweaks<TestContract>([
			// Empty array
			[],
			// Single tweak
			{
				variant: {
					size: "md",
				},
			},
			// Nested empty arrays
			[
				[],
				[
					[],
					{
						slot: {
							root: {
								class: [
									"from-deep-empty",
								],
							},
						},
					},
				],
			],
		]);

		expect(out.variant?.size).toBe("md");
		expect(out.slot?.root).toEqual({
			class: [
				"from-deep-empty",
			],
		});
	});
});
