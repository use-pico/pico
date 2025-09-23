import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/grandchild-extends-slots-with-rules-and-order", () => {
	it("root accumulates base→child→grandchild; new 'badge' slot works too", () => {
		const $base = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"root-base",
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
				slot: [
					"badge",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"root-child",
								],
							},
						},
					},
					{
						slot: {
							badge: {
								class: [
									"badge-child",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const $grand = $child.extend(
			{
				tokens: [],
				slot: [],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"root-grand",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $grand.create(
			{
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

		expect(slots.root()).toBe("root-base root-child root-grand user");
		expect(slots.badge()).toBe("badge-child");
	});
});
