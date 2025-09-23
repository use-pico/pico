import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/token-what-level-override-replaces-accumulated", () => {
	it("Token What-level override replaces accumulated classes", () => {
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
						override: true,
					},
				},
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
						slot: {
							root: {
								class: [
									"append",
								],
							},
						},
					},
					{
						slot: {
							root: {
								token: [
									"color.text",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		// Token with What-level override should replace accumulated classes
		expect(slots.root()).toBe("base append text-red-500");
	});
});
