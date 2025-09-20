import { describe, expect, it } from "vitest";
import { cls, contract } from "../../../src";

describe("14.3 Complete Builder - Contract to CLS", () => {
	it("should demonstrate contract builder working perfectly with cls()", () => {
		// Build contract using fluent API
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

		// Create CLS instance using the built contract
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
				{
					match: {
						size: "lg",
					},
					slot: {
						root: {
							class: [
								"px-6",
								"py-3",
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

		// Test the created CLS instance
		const { slots: instance } = Button.create();
		expect(instance.root()).toBe("bg-blue-500 text-white");
		expect(instance.label).toBeDefined();

		// Test variant functionality
		const { slots: smallInstance } = Button.create({
			variant: {
				size: "sm",
			},
		});
		expect(smallInstance.root()).toBe("bg-blue-500 text-white px-2 py-1");

		const { slots: largeInstance } = Button.create({
			variant: {
				size: "lg",
			},
		});
		expect(largeInstance.root()).toBe("bg-blue-500 text-white px-6 py-3");

		// Verify the CLS instance has proper structure
		expect(Button).toBeDefined();
		expect(Button.contract).toBeDefined();
		expect(Button.create).toBeDefined();
		expect(Button.extend).toBeDefined();
	});
});
