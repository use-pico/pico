import { describe, expect, it } from "vitest";
import { cls, tweaks } from "../../../src";

describe("cls/complex/variant-undefined-with-config-overlay-deep-refs", () => {
	it("size undefined at local keeps create value; config overlays t2 root", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
					"t3",
				],
				slot: [
					"root",
					"icon",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
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
						match: {
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"t1",
								],
								class: [
									"r-sm",
								],
							},
							icon: {
								token: [
									"t2",
								],
								class: [
									"i-sm",
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
								token: [
									"t2",
								],
								class: [
									"r-md",
								],
							},
							icon: {
								token: [
									"t1",
								],
								class: [
									"i-md",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const created = $cls.create(
			tweaks([
				{
					variant: {
						size: "md",
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
			]),
		);
		expect(created.slots.root()).toBe("CONF2 r-md");
		expect(created.slots.icon()).toBe("CONF2 a1 i-md");

		const local = created.slots.root({
			variant: {
				size: undefined,
			},
		});
		expect(local).toBe("CONF2 r-md");
	});
});
