import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-token-wins-over-user-and-config-with-variant", () => {
	it("local token overlay wins even when variant rules add class", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {
					tone: [
						"light",
						"dark",
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
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"dark",
								],
							},
						},
					},
				],
				defaults: {
					tone: "light",
				},
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
				variant: {
					tone: "dark",
				},
			},
		);

		// User token overlay wins over base token, variant adds dark
		expect(slots.root()).toBe("text-blue-500 base dark");

		// Local token overlay wins above both
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
		).toBe("text-yellow-500 base dark");
	});
});
