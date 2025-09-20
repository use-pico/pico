import { describe, expect, it } from "vitest";
import { cls, merge } from "../../../src";

describe("3.3 Slot Configuration Order - Merge Overrides Behavior", () => {
	it("should demonstrate that merge.ts overrides slots instead of appending them", () => {
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
				],
				defaults: {
					size: "sm",
				},
			},
		);

		// Simulate the Icon component scenario:
		// - User provides cls prop with slot configuration
		// - Component provides internal slot configuration

		// Use merge function like useCls does
		const mergedConfig = merge(
			{
				slot: {
					root: {
						class: [
							"user-slot-class",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"internal-slot-class",
						],
					},
				},
			},
		);

		// Create component with merged config
		const { slots: instance } = Component.create(undefined, mergedConfig);

		// Test the result
		const result = instance.root();

		// EXPECTATION: We want both classes to be present
		// ACTUAL: Only user-slot-class is present (internal-slot-class is overridden)
		expect(result).toBe(
			"component-base internal-slot-class user-slot-class",
		);
	});
});
