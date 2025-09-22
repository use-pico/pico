import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/both-tweaks-all-fields-resolution", () => {
	it("resolves variant, token, slot and override with correct precedence", () => {
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
			tweak([
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
					override: {
						root: {
							class: [
								"USER-OVR",
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
					override: {
						root: {
							class: [
								"CONF-OVR",
							],
						},
					},
				},
			]),
		);

		// Precedence expectations:
		// - override: user override wins and replaces everything -> USER-OVR
		// - variant: user wins, ensuring md-specific rule would apply if not overridden
		// - token: user wins, would set text-blue-500 if not overridden
		// - slot: config before user when appending, but override clears anyway
		expect(slots.root()).toBe("USER-OVR");
	});
});
