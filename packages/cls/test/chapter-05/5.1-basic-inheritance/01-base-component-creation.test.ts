import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("5.1 Basic Inheritance - Base Component Creation", () => {
	it("should create base component with token inheritance", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
				],
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
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
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
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = BaseComponent.create();
		expect(slots.root()).toBe("bg-gray-100 text-sm p-2");
	});
});
