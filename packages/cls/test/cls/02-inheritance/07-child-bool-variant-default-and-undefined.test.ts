import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/child-bool-variant-default-and-undefined", () => {
	it("child default true; undefined keeps true; false flips", () => {
		const baseButtonCls = cls(
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
					on: false,
				},
			},
		);

		const childButtonCls = baseButtonCls.extend(
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
				rules: [],
				defaults: {
					on: true,
				},
			},
		);

		const { slots } = childButtonCls.create();
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
