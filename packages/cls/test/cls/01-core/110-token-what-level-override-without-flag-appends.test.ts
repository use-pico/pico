import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/token-what-level-override-without-flag-appends", () => {
	it("Token What-level without override flag appends normally", () => {
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
						override: false,
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

		const { slots } = $cls.create();

		// Token without override flag should append to accumulated classes
		expect(slots.root()).toBe("base text-red-500");
	});
});
