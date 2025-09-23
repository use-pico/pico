import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/cross-slot-conflicts-with-overrides-and-token-overlays", () => {
	it("root overridden by config; icon overridden by user; label/token overlays mix", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
				],
				slot: [
					"root",
					"icon",
					"label",
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
					on: [
						"bool",
					],
				},
			},
			{
				token: {
					t2: {
						class: [
							"a2",
						],
					},
					t3: {
						class: [
							"a3",
						],
					},
					t4: {
						class: [
							"a4",
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
							a: "x",
						},
						slot: {
							root: {
								class: [
									"r-a-x",
								],
							},
							icon: {
								class: [
									"i-a-x",
								],
							},
							label: {
								class: [
									"l-a-x",
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
									"r-b-u",
								],
							},
							icon: {
								class: [
									"i-b-u",
								],
							},
							label: {
								class: [
									"l-b-u",
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
									"r-on",
								],
							},
							icon: {
								class: [
									"i-on",
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
					a: "x",
					b: "u",
					on: true,
				},
			},
		);

		const { slots } = $c.create(
			{
				token: {
					t3: {
						class: [
							"USER3",
						],
					},
				},
				override: true,
				slot: {
					icon: {
						class: [
							"USER-ICON",
						],
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
				override: true,
				slot: {
					root: {
						class: [
							"CONF-ROOT",
						],
					},
				},
			},
		);

		// Root is overridden by config
		expect(slots.root()).toBe(
			"r-a-x r-b-u r-on CONF2 USER3 a4 a1 b-root CONF-ROOT",
		);
		// Icon is overridden by user
		expect(slots.icon()).toBe(
			"i-a-x i-b-u i-on CONF2 USER3 a4 a1 b-icon USER-ICON",
		);
		// Label: matches first, then overlays (config then user), then remaining chain and base
		expect(slots.label()).toBe(
			"l-a-x l-b-u l-on CONF2 USER3 a4 a1 b-label",
		);
	});
});
