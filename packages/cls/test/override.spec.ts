import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

describe("override rules and create-time overrides", () => {
	it("rule override resets previous classes", () => {
		const C = cls(
			{
				tokens: {
					shadow: [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					shadow: {
						default: [
							"shadow-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
								],
								token: [
									"shadow.default",
								],
							},
						},
					},
					{
						override: true,
						slot: {
							root: {
								class: [
									"block",
								],
								token: [
									"shadow.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		expect(C.create({}).root).toBe("block shadow-blue-600");
	});

	it("create.override replaces all slot output, while create.slot appends", () => {
		const C = cls(
			{
				tokens: {
					bg: [
						"default",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					bg: {
						default: [
							"bg-blue-600",
						],
					},
				},
				rule: [
					{
						slot: {
							root: {
								class: [
									"inline-flex",
								],
								token: [
									"bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const appended = C.create({
			slot: {
				root: {
					class: [
						"px-2",
					],
					token: [
						"bg.default",
					],
				},
			},
		});
		expect(appended.root).toBe("inline-flex px-2 bg-blue-600");

		const replaced = C.create({
			override: {
				root: {
					class: [
						"block",
					],
					token: [
						"bg.default",
					],
				},
			},
		});
		expect(replaced.root).toBe("block bg-blue-600");
	});
});
