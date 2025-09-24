import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/both-tweaks-all-fields-resolution", () => {
	it("config override wins over user override with correct precedence", () => {
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
							"USER-OVERRIDE",
						],
						override: true,
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
							"CONFIG-OVERRIDE",
						],
						override: true,
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

		// Precedence expectations:
		// - override: config override wins over user override -> CONFIG-OVERRIDE
		// - variant: user wins, ensuring md-specific rule would apply if not overridden
		// - token: config wins (text-green-500)
		// - slot: config override replaces all accumulated classes
		expect(slots.root()).toBe("config CONFIG-OVERRIDE");
	});
});
