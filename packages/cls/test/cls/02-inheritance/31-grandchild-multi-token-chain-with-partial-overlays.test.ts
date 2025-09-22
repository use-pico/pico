import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/grandchild-multi-token-chain-with-partial-overlays", () => {
	it("token chain base→child; user overlays one token; local overlays the other", () => {
		const $base = cls(
			{
				tokens: [
					"t.text",
					"t.bg",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"t.text": {
						class: [
							"text-red-500",
						],
					},
					"t.bg": {
						class: [
							"bg-white",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t.text",
									"t.bg",
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
					"t.text": {
						class: [
							"text-blue-500",
						],
					},
					"t.bg": {
						class: [
							"bg-black",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const $grand = $child.extend(
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

		const { slots } = $grand.create(
			tweak([
				{
					token: {
						"t.text": {
							class: [
								"text-green-500",
							],
						},
					},
				},
				{},
			]),
		);

		// user overlays text; bg from child; base at end
		expect(slots.root()).toBe("text-green-500 bg-black base");
		// local overlays bg only; keeps user text overlay
		expect(
			slots.root({
				token: {
					"t.bg": {
						class: [
							"bg-yellow-100",
						],
					},
				},
			}),
		).toBe("text-green-500 bg-yellow-100 base");
	});
});
