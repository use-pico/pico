import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/inheritance/config-empty-token-overlay-clears-child-token-in-chain", () => {
	it("config empty overlay clears child token while preserving others", () => {
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
							"text-red",
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
							"text-blue",
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
				{},
				{
					token: {
						"t.text": {
							class: [],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("bg-black base");
	});
});
