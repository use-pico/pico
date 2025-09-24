import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/nested arrays basic", () => {
	it("handles deeply nested arrays in create() method", () => {
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

		// Test with deeply nested arrays in create()
		const result = buttonCls.create([
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
							variant: "primary",
						},
						slot: {
							label: {
								class: [
									"nested-label",
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
								"nested-icon",
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
								size: "md",
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

		// Variants should be overridden by the last one (md)
		expect(result.variant.size).toBe("md");
		expect(result.variant.variant).toBe("primary");

		// Slots should combine classes - the variant matching will apply based on final variants
		expect(result.slots.root()).toBe(
			"base-button md primary nested-sm triple-nested",
		);
		expect(result.slots.label()).toBe("nested-label");
		expect(result.slots.icon()).toBe("nested-icon");
	});
});
