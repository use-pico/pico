import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/per-slot-leaf-clear-affects-only-that-slot", () => {
	it("clearing t2 on icon does not clear root or label chains", () => {
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

		const { slots } = $cls.create();
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(slots.label()).toBe("a2 a1 b-label");
		expect(
			slots.icon({
				token: {
					t2: {
						class: [],
					},
				},
			}),
		).toBe("a1 b-icon");
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(slots.label()).toBe("a2 a1 b-label");
	});
});
