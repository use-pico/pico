import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/slots-local-all-fields-no-override", () => {
	it("merges local (slot call) variant, token and slot with create tweaks", () => {
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
				undefined,
				{
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

		expect(
			slots.root({
				variant: {
					size: "md",
				},
				slot: {
					root: {
						class: [
							"local",
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
			}),
		).toBe("text-blue-500 base md config local");
	});
});
