import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/deep-refs-branching-mixed-overlays-and-local-override", () => {
	it("t1 -> (t2 -> t5, t3, t4); user overlays t5; config overlays t3; local override on label", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t5",
				],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					v: [
						"a",
						"b",
					],
					on: [
						"bool",
					],
				},
			},
			{
				token: {
					t5: {
						class: [
							"a5",
						],
					},
					t4: {
						class: [
							"a4",
						],
					},
					t3: {
						class: [
							"a3",
						],
					},
					t2: {
						token: [
							"t5",
						],
						class: [
							"a2",
						],
					},
					t1: {
						token: [
							"t2",
							"t3",
							"t4",
						],
						class: [
							"a1",
						],
					},
				},
				rules: [
					{
						match: {
							v: "a",
						},
						slot: {
							root: {
								class: [
									"v-a",
								],
							},
							icon: {
								class: [
									"i-v-a",
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
							label: {
								class: [
									"l-on",
								],
							},
						},
					},
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
							icon: {
								token: [
									"t1",
								],
								class: [
									"b-icon",
								],
							},
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
				defaults: {
					v: "a",
					on: true,
				},
			},
		);

		const { slots } = $c.create(
			{
				token: {
					t5: {
						class: [
							"USER5",
						],
					},
				},
			},
			{
				token: {
					t3: {
						class: [
							"CONF3",
						],
					},
				},
			},
		);

		// Order follows rule order: matches first, then token expansions and base
		expect(slots.root()).toBe("v-a on USER5 a2 CONF3 a4 a1 b-root");
		expect(slots.icon()).toBe("i-v-a USER5 a2 CONF3 a4 a1 b-icon");
		// Local override on label wins
		expect(
			slots.label({
				override: {
					label: {
						class: [
							"LOCAL-LABEL",
						],
					},
				},
			}),
		).toBe("LOCAL-LABEL");
	});
});
