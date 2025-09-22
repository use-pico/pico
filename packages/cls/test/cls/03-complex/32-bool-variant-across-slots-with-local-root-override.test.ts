import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/bool-variant-across-slots-with-local-root-override", () => {
	it("on true applies across slots; local root override wins for root only", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
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
						match: {
							on: true,
						},
						slot: {
							root: {
								class: [
									"r-on",
								],
							},
							icon: {
								class: [
									"i-on",
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
									"r-off",
								],
							},
							icon: {
								class: [
									"i-off",
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
		expect(slots.icon()).toBe("i-on");
		expect(
			slots.root({
				override: {
					root: {
						class: [
							"LOCAL",
						],
					},
				},
			}),
		).toBe("LOCAL");
	});
});
