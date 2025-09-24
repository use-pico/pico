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

describe("utils/tweaks/maximum nesting depth", () => {
	it("handles maximum nesting depth with mixed content", () => {
		const out = tweaks<TestContract>([
			// 4 levels deep
			[
				[
					[
						[
							{
								variant: {
									size: "lg",
								},
								slot: {
									root: {
										class: [
											"level-4",
										],
									},
								},
							},
							{
								slot: {
									label: {
										class: [
											"level-4-label",
										],
									},
								},
							},
						],
					],
				],
			],
			// Mixed with single tweak at root
			{
				slot: {
					icon: {
						class: [
							"root-level",
						],
					},
				},
			},
		]);

		expect(out.variant?.size).toBe("lg");
		expect(out.slot?.root).toEqual({
			class: [
				"level-4",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"level-4-label",
			],
		});
		expect(out.slot?.icon).toEqual({
			class: [
				"root-level",
			],
		});
	});
});
