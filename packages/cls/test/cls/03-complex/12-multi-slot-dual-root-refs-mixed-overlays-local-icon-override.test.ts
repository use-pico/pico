import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/complex/multi-slot-dual-root-refs-mixed-overlays-local-icon-override", () => {
	it("root uses t1 then t6; config overlays t1; user overlays t5; local icon override", () => {
		const $c = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
					"t4",
					"t5",
					"t6",
				],
				slot: [
					"root",
					"icon",
					"label",
					"badge",
				],
				variant: {
					a: [
						"x",
						"y",
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
						token: [
							"t4",
							"t5",
						],
						class: [
							"a3",
						],
					},
					t2: {
						class: [
							"a2",
						],
					},
					t1: {
						token: [
							"t2",
							"t3",
						],
						class: [
							"a1",
						],
					},
					t6: {
						class: [
							"a6",
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
							badge: {
								class: [
									"b-a-x",
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
									"b1",
								],
							},
						},
					},
					{
						slot: {
							root: {
								token: [
									"t6",
								],
								class: [
									"b6",
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
									"t6",
								],
								class: [
									"b-label",
								],
							},
						},
					},
					{
						slot: {
							badge: {
								token: [
									"t1",
								],
								class: [
									"b-badge",
								],
							},
						},
					},
				],
				defaults: {
					a: "x",
					on: true,
				},
			},
		);

		const { slots } = $c.create(
			tweaks([
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
						t1: {
							class: [
								"CONF1",
							],
						},
					},
				},
			]),
		);

		// root accumulates: from matches first, then config root overlay for t1, then t6 chain
		expect(slots.root()).toBe("r-a-x r-on CONF1 b1 a6 b6");
		// icon overridden locally, label and badge follow token expansions and base order
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"LOCAL-ICON",
						],
					},
				},
			}),
		).toBe("LOCAL-ICON");
		expect(slots.label()).toBe("l-a-x l-on a6 b-label");
		expect(slots.badge()).toBe("b-a-x CONF1 b-badge");
	});
});
