import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - User Config and Slot Function Calls", () => {
	it("should handle slot configurations with user config and slot function calls", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
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
									"component-base",
								],
							},
						},
					},
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"size-md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots: instance } = Component.create();

		// Test the complete flow: rules -> slot function -> user config
		const result = instance.root(
			// User config (should be applied after slot function)
			{
				slot: {
					root: {
						class: [
							"user-config-class",
						],
					},
				},
			},
		);

		// Order should be: component-base + user-config-class (slot function was removed)
		expect(result).toBe("component-base user-config-class");
	});
});
