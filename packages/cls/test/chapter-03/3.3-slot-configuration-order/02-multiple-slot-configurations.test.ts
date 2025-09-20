import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Multiple Slot Configurations", () => {
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

		const { slots: instance } = Component.create();

		// Test with both variant and slot configuration
		const result = instance.root({
			variant: {
				theme: "dark",
			},
			slot: {
				root: {
					class: [
						"user-added-class",
						"custom-styling",
					],
				},
			},
		});

		// Should contain: base classes + dark theme classes + user slot classes
		expect(result).toBe(
			"base-class component-class dark-theme user-added-class custom-styling",
		);
	});
});
