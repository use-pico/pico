import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.2 Token System Basics - Token Type System", () => {
	it("should enforce token type safety across component hierarchy", () => {
		const BaseComponent = cls(
			{
				tokens: [
					"color.bg.default",
					"color.text.primary",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
					"color.text.primary": {
						class: [
							"text-gray-900",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.primary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.text.primary",
					"color.bg.accent",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-blue-100",
						],
					},
					"color.text.primary": {
						class: [
							"text-blue-900",
						],
					},
					"color.bg.accent": {
						class: [
							"bg-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.default",
									"color.text.primary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = ExtendedComponent.create();
		expect(slots.root()).toBe("bg-blue-100 text-blue-900");
	});
});
