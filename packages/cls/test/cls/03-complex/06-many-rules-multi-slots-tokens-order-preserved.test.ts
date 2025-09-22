import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/many-rules-multi-slots-tokens-order-preserved", () => {
	it("ten+ rules across 4 slots and 4 tokens; order preserved; no override", () => {
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
					"badge",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					tone: [
						"light",
						"dark",
					],
					on: [
						"bool",
					],
					state: [
						"idle",
						"hover",
						"active",
					],
				},
			},
			{
				token: {
					t1: {
						class: [
							"a1",
						],
					},
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
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"b-r1",
								],
							},
						},
					},
					{
						slot: {
							icon: {
								token: [
									"t2",
								],
								class: [
									"b-i1",
								],
							},
						},
					},
					{
						slot: {
							label: {
								token: [
									"t3",
								],
								class: [
									"b-l1",
								],
							},
						},
					},
					{
						slot: {
							badge: {
								token: [
									"t4",
								],
								class: [
									"b-b1",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"sm",
								],
							},
							icon: {
								class: [
									"i-sm",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"dark",
								],
							},
							label: {
								class: [
									"l-dark",
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
							badge: {
								class: [
									"b-on",
								],
							},
						},
					},
					{
						match: {
							state: "hover",
						},
						slot: {
							root: {
								class: [
									"hover",
								],
							},
							icon: {
								class: [
									"i-hover",
								],
							},
							label: {
								class: [
									"l-hover",
								],
							},
							badge: {
								class: [
									"b-hover",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"sm-dark",
								],
							},
						},
					},
					{
						match: {
							size: "sm",
							on: true,
						},
						slot: {
							root: {
								class: [
									"sm-on",
								],
							},
						},
					},
					{
						match: {
							tone: "dark",
							on: true,
						},
						slot: {
							root: {
								class: [
									"dark-on",
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
							label: {
								class: [
									"l-base",
								],
							},
							badge: {
								class: [
									"b-base",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "dark",
					on: true,
					state: "hover",
				},
			},
		);

		const { slots } = $c.create();
		expect(slots.root()).toBe(
			"a1 b-r1 sm dark on hover sm-dark sm-on dark-on base",
		);
		expect(slots.icon()).toBe("a2 b-i1 i-sm i-hover i-base");
		expect(slots.label()).toBe("a3 b-l1 l-dark l-hover l-base");
		expect(slots.badge()).toBe("a4 b-b1 b-on b-hover b-base");
	});
});
