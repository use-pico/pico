import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - User Config with Slots", () => {
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

		const { slots } = Component.create({
			variant: {
				size: "md",
			},
		});

		// Test with additional slot configuration
		const result = slots.root({
			slot: {
				root: {
					class: [
						"internal-slot-class",
					],
				},
			},
		});

		expect(result).toBe("component-base size-md internal-slot-class");
	});
});
