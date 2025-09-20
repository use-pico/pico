import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("5.1 Basic Inheritance - Extend with Additional Features", () => {
	it("should extend base component with additional tokens and variants", () => {
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

		const { slots } = ExtendedComponent.create();
		expect(slots.root()).toBe("text-sm p-2 bg-blue-100");
	});
});
