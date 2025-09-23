import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/token-what-level-override-in-config-tweak", () => {
	it("Token What-level override in config tweak replaces accumulated classes", () => {
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
								class: [
									"base",
								],
							},
						},
					},
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

		// Test Token What-level override in config tweak at create()
		const { slots } = $cls.create(undefined, {
			token: {
				"color.text": {
					class: [
						"text-green-500",
					],
					override: true,
				},
			},
		});

		expect(slots.root()).toBe("base text-green-500");
	});
});
