import { describe, expect, it } from "bun:test";
import { cls } from "../src/cls";

describe("function-style slots", () => {
	it("slots return functions that can be called with variant overrides", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
					selected: [
						"bool",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule, classes }) => [
					root({
						root: classes([
							"inline-flex",
							"items-center",
						]),
						label: classes([
							"font-medium",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: classes([
								"px-2",
								"py-1",
							]),
							label: classes([
								"text-sm",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: classes([
								"px-4",
								"py-2",
							]),
							label: classes([
								"text-base",
							]),
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: classes([
								"px-6",
								"py-3",
							]),
							label: classes([
								"text-lg",
							]),
						},
					),
					rule(
						{
							selected: true,
						},
						{
							root: classes([
								"bg-blue-600",
								"text-white",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					selected: false,
				},
			},
		);

		const slots = Button.create({});

		// Test default behavior
		expect(slots.root()).toBe("inline-flex items-center px-4 py-2");
		expect(slots.label()).toBe("font-medium text-base");

		// Test with variant overrides
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("inline-flex items-center px-2 py-1");
		expect(
			slots.label({
				size: "sm",
			}),
		).toBe("font-medium text-sm");

		expect(
			slots.root({
				size: "lg",
			}),
		).toBe("inline-flex items-center px-6 py-3");
		expect(
			slots.label({
				size: "lg",
			}),
		).toBe("font-medium text-lg");

		// Test with selected variant
		expect(
			slots.root({
				selected: true,
			}),
		).toBe("inline-flex items-center px-4 py-2 bg-blue-600 text-white");
		expect(
			slots.label({
				selected: true,
			}),
		).toBe("font-medium text-base");

		// Test with multiple variant overrides
		expect(
			slots.root({
				size: "sm",
				selected: true,
			}),
		).toBe("inline-flex items-center px-2 py-1 bg-blue-600 text-white");
		expect(
			slots.label({
				size: "sm",
				selected: true,
			}),
		).toBe("font-medium text-sm");
	});

	it("function-style slots work with create-time overrides", () => {
		const Button = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule, classes }) => [
					root({
						root: classes([
							"inline-flex",
							"items-center",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: classes([
								"px-2",
								"py-1",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: classes([
								"px-4",
								"py-2",
							]),
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = Button.create({
			slot: {
				root: {
					class: [
						"bg-blue-600",
					],
				},
			},
		});

		// Test default with create-time override
		expect(slots.root()).toBe(
			"inline-flex items-center px-4 py-2 bg-blue-600",
		);

		// Test with variant override
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("inline-flex items-center px-2 py-1 bg-blue-600");
	});

	it("function-style slots work with inheritance", () => {
		const Base = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule, classes }) => [
					root({
						root: classes([
							"inline-flex",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: classes([
								"px-2",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: classes([
								"px-4",
							]),
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			{
				token: {},
				rules: ({ root, rule, classes }) => [
					rule(
						{
							size: "lg",
						},
						{
							root: classes([
								"px-6",
							]),
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = Extended.create({});

		// Test inherited behavior
		expect(slots.root()).toBe("inline-flex px-4");
		expect(
			slots.root({
				size: "sm",
			}),
		).toBe("inline-flex px-2");
		expect(
			slots.root({
				size: "lg",
			}),
		).toBe("inline-flex px-6");
	});

	it("function-style slots work with tokens", () => {
		const Button = cls(
			{
				tokens: {
					"theme.bg": [
						"default",
						"hover",
					],
				},
				slot: [
					"root",
				],
				variant: {
					selected: [
						"bool",
					],
				},
			},
			{
				token: {
					"theme.bg": {
						default: [
							"bg-blue-600",
						],
						hover: [
							"hover:bg-blue-700",
						],
					},
				},
				rules: ({ root, rule, classes }) => [
					root({
						root: {
							class: [
								"inline-flex",
							],
							token: [
								"theme.bg.default",
							],
						},
					}),
					rule(
						{
							selected: true,
						},
						{
							root: {
								token: [
									"theme.bg.hover",
								],
							},
						},
					),
				],
				defaults: {
					selected: false,
				},
			},
		);

		const slots = Button.create({});

		// Test default behavior
		expect(slots.root()).toBe("inline-flex bg-blue-600");

		// Test with variant override
		expect(
			slots.root({
				selected: true,
			}),
		).toBe("inline-flex bg-blue-600 hover:bg-blue-700");
	});
});
