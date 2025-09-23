import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/cache-same-params-produce-same-result", () => {
	it("returns same output for identical tweaks across repeated calls", () => {
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
			},
			{
				slot: {
					root: {
						class: [
							"config",
						],
					},
				},
			},
		);

		const args = {
			token: {
				"color.text": {
					class: [
						"text-blue-500",
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
		};

		const r1 = slots.root(args);
		const r2 = slots.root(args);
		const r3 = slots.root({
			token: {
				"color.text": {
					class: [
						"text-blue-500",
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
		});

		expect(r1).toBe("text-blue-500 base md user config local");
		expect(r2).toBe("text-blue-500 base md user config local");
		expect(r3).toBe("text-blue-500 base md user config local");
	});
});
