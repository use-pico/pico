import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/bool-variant-match", () => {
	it("matches boolean variant values true/false and applies appropriate classes", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					active: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
						},
					},
					{
						match: {
							active: true,
						},
						slot: {
							root: {
								class: [
									"on",
								],
							},
						},
					},
					{
						match: {
							active: false,
						},
						slot: {
							root: {
								class: [
									"off",
								],
							},
						},
					},
				],
				defaults: {
					active: false,
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("base off");
		expect(
			slots.root({
				variant: {
					active: true,
				},
			}),
		).toBe("base on");
	});
});
