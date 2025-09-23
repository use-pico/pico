import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/per-slot-local-leaf-overlay-isolated", () => {
	it("local overlay on icon leaf token does not affect root or label", () => {
		const $c = cls(
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

		const { slots } = $c.create();
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(
			slots.icon({
				token: {
					t2: {
						class: [
							"ICON2",
						],
					},
				},
			}),
		).toBe("ICON2 a1 b-icon");
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(slots.label()).toBe("a2 a1 b-label");
	});
});
