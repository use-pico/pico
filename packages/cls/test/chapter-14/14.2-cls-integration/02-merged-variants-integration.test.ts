import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";

describe("14.2 CLS Integration - Merged Variants Integration", () => {
	it("should work with merged variants from multiple builder calls", () => {
		// Build contract with merged variants
		const result = contract()
			.token("theme.primary")
			.slot("wrapper")
			.variant("tone", [
				"primary",
				"secondary",
			])
			.variant("tone", [
				"danger",
				"success",
			]) // Should merge with existing tone values
			.variant("size", [
				"sm",
			])
			.variant("size", [
				"md",
				"lg",
			]) // Should merge with existing size values
			.build();

		// Verify the merged structure
		expect(result.variant.tone).toEqual([
			"primary",
			"secondary",
			"danger",
			"success",
		]);
		expect(result.variant.size).toEqual([
			"sm",
			"md",
			"lg",
		]);

		// Create CLS instance with merged variants
		const Component = cls(result, {
			token: {
				"theme.primary": {
					class: [
						"bg-blue-600",
					],
				},
			},
			rules: [
				{
					slot: {
						wrapper: {
							token: [
								"theme.primary",
							],
						},
					},
				},
				{
					match: {
						tone: "danger",
					},
					slot: {
						wrapper: {
							class: [
								"bg-red-500",
							],
						},
					},
				},
				{
					match: {
						tone: "success",
					},
					slot: {
						wrapper: {
							class: [
								"bg-green-500",
							],
						},
					},
				},
				{
					match: {
						size: "lg",
					},
					slot: {
						wrapper: {
							class: [
								"text-lg",
							],
						},
					},
				},
			],
			defaults: {
				tone: "primary",
				size: "md",
			},
		});

		// Test default instance
		const { slots: defaultInstance } = Component.create();
		expect(defaultInstance.wrapper()).toBe("bg-blue-600");

		// Test merged variant values work
		const { slots: dangerInstance } = Component.create({
			variant: {
				tone: "danger", // This should work with merged values
			},
		});
		expect(dangerInstance.wrapper()).toBe("bg-red-500");

		const { slots: successInstance } = Component.create({
			variant: {
				tone: "success", // This should work with merged values
			},
		});
		expect(successInstance.wrapper()).toBe("bg-green-500");

		const { slots: largeInstance } = Component.create({
			variant: {
				size: "lg", // This should work with merged values
			},
		});
		expect(largeInstance.wrapper()).toBe("bg-blue-600 text-lg");
	});
});
