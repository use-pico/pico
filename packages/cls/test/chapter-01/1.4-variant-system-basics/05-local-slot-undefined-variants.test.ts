import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("local slot undefined variants", () => {
	it("should work with local slot configurations", () => {
		const buttonCls = cls(
			{
				tokens: [
					"base",
				],
				slot: [
					"root",
				],
				variant: {
					type: [
						"primary",
						"secondary",
					],
				},
			},
			{
				defaults: {
					type: "primary",
				},
				token: {
					base: {
						class: [
							"base-styles",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"base",
								],
							},
						},
					},
					{
						match: {
							type: "primary",
						},
						slot: {
							root: {
								class: [
									"bg-blue-500",
								],
							},
						},
					},
					{
						match: {
							type: "secondary",
						},
						slot: {
							root: {
								class: [
									"bg-gray-500",
								],
							},
						},
					},
				],
			},
		);

		const { slots } = buttonCls.create();

		// Test local configuration with undefined variant
		const result = slots.root({
			variant: {
				type: undefined, // Should be filtered out, use default "primary"
			},
		});

		// Should use default type "primary"
		expect(result).toBe("base-styles bg-blue-500");
	});
});
