import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays complex override and clear", () => {
	it("handles complex multi-level inheritance with deeply nested arrays containing override and clear flags", () => {
		const BaseButtonCls = contract()
			.slots([
				"root",
				"label",
			])
			.variants({
				size: [
					"sm",
					"md",
					"lg",
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
			.defaults({
				size: "md",
			})
			.cls();

		const ExtendedButtonCls = contract(BaseButtonCls.contract)
			.slots([
				"icon",
			])
			.variants({
				variant: [
					"primary",
					"secondary",
				],
			})
			.def()
			.match("variant", "primary", {
				root: {
					class: [
						"primary",
					],
				},
				icon: {
					class: [
						"primary-icon",
					],
				},
			})
			.match("variant", "secondary", {
				root: {
					class: [
						"secondary",
					],
				},
				icon: {
					class: [
						"secondary-icon",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
			})
			.cls();

		const FinalButtonCls = contract(ExtendedButtonCls.contract)
			.variants({
				disabled: [
					"true",
					"false",
				],
			})
			.def()
			.match("disabled", "true", {
				root: {
					class: [
						"disabled",
					],
				},
			})
			.match("disabled", "false", {
				root: {
					class: [
						"enabled",
					],
				},
			})
			.defaults({
				size: "md",
				variant: "primary",
				disabled: "false",
			})
			.cls();

		// Test with complex deeply nested arrays containing override and clear flags
		const result = FinalButtonCls.create([
			// Initial setup in nested array
			[
				{
					variant: {
						size: "lg",
						variant: "secondary",
						disabled: "true",
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
		expect(result.slots.root()).toBe("base-button md primary enabled");
		expect(result.slots.label()).toBe("");
		expect(result.slots.icon()).toBe("primary-icon after-clear");
		// Variants should be cleared by clear flag, falling back to defaults
		expect(result.variant.size).toBe("md");
		expect(result.variant.variant).toBe("primary");
		expect(result.variant.disabled).toBe("false");
	});
});
