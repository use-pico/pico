import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/user-tweak-all-fields-no-override", () => {
	it("applies user variant, token, and slot classes (user slot appends last)", () => {
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

		const { slots } = $cls.create({
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
		});

		expect(slots.root()).toBe("text-blue-500 base md user");
	});
});
