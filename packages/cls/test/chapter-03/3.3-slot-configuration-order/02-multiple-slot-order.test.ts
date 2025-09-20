import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Multiple Slot Order", () => {
	it("should handle multiple slot configurations in correct order", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"base-class",
									"component-class",
								],
							},
						},
					},
					{
						match: {
							theme: "dark",
						},
						slot: {
							root: {
								class: [
									"dark-theme",
								],
							},
						},
					},
				],
				defaults: {
					theme: "light",
				},
			},
		);

		const { slots } = Component.create();

		// Test multiple slot configurations are applied in correct order
		const result = slots.root({
			slot: {
				root: {
					class: [
						"user-class-1",
						"user-class-2",
					],
				},
			},
		});

		// Should append user classes after component base classes
		expect(result).toBe(
			"base-class component-class user-class-1 user-class-2",
		);
	});
});
