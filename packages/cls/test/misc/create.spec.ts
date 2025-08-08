import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("create() config", () => {
	it("slot append vs override replace with order class then token", () => {
		const C = cls(
			{
				tokens: {
					bg: [
						"default",
					],
					ring: [
						"focus",
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
					ring: {
						focus: [
							"ring-2 ring-blue-600",
						],
					},
				},
				rules: ({ root, classes }) => [
					root({
						root: classes(
							[
								"inline-flex",
							],
							[
								"bg.default",
							],
						),
					}),
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
						"ring.focus",
					],
				},
			},
		});
		expect(appended.root()).toBe(
			"inline-flex bg-blue-600 px-2 ring-2 ring-blue-600",
		);

		const replaced = C.create({
			override: {
				root: {
					class: [
						"block",
					],
					token: [
						"ring.focus",
					],
				},
			},
		});
		expect(replaced.root()).toBe("block ring-2 ring-blue-600");
	});
});
