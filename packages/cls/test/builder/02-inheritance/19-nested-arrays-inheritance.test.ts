import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays inheritance", () => {
	it("handles deeply nested arrays in inheritance scenarios", () => {
		const BaseButtonCls = contract()
			.slots([
				"root",
				"label",
			])
			.variants({
				size: [
					"sm",
					"md",
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
				variant: "primary",
			})
			.cls();

		// Test with deeply nested arrays in inheritance
		const result = ExtendedButtonCls.create([
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
									"nested-sm",
								],
							},
						},
					},
					{
						variant: {
							variant: "secondary",
						},
						slot: {
							icon: {
								class: [
									"nested-icon",
								],
							},
						},
					},
				],
			],
			// Triple nested array
			[
				[
					[
						{
							slot: {
								label: {
									class: [
										"triple-nested-label",
									],
								},
							},
						},
					],
				],
			],
		]);

		// Should combine base, inherited, and nested tweaks
		expect(result.variant.size).toBe("sm");
		expect(result.variant.variant).toBe("secondary");
		expect(result.slots.root()).toBe("base-button sm secondary nested-sm");
		expect(result.slots.label()).toBe("triple-nested-label");
		expect(result.slots.icon()).toBe("secondary-icon nested-icon");
	});
});
