import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.2 Complex Rule Combinations - Multiple Variant Rules", () => {
	it("should handle multiple variant rules with different combinations", () => {
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
						"lg",
					],
					color: [
						"primary",
						"secondary",
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
									"rounded",
									"font-medium",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
							color: "primary",
						},
						slot: {
							root: {
								class: [
									"text-sm",
									"p-2",
									"bg-blue-500",
									"text-white",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
							color: "secondary",
						},
						slot: {
							root: {
								class: [
									"text-lg",
									"p-6",
									"bg-green-500",
									"text-white",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					color: "primary",
				},
			},
		);

		const { slots } = Component.create();
		expect(slots.root()).toBe(
			"rounded font-medium text-sm p-2 bg-blue-500 text-white",
		);
	});
});
