import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/local-override-wins-over-user-override", () => {
	it("local call override replaces user override", () => {
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
						"USER-OVR",
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
			override: true,
		});

		expect(
			slots.root({
				override: true,
				slot: {
					root: {
						class: [
							"LOCAL-OVR",
						],
					},
				},
			}),
		).toBe("text-blue-500 base md user USER-OVR LOCAL-OVR");
	});
});
