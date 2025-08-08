import { describe, expect, it } from "bun:test";
import { classes, match, variant } from "@use-pico/cls";

describe("match() helper", () => {
	it("applies base rule and matched rules in order", () => {
		const Alert = variant({
			slots: [
				"base",
				"title",
			],
			variants: {
				kind: [
					"info",
					"success",
				],
				clickable: [
					"bool",
				],
			},
			rule: [
				match(
					{
						kind: "info",
					},
					{
						base: classes([
							"bg-blue-50",
						]),
					},
				),
				match(
					{
						kind: "success",
					},
					{
						base: classes([
							"bg-green-50",
						]),
					},
				),
				match(
					{
						clickable: true,
					},
					{
						base: classes([
							"hover:shadow-sm",
						]),
					},
				),
			],
			defaults: {
				kind: "info",
				clickable: false,
			},
		});

		// default (info, not clickable)
		const d = Alert.create();
		expect(d.base).toBe("p-2 rounded bg-blue-50");

		// success, clickable
		const c = Alert.create({
			variant: {
				kind: "success",
				clickable: true,
			},
		});
		expect(c.base).toBe("p-2 rounded bg-green-50 hover:shadow-sm");
	});

	it("supports override flag to replace accumulated classes for affected slots", () => {
		const Box = variant({
			slots: [
				"base",
			],
			variants: {
				danger: [
					"bool",
				],
			},
			rule: [
				match(undefined, {
					base: classes([
						"p-2",
						"rounded",
						"bg-neutral-50",
					]),
				}),
				match(
					{
						danger: true,
					},
					{
						base: classes([
							"bg-red-50",
						]),
					},
					true,
				), // override
				match(
					{
						danger: true,
					},
					{
						base: classes([
							"ring-1",
							"ring-red-300",
						]),
					},
				),
			],
			defaults: {
				danger: false,
			},
		});

		const normal = Box.create();
		expect(normal.base).toBe("p-2 rounded bg-neutral-50");

		const danger = Box.create({
			variant: {
				danger: true,
			},
		});
		// override resets previous classes for base, then adds ring
		expect(danger.base).toBe("bg-red-50 ring-1 ring-red-300");
	});
});
