import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/config-token-applies-before-user-slot-order", () => {
	it("ensures token classes resolve before slot and follow config→user order", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {
					level: [
						"a",
						"b",
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
							level: "b",
						},
						slot: {
							root: {
								class: [
									"b-rule",
								],
							},
						},
					},
				],
				defaults: {
					level: "a",
				},
			},
		);

		const { slots } = $cls.create(
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
					level: "b",
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

		// Expected order: token (text-red-500) then base, then matching b-rule, then config, then user
		expect(slots.root()).toBe("text-red-500 base b-rule user");
	});
});
