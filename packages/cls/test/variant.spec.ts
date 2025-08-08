import { describe, expect, it } from "bun:test";
import { classes } from "../src/classes";
import { variant } from "../src/variant";

describe("variant() helper", () => {
	it("applies base rule classes to slots in order", () => {
		const T = variant({
			slots: [
				"root",
				"label",
			],
			variants: {
				size: [
					"sm",
					"md",
				],
			},
			rules: ({ root, classes }) => [
				root({
					root: classes([
						"inline-flex",
						"items-center",
					]),
					label: classes([
						"font-medium",
					]),
				}),
			],
			defaults: {
				size: "md",
			},
		});

		const s = T.create({});
		expect(s.root).toBe("inline-flex items-center");
		expect(s.label).toBe("font-medium");
	});

	it("respects match rules and ordering with boolean variants", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				active: [
					"bool",
				],
			},
			rules: ({ root, rule, classes }) => [
				root({
					root: classes([
						"px-4",
						"py-2",
					]),
				}),
				rule(
					{
						active: true,
					},
					{
						root: classes([
							"bg-blue-600",
						]),
					},
				),
			],
			defaults: {
				active: false,
			},
		});

		expect(T.create({}).root).toBe("px-4 py-2");
		expect(
			T.create({
				variant: {
					active: true,
				},
			}).root,
		).toBe("px-4 py-2 bg-blue-600");
	});

	it("supports override in rules (resetting prior classes for slot)", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				mode: [
					"a",
					"b",
				],
			},
			rules: ({ root, rule, classes }) => [
				root({
					root: classes([
						"px-2",
						"py-1",
						"bg-gray-100",
					]),
				}),
				rule(
					{
						mode: "b",
					},
					{
						root: classes([
							"px-1",
							"bg-red-500",
						]),
					},
					true,
				),
			],
			defaults: {
				mode: "a",
			},
		});

		expect(T.create({}).root).toBe("px-2 py-1 bg-gray-100");
		expect(
			T.create({
				variant: {
					mode: "b",
				},
			}).root,
		).toBe("px-1 bg-red-500");
	});

	it("allows create-time slot appends and override", () => {
		const T = variant({
			slots: [
				"root",
			],
			variants: {
				selected: [
					"bool",
				],
			},
			rules: ({ root, classes }) => [
				root({
					root: classes([
						"px-2",
					]),
				}),
			],
			defaults: {
				selected: false,
			},
		});

		expect(
			T.create({
				slot: {
					root: classes([
						"py-1",
					]),
				},
			}).root,
		).toBe("px-2 py-1");
		expect(
			T.create({
				override: {
					root: classes([
						"block",
					]),
				},
			}).root,
		).toBe("block");
	});
});
