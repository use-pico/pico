import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("core cls API", () => {
	it("creates a basic cls instance with minimal configuration", () => {
		const Basic = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root, what }) => [
					root({
						root: what.css([
							"block",
						]),
					}),
				],
				defaults: {},
			},
		);

		const slots = Basic.create();
		expect(slots.root()).toBe("block");
	});

	it("creates cls instance with multiple slots", () => {
		const MultiSlot = cls(
			{
				tokens: {},
				slot: [
					"root",
					"label",
					"icon",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root, what }) => [
					root({
						root: what.css([
							"flex",
						]),
						label: what.css([
							"text-sm",
						]),
						icon: what.css([
							"w-4",
						]),
					}),
				],
				defaults: {},
			},
		);

		const slots = MultiSlot.create();
		expect(slots.root()).toBe("flex");
		expect(slots.label()).toBe("text-sm");
		expect(slots.icon()).toBe("w-4");
	});

	it("creates cls instance with basic variants", () => {
		const WithVariants = cls(
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
				rules: ({ root, rule, what }) => [
					root({
						root: what.css([
							"block",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"text-sm",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"text-base",
							]),
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"text-lg",
							]),
						},
					),
				],
				defaults: {
					size: "md",
				},
			},
		);

		const slots = WithVariants.create();
		expect(slots.root()).toBe("block text-base");

		const smallSlots = WithVariants.create(() => ({
			variant: {
				size: "sm",
			},
		}));
		expect(smallSlots.root()).toBe("block text-sm");

		const largeSlots = WithVariants.create(() => ({
			variant: {
				size: "lg",
			},
		}));
		expect(largeSlots.root()).toBe("block text-lg");
	});

	it("creates cls instance with tokens", () => {
		const WithTokens = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
					},
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root, what }) => [
					root({
						root: what.both(
							[
								"block",
							],
							[
								"color.text.default",
								"color.bg.default",
							],
						),
					}),
				],
				defaults: {},
			},
		);

		const slots = WithTokens.create();
		expect(slots.root()).toBe("block text-gray-900 bg-gray-100");
	});

	it("creates cls instance with complex rules", () => {
		const Complex = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
					],
					"color.bg": [
						"default",
						"primary",
					],
				},
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
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						primary: [
							"text-white",
						],
					},
					"color.bg": {
						default: [
							"bg-gray-100",
						],
						primary: [
							"bg-blue-600",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						root: what.both(
							[
								"block",
								"rounded",
							],
							[
								"color.text.default",
								"color.bg.default",
							],
						),
						label: what.css([
							"font-medium",
						]),
					}),
					rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"px-2",
								"py-1",
							]),
							label: what.css([
								"text-sm",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: what.css([
								"px-4",
								"py-2",
							]),
							label: what.css([
								"text-base",
							]),
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: what.css([
								"px-6",
								"py-3",
							]),
							label: what.css([
								"text-lg",
							]),
						},
					),
					rule(
						{
							variant: "primary",
						},
						{
							root: what.both(
								[
									"rounded",
								],
								[
									"color.text.primary",
									"color.bg.primary",
								],
							),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		const slots = Complex.create();
		expect(slots.root()).toBe(
			"block rounded text-gray-900 bg-gray-100 px-4 py-2",
		);
		expect(slots.label()).toBe("font-medium text-base");

		const primarySlots = Complex.create(() => ({
			variant: {
				variant: "primary",
			},
		}));
		expect(primarySlots.root()).toBe(
			"block px-4 py-2 rounded text-white bg-blue-600",
		);
		expect(primarySlots.label()).toBe("font-medium text-base");

		const smallSlots = Complex.create(() => ({
			variant: {
				size: "sm",
			},
		}));
		expect(smallSlots.root()).toBe(
			"block rounded text-gray-900 bg-gray-100 px-2 py-1",
		);
		expect(smallSlots.label()).toBe("font-medium text-sm");

		const smallPrimarySlots = Complex.create(() => ({
			variant: {
				size: "sm",
				variant: "primary",
			},
		}));
		expect(smallPrimarySlots.root()).toBe(
			"block px-2 py-1 rounded text-white bg-blue-600",
		);
		expect(smallPrimarySlots.label()).toBe("font-medium text-sm");
	});
});
