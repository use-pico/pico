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

describe("utils/tweaks/deeply nested arrays", () => {
	it("handles deeply nested arrays of tweaks", () => {
		const out = tweaks<TestContract>([
			// First level array
			[
				// Second level array
				[
					{
						variant: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"nested-1",
								],
							},
						},
					},
					{
						variant: {
							variant: "secondary",
						},
						slot: {
							label: {
								class: [
									"nested-2",
								],
							},
						},
					},
				],
				// Mixed with single tweak
				{
					slot: {
						icon: {
							class: [
								"single-tweak",
							],
						},
					},
				},
			],
			// Another first level array
			[
				[
					[
						// Triple nested
						{
							variant: {
								size: "lg",
							},
							slot: {
								root: {
									class: [
										"triple-nested",
									],
								},
							},
						},
					],
				],
			],
		]);

		// Variants should be overridden by the last one (lg)
		expect(out.variant?.size).toBe("lg");
		expect(out.variant?.variant).toBe("secondary");

		// Slots should combine classes
		expect(out.slot?.root).toEqual({
			class: [
				[
					"nested-1",
				],
				[
					"triple-nested",
				],
			],
		});
		expect(out.slot?.label).toEqual({
			class: [
				"nested-2",
			],
		});
		expect(out.slot?.icon).toEqual({
			class: [
				"single-tweak",
			],
		});
	});
});
