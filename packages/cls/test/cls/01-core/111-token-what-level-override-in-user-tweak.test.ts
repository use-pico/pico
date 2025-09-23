import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/token-what-level-override-in-user-tweak", () => {
	it("Token What-level override in user tweak replaces accumulated classes", () => {
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

		// Test Token What-level override in user tweak at create()
		const { slots } = $cls.create({
			token: {
				"color.text": {
					class: [
						"text-blue-500",
					],
					override: true,
				},
			},
		});

		expect(slots.root()).toBe("base text-blue-500");
	});
});
