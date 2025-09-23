import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-local-token-overlay-wins-over-base-and-child", () => {
	it("local overlay replaces token class from base and child", () => {
		const $base = cls(
			{
				tokens: [
					"t",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"b",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t",
								],
								class: [
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $child = $base.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {
					t: {
						class: [
							"c",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		const { slots } = $child.create();
		expect(slots.root()).toBe("c base");
		expect(
			slots.root({
				token: {
					t: {
						class: [
							"local",
						],
					},
				},
			}),
		).toBe("local base");
	});
});
