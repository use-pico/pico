import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("4.1 Basic Create Usage - Create with Custom Variants", () => {
	it("should handle create method with custom variant values", () => {
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
							size: "md",
						},
						slot: {
							root: {
								class: [
									"text-base",
									"p-4",
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
					size: "md",
				},
			},
		);

		const { slots } = Component.create({
			variant: {
				size: "lg",
			},
		});
		expect(slots.root()).toBe("bg-gray-100 rounded text-lg p-6");
	});
});
