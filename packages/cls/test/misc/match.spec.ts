import { describe, expect, it } from "bun:test";
import { cls } from "../../src/cls";

describe("match() helper", () => {
	it("applies base rule and matched rules in order", () => {
		const Alert = cls(
			{
				tokens: {},
				slot: [
					"base",
					"title",
				],
				variant: {
					kind: [
						"info",
						"success",
					],
					clickable: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						base: {
							class: [
								"p-2",
								"rounded",
							],
						},
					}),
					rule(
						{
							kind: "info",
						},
						{
							base: {
								class: [
									"bg-blue-50",
								],
							},
						},
					),
					rule(
						{
							kind: "success",
						},
						{
							base: {
								class: [
									"bg-green-50",
								],
							},
						},
					),
					rule(
						{
							clickable: true,
						},
						{
							base: {
								class: [
									"hover:shadow-sm",
								],
							},
						},
					),
				],
				defaults: {
					kind: "info",
					clickable: false,
				},
			},
		);

		// default (info, not clickable)
		const d = Alert.create();
		expect(d.base()).toBe("p-2 rounded bg-blue-50");

		// success, clickable - use function-style slots API
		const c = Alert.create();
		expect(
			c.base({
				kind: "success",
				clickable: true,
			}),
		).toBe("p-2 rounded bg-green-50 hover:shadow-sm");
	});

	it("supports override flag to replace accumulated classes for affected slots", () => {
		const Box = cls(
			{
				tokens: {},
				slot: [
					"base",
				],
				variant: {
					danger: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule }) => [
					root({
						base: {
							class: [
								"p-2",
								"rounded",
								"bg-neutral-50",
							],
						},
					}),
					rule(
						{
							danger: true,
						},
						{
							base: {
								class: [
									"bg-red-50",
								],
							},
						},
					),
					rule(
						{
							danger: true,
						},
						{
							base: {
								class: [
									"ring-1",
									"ring-red-300",
								],
							},
						},
					),
				],
				defaults: {
					danger: false,
				},
			},
		);

		const normal = Box.create();
		expect(normal.base()).toBe("p-2 rounded bg-neutral-50");

		const danger = Box.create();
		// override resets previous classes for base, then adds ring
		expect(
			danger.base({
				danger: true,
			}),
		).toBe("p-2 rounded bg-red-50 ring-1 ring-red-300");
	});
});
