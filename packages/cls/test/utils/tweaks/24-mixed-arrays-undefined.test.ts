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

describe("utils/tweaks/mixed arrays and undefined values", () => {
	it("handles mixed arrays and single tweaks with undefined values", () => {
		const out = tweaks<TestContract>([
			// Single tweak
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"single",
						],
					},
				},
			},
			// Array with undefined
			[
				undefined,
				{
					slot: {
						label: {
							class: [
								"from-array",
							],
						},
					},
				},
				undefined,
			],
			// Nested array with undefined
			[
				[
					undefined,
					{
						variant: {
							variant: "secondary",
						},
					},
					undefined,
				],
			],
		]);

		expect(out.variant?.size).toBe("sm");
		expect(out.variant?.variant).toBe("secondary");
		expect(out.slot?.root).toEqual({
			class: [
				"single",
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"from-array",
			],
		});
	});
});
