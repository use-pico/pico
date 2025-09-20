import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("undefined variant filtering", () => {
	it("should filter out undefined variant values and preserve defaults", () => {
		const buttonCls = cls(
			{
				tokens: [
					"primary",
					"secondary",
				],
				slot: [
					"root",
				],
				variant: {
					type: [
						"primary",
						"secondary",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				defaults: {
					type: "primary",
					size: "md",
				},
				token: {
					primary: {
						class: [
							"bg-blue-500",
							"text-white",
						],
					},
					secondary: {
						class: [
							"bg-gray-500",
							"text-white",
						],
					},
				},
				rules: [
					{
						match: {
							type: "primary",
						},
						slot: {
							root: {
								token: [
									"primary",
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
								token: [
									"secondary",
								],
							},
						},
					},
				],
			},
		);

		// Test that undefined values don't override defaults
		const { slots } = buttonCls.create({
			variant: {
				type: undefined, // This should be filtered out
				size: "lg", // This should override the default
			},
		});

		// Should use default type "primary" and override size to "lg"
		expect(slots.root()).toBe("bg-blue-500 text-white");
	});
});
