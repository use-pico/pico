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

describe("utils/tweaks/complex nested override and clear", () => {
	it("handles complex nested structure with override and clear flags", () => {
		const out = tweaks<TestContract>([
			// Initial setup
			[
				{
					variant: {
						size: "sm",
					},
					slot: {
						root: {
							class: [
								"initial",
							],
						},
						label: {
							class: [
								"label-initial",
							],
						},
					},
				},
			],
			// Override in nested array
			[
				[
					{
						override: true,
						slot: {
							root: {
								class: [
									"override-nested",
								],
							},
						},
					},
				],
			],
			// Clear flag in deeply nested structure
			[
				[
					[
						{
							clear: true,
							slot: {
								icon: {
									class: [
										"after-clear",
									],
								},
							},
						},
					],
				],
			],
		]);

		// Clear should reset everything except what's explicitly set
		expect(out.slot?.root).toBeUndefined();
		expect(out.slot?.label).toBeUndefined();
		expect(out.slot?.icon).toEqual({
			class: [
				"after-clear",
			],
		});
		// Variant should be cleared by clear flag
		expect(out.variant?.size).toBeUndefined();
	});
});
