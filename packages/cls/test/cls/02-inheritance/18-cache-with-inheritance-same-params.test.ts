import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/cache-with-inheritance-same-params", () => {
	it("returns same output for identical params across repeated calls", () => {
		const $base = cls(
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
							"red",
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

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = $child.create(
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
						"blue",
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
						"blue",
					],
				},
			},
		});

		expect(r1).toBe("blue base md user");
		expect(r2).toBe("blue base md user");
		expect(r3).toBe("blue base md user");
	});
});
