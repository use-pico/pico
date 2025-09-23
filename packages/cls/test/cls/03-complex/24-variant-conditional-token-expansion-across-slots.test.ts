import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/complex/variant-conditional-token-expansion-across-slots", () => {
	it("size controls token usage across slots while tone/on add classes", () => {
		const $cls = cls(
			{
				tokens: [
					"t1",
					"t2",
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
					tone: [
						"light",
						"dark",
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
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"r-dark",
								],
							},
							icon: {
								class: [
									"i-dark",
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
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "dark",
					on: true,
				},
			},
		);

		const { slots } = $cls.create();
		expect(slots.root()).toBe("a2 a1 r-sm r-dark r-on");
		expect(slots.icon()).toBe("a2 i-sm i-dark i-on");

		const other = $cls.create({
			variant: {
				size: "md",
				on: true,
			},
		});
		expect(other.slots.root()).toBe("a2 r-md r-dark r-on");
		expect(other.slots.icon()).toBe("a2 a1 i-md i-dark i-on");
	});
});
