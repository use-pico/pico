import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/token-what-level-override-precedence-user-wins-over-config", () => {
	it("Token What-level override precedence: user override wins over config override", () => {
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

		const { slots } = $cls.create(
			{
				token: {
					"color.text": {
						class: [
							"text-blue-500",
						],
						override: true,
					},
				},
			},
			{
				token: {
					"color.text": {
						class: [
							"text-green-500",
						],
						override: true,
					},
				},
			},
		);

		// User Token What-level override should win over config Token What-level override
		expect(slots.root()).toBe("base text-green-500");
	});
});
