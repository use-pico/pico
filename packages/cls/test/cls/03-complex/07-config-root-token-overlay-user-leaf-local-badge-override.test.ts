import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/config-root-token-overlay-user-leaf-local-badge-override", () => {
	it("config overlays t1; user overlays t3; local overrides badge only; multi-slot", () => {
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
					"badge",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					tone: [
						"light",
						"dark",
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
					t1: {
						token: [
							"t2",
							"t3",
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
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"md",
								],
							},
							icon: {
								class: [
									"i-md",
								],
							},
							label: {
								class: [
									"l-md",
								],
							},
							badge: {
								class: [
									"b-md",
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
							icon: {
								class: [
									"i-dark",
								],
							},
							label: {
								class: [
									"l-dark",
								],
							},
							badge: {
								class: [
									"b-dark",
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
					size: "md",
					tone: "dark",
				},
			},
		);

		const { slots } = $c.create(
			tweak([
				{
					token: {
						t3: {
							class: [
								"USER3",
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

		expect(slots.root()).toBe("CONF1 b-root md dark base");
		expect(slots.icon()).toBe("CONF1 b-icon i-md i-dark i-base");
		expect(slots.label()).toBe("CONF1 b-label l-md l-dark l-base");
		expect(
			slots.badge({
				override: {
					badge: {
						class: [
							"LOCAL-BADGE",
						],
					},
				},
			}),
		).toBe("LOCAL-BADGE");
	});
});
