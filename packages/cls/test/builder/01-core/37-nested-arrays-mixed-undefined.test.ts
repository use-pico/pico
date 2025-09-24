import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays mixed undefined", () => {
	it("handles mixed arrays and single tweaks with undefined values in create()", () => {
		const buttonCls = contract()
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
			.root({
				root: {
					class: [
						"base-button",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"sm",
					],
				},
			})
			.match("variant", "primary", {
				root: {
					class: [
						"primary",
					],
				},
			})
			.match("variant", "secondary", {
				root: {
					class: [
						"secondary",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
			})
			.cls();

		// Test with mixed arrays and undefined values
		const result = buttonCls.create([
			// Single tweak
			{
				variant: {
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"single-tweak",
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

		expect(result.variant.size).toBe("sm");
		expect(result.variant.variant).toBe("secondary");
		expect(result.slots.root()).toBe(
			"base-button sm secondary single-tweak",
		);
		expect(result.slots.label()).toBe("from-array");
		expect(result.slots.icon()).toBe("");
	});
});
