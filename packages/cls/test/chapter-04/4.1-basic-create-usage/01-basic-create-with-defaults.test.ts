import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("4.1 Basic Create Usage - Basic Create with Defaults", () => {
	it("should handle basic create method with default variant values", () => {
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

		const { slots } = Component.create();
		expect(slots.root()).toBe("bg-gray-100 rounded text-base p-4");
	});
});
