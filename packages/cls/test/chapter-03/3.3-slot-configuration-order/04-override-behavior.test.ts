import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Override Behavior", () => {
	it("should handle overrides correctly (clear and replace)", () => {
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
									"base-styling",
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

		// Test override behavior
		const result = instance.root({
			variant: {
				size: "md",
			},
			override: {
				root: {
					class: [
						"override-class",
						"replacement-styling",
					],
				},
			},
		});

		// Override should clear all previous classes and only apply override classes
		expect(result).toBe("override-class replacement-styling");
	});
});
