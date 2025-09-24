import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-token-overlay-wins-over-user-and-config", () => {
	it("config token wins over user token, local token overlay wins over both", () => {
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

		expect(slots.root()).toBe("text-green-500");
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [
							"text-yellow-500",
						],
					},
				},
			}),
		).toBe("text-yellow-500");
	});
});
