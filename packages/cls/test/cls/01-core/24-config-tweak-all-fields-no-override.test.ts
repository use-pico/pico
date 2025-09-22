import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/config-tweak-all-fields-no-override", () => {
	it("applies config variant, token and slot; config slot before user", () => {
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
					variant: {
						size: "md",
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
								"text-blue-500",
							],
						},
					},
				},
			]),
		);

		expect(slots.root()).toBe("text-blue-500 base md config");
	});
});
