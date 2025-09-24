import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-user-token-wins-over-child-token", () => {
	it("user token overlay wins over child token override", () => {
		const baseButtonCls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {},
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
				],
				defaults: {},
			},
		);

		const childButtonCls = baseButtonCls.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = childButtonCls.create({
			token: {
				"color.text": {
					class: [
						"text-yellow-500",
					],
				},
			},
		});

		expect(slots.root()).toBe("text-yellow-500 base child");
	});
});
