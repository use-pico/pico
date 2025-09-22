import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/token-extension-and-overlay-order", () => {
	it("base token then child token override; user/local overlay win in order", () => {
		const $base = cls(
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
							"red",
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.text": {
						class: [
							"blue",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create(
			tweak([
				{
					token: {
						"color.text": {
							class: [
								"user",
							],
						},
					},
				},
				{},
			]),
		);

		// user overlay wins
		expect(slots.root()).toBe("user base");
		// local overlay wins over user
		expect(
			slots.root({
				token: {
					"color.text": {
						class: [
							"local",
						],
					},
				},
			}),
		).toBe("local base");
	});
});
