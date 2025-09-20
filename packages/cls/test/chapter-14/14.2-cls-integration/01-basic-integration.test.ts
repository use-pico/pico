import { describe, expect, it } from "vitest";
import { cls, contract, type Variant } from "../../../src";

describe("14.2 CLS Integration - Basic Integration", () => {
	it("should create a working CLS instance from builder contract", () => {
		// Build contract using the fluent API
		const result = contract()
			.tokens([
				"color.bg.primary",
				"color.text.primary",
			])
			.slots([
				"root",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();

		const _variants: Variant.Optional<typeof result> = {
			size: "md",
		};

		// Create CLS instance with the built contract
		const Button = cls(result, {
			token: {
				"color.bg.primary": {
					class: [
						"bg-blue-500",
					],
				},
				"color.text.primary": {
					class: [
						"text-white",
					],
				},
			},
			rules: [
				{
					slot: {
						root: {
							token: [
								"color.bg.primary",
								"color.text.primary",
							],
						},
					},
				},
				{
					match: {
						size: "sm",
					},
					slot: {
						root: {
							class: [
								"px-2",
								"py-1",
							],
						},
					},
				},
			],
			defaults: {
				size: "md",
				tone: "light",
			},
		});

		// Test basic functionality
		const { slots } = Button.create();
		expect(slots.root()).toBe("bg-blue-500 text-white");
		expect(slots.label).toBeDefined();

		// Test variant functionality
		const { slots: smallSlots } = Button.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallSlots.root()).toBe("bg-blue-500 text-white px-2 py-1");

		// Verify contract reference
		expect(Button.contract).toBe(result);
	});
});
