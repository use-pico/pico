import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.1 Basic Rule Matching - Simple Rule Matching", () => {
	it("should handle simple rule matching with variant conditions", () => {
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
				},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"bg-gray-100",
									"rounded",
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
									"text-sm",
									"p-2",
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
									"text-lg",
									"p-6",
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

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100 rounded text-sm p-2");
	});
});
