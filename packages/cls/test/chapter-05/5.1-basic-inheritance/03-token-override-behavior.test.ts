import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("5.1 Basic Inheritance - Token Override Behavior", () => {
	it("should properly override inherited tokens", () => {
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
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const ExtendedComponent = BaseComponent.extend(
			{
				tokens: [
					"color.bg.default",
					"color.bg.primary",
				],
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
				token: {
					"color.bg.default": {
						class: [
							"bg-blue-100",
						],
					},
					"color.bg.primary": {
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
								],
							},
						},
					},
				],
				defaults: {
					size: "lg",
				},
			},
		);

		const { slots } = ExtendedComponent.create();
		expect(slots.root()).toBe("bg-blue-100");
	});
});
