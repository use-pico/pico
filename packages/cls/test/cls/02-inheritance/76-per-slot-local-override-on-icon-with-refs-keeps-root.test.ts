import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/inheritance/per-slot-local-override-on-icon-with-refs-keeps-root", () => {
	it("local override on icon replaces icon only; root with refs stays", () => {
		const $base = cls(
			{
				tokens: [
					"t1",
					"t2",
				],
				slot: [
					"root",
					"icon",
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
				],
				defaults: {},
			},
		);

		const { slots } = $base.create();
		expect(slots.root()).toBe("a2 a1 b-root");
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"ICON",
						],
					},
				},
			}),
		).toBe("ICON");
		expect(slots.root()).toBe("a2 a1 b-root");
	});
});
