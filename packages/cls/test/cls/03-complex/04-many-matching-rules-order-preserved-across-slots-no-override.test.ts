import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/many-matching-rules-order-preserved-across-slots-no-override", () => {
	it("five rules match; order should be preserved for root and icon", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {
					a: [
						"x",
						"y",
					],
					b: [
						"u",
						"v",
					],
					c: [
						"p",
						"q",
					],
				},
			},
			{
				token: {},
				rules: [
					{
						match: {
							a: "x",
						},
						slot: {
							root: {
								class: [
									"r1",
								],
							},
							icon: {
								class: [
									"i1",
								],
							},
						},
					},
					{
						match: {
							b: "u",
						},
						slot: {
							root: {
								class: [
									"r2",
								],
							},
							icon: {
								class: [
									"i2",
								],
							},
						},
					},
					{
						match: {
							c: "p",
						},
						slot: {
							root: {
								class: [
									"r3",
								],
							},
							icon: {
								class: [
									"i3",
								],
							},
						},
					},
					{
						match: {
							a: "x",
							b: "u",
						},
						slot: {
							root: {
								class: [
									"r4",
								],
							},
							icon: {
								class: [
									"i4",
								],
							},
						},
					},
					{
						slot: {
							root: {
								class: [
									"base",
								],
							},
							icon: {
								class: [
									"i-base",
								],
							},
						},
					},
				],
				defaults: {
					a: "x",
					b: "u",
					c: "p",
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("r1 r2 r3 r4 base");
		expect(slots.icon()).toBe("i1 i2 i3 i4 i-base");
	});
});
