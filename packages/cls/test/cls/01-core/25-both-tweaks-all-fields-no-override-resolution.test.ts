import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/both-tweaks-all-fields-no-override-resolution", () => {
	it("resolves variant, token and slot without overrides (user wins variant, config wins token)", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
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
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = $cls.create(
			{
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"user",
						],
					},
				},
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
					size: "sm",
				},
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
				token: {
					"color.text": {
						class: [
							"text-green-500",
						],
					},
				},
			},
		);

		// Expectations without override:
		// - variant: user wins (md) -> md rule applied
		// - token: config wins (text-green-500)
		// - slot: base + md + config + user (config before user)
		expect(slots.root()).toBe("text-green-500 base user config");
	});
});
