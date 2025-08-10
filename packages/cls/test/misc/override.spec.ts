import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

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
				rules: ({ root, what: u }) => [
					root({
						root: u.both(
							[
								"inline-flex",
							],
							[
								"shadow.default",
							],
						),
					}),
					{
						override: true,
						slot: {
							root: u.both(
								[
									"block",
								],
								[
									"shadow.default",
								],
							),
						},
					},
				],
				defaults: {},
			},
		);

		expect(C.create().root()).toBe("block shadow-blue-600");
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
				rules: ({ root, what: u }) => [
					root({
						root: u.both(
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

		const appended = C.create(({ what }) => ({
			slot: {
				root: what.both(
					[
						"px-2",
					],
					[
						"bg.default",
					],
				),
			},
		}));
		expect(appended.root()).toBe("inline-flex px-2 bg-blue-600");

		const replaced = C.create(({ what }) => ({
			override: {
				root: what.both(
					[
						"block",
					],
					[
						"bg.default",
					],
				),
			},
		}));
		expect(replaced.root()).toBe("block bg-blue-600");
	});
});
