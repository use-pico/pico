import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/deep-refs-user-leaf-clear-icon-config-leaf-overlay-label", () => {
	it("user clears t2 on icon; config overlays t2 on label; root unaffected", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t1: {
						token: [
							"t2",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"r",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								token: [
									"t1",
								],
								class: [
									"i",
								],
							},
						},
					},
					{
						slot: {
							label: {
								token: [
									"t1",
								],
								class: [
									"l",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create(
			{
				token: {
					t2: {
						class: [],
					},
				},
			},
			{
				token: {
					t2: {
						class: [
							"CONF2",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("CONF2 a1 r");
		expect(slots.icon()).toBe("CONF2 a1 i");
		expect(slots.label()).toBe("CONF2 a1 l");
	});
});
