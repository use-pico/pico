import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/boolean-default-true-and-undefined-keeps-true", () => {
	it("default true applies; undefined keeps true; false flips", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					on: [
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
							on: true,
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
							on: false,
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
					on: true,
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("base on");
		expect(
			slots.root({
				variant: {
					on: undefined,
				},
			}),
		).toBe("base on");
		expect(
			slots.root({
				variant: {
					on: false,
				},
			}),
		).toBe("base off");
	});
});
