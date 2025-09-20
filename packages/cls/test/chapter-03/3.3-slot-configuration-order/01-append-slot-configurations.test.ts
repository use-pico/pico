import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("3.3 Slot Configuration Order - Append Slot Configurations", () => {
	it("should append slot configurations to rules instead of overriding them", () => {
		const Component = cls(
			{
				tokens: [],
				slot: [
					"root",
					"title",
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
									"p-4",
								],
							},
							title: {
								class: [
									"text-lg",
									"font-bold",
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
									"p-6",
								],
							},
							title: {
								class: [
									"text-xl",
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

		// Test that slot configurations append to rules, not override them
		const result = instance.root({
			slot: {
				root: {
					class: [
						"text-blue-500",
						"border",
					],
				},
			},
		});

		// Should contain both base classes from rules AND slot configuration classes
		expect(result).toBe("bg-gray-100 rounded p-4 text-blue-500 border");
	});
});
