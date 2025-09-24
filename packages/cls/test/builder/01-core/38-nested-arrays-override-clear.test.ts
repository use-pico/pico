import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays override and clear", () => {
	it("handles deeply nested arrays with override and clear flags in create()", () => {
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
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
			})
			.match("size", "lg", {
				root: {
					class: [
						"lg",
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

		// Test with deeply nested arrays containing override and clear flags
		const result = buttonCls.create([
			// Initial setup in nested array
			[
				{
					variant: {
						size: "sm",
						variant: "secondary",
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
						icon: {
							class: [
								"icon-initial",
							],
						},
					},
				},
			],
			// Override in deeply nested array
			[
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
			],
			// Clear flag in deeply nested array
			[
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
			],
		]);

		// Clear should reset everything except what's explicitly set
		expect(result.slots.root()).toBe("base-button md primary");
		expect(result.slots.label()).toBe("");
		expect(result.slots.icon()).toBe("after-clear");
		// Variants should be cleared by clear flag, falling back to defaults
		expect(result.variant.size).toBe("md");
		expect(result.variant.variant).toBe("primary");
	});
});
