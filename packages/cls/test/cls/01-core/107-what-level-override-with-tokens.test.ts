import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-with-tokens", () => {
	it("What-level override with tokens replaces accumulated classes", () => {
		const $cls = cls(
			{
				tokens: [
					"color.text",
				],
				slot: [
					"root",
				],
				variant: {},
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
						slot: {
							root: {
								class: [
									"append",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		// Test What-level override with tokens
		expect(
			slots.root({
				slot: {
					root: {
						token: [
							"color.text",
						],
						class: [
							"override-class",
						],
						override: true,
					},
				},
			}),
		).toBe("text-red-500 override-class");
	});
});
