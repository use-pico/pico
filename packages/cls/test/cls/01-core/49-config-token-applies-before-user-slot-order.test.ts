import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-token-applies-before-user-slot-order", () => {
	it("ensures token classes resolve before slot and follow config→user order", () => {
		const buttonCls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"primary",
						"secondary",
					],
				},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-red-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.text",
								],
								class: [
									"base",
								],
							},
						},
					},
					{
						match: {
							level: "secondary",
						},
						slot: {
							root: {
								class: [
									"secondary-rule",
								],
							},
						},
					},
				],
				defaults: {
					level: "primary",
				},
			},
		);

		const { slots } = buttonCls.create(
			{
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
			},
			{
				variant: {
					level: "secondary",
				},
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		// Expected order: token (text-red-500) then base, then matching secondary-rule, then config, then user
		expect(slots.root()).toBe(
			"text-red-500 base secondary-rule user config",
		);
	});
});
