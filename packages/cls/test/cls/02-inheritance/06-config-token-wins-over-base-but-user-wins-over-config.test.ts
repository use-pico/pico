import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/config-token-wins-over-base-but-user-wins-over-config", () => {
	it("config token beats base, user token beats config", () => {
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
				token: {},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = childButtonCls.create(
			{
				token: {
					"color.text": {
						class: [
							"text-yellow-500",
						],
					},
				},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("text-blue-500 base");
	});
});
