import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/create-both-args-and-local-no-override-resolution", () => {
	it("merges user+config tweaks, then local slot tweaks (no override) apply last", () => {
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
			tweaks([
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
			]),
		);

		// Without local overrides, both tweaks merge as usual
		expect(slots.root()).toBe("text-blue-500 base md user");

		// With local token+slot (no override), local applies last and token wins
		expect(
			slots.root({
				// optional: variant can be repeated; not required to change outcome here
				token: {
					"color.text": {
						class: [
							"text-yellow-500",
						],
					},
				},
				slot: {
					root: {
						class: [
							"local",
						],
					},
				},
			}),
		).toBe("text-yellow-500 base md user local");
	});
});
