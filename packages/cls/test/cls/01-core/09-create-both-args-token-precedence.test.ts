import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/create-both-args-token-precedence", () => {
	it("user token overlay wins over config token overlay for the 'root' slot", () => {
		const $cls = cls(
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

		const { slots } = $cls.create(
			{
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
					},
				},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-green-500",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("text-green-500 base");
	});
});
