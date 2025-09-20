import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/deep-token-refs-config-root-overlay-affects-all-slots", () => {
	it("t1 -> t2 -> t3; config overlay on t1 removes expansion in all slots", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
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
					t3: {
						class: [
							"a3",
						],
					},
					t2: {
						token: [
							"t3",
						],
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
									"b-root",
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
									"b-icon",
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
									"b-label",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $c.create(
			{},
			{
				token: {
					t1: {
						class: [
							"CONF-T1",
						],
					},
				},
			},
		);

		expect(slots.root()).toBe("CONF-T1 b-root");
		expect(slots.icon()).toBe("CONF-T1 b-icon");
		expect(slots.label()).toBe("CONF-T1 b-label");
	});
});
