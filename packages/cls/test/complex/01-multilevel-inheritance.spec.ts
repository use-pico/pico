import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("multilevel inheritance", () => {
	it("creates a three-level inheritance chain", () => {
		// Base level - basic button
		const BaseButton = cls(
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
								"inline-flex",
								"items-center",
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
				],
				defaults: {
					size: "md",
				},
			},
		);

		// Second level - adds variant prop and new tokens
		const ThemedButton = BaseButton.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
						"danger",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
						"danger",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
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
						"success",
						"danger",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [],
						primary: [],
						success: [
							"text-white",
						],
						danger: [
							"text-white",
						],
					},
					"color.bg": {
						default: [],
						primary: [],
						success: [
							"bg-green-600",
						],
						danger: [
							"bg-red-600",
						],
					},
				},
				rules: ({ rule, what }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: what.token([
								"color.text.success",
								"color.bg.success",
							]),
							icon: what.css([
								"text-green-100",
							]),
						},
					),
					rule(
						{
							variant: "danger",
						},
						{
							root: what.token([
								"color.text.danger",
								"color.bg.danger",
							]),
							icon: what.css([
								"text-red-100",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		// Third level - adds loading state and more slots
		const InteractiveButton = ThemedButton.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
						"danger",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
						"danger",
					],
					"state.loading": [
						"default",
						"active",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
					"spinner",
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
						"success",
						"danger",
					],
					loading: [
						"bool",
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
							"text-blue-600",
						],
						success: [
							"text-green-600",
						],
						danger: [
							"text-red-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						success: [
							"bg-green-50",
						],
						danger: [
							"bg-red-50",
						],
					},
					"state.loading": {
						default: [],
						active: [
							"animate-spin",
						],
					},
				},
				rules: ({ rule, what }) => [
					rule(
						{
							loading: true,
						},
						{
							root: what.css([
								"cursor-not-allowed",
							]),
							spinner: what.both(
								[
									"inline-block",
								],
								[
									"state.loading.active",
								],
							),
							label: what.css([
								"opacity-50",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
					loading: false,
				},
			},
		);

		// Test base level
		const baseSlots = BaseButton.create();
		expect(baseSlots.root()).toBe(
			"inline-flex items-center text-gray-900 bg-gray-100 px-4 py-2",
		);
		expect(baseSlots.label()).toBe("font-medium text-base");

		// Test second level
		const themedSlots = ThemedButton.create(() => ({
			variant: {
				variant: "success",
			},
		}));
		expect(themedSlots.root()).toBe(
			"inline-flex items-center px-4 py-2 text-white bg-green-600",
		);
		expect(themedSlots.label()).toBe("font-medium text-base");
		expect(themedSlots.icon()).toBe("text-green-100");

		// Test third level
		const interactiveSlots = InteractiveButton.create(() => ({
			variant: {
				variant: "danger",
				loading: true,
			},
		}));
		expect(interactiveSlots.root()).toBe(
			"inline-flex items-center px-4 py-2 text-red-600 bg-red-50 cursor-not-allowed",
		);
		expect(interactiveSlots.label()).toBe(
			"font-medium text-base opacity-50",
		);
		expect(interactiveSlots.icon()).toBe("text-red-100");
		expect(interactiveSlots.spinner()).toBe("inline-block animate-spin");
	});

	it("handles token inheritance with overrides", () => {
		const Base = cls(
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
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
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

		const Extended = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
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
							"text-blue-600",
						],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						success: [
							"bg-green-50",
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
								"color.text.success",
								"color.bg.success",
							],
						),
					}),
				],
				defaults: {},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("block text-green-600 bg-green-50");
	});

	it("handles slot inheritance with new slots", () => {
		const Base = cls(
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
							"base-root",
						]),
					}),
				],
				defaults: {},
			},
		);

		const Extended = Base.extend(
			{
				tokens: {},
				slot: [
					"root",
					"child",
				],
				variant: {},
			},
			{
				token: {},
				rules: ({ root, what }) => [
					root({
						root: what.css([
							"extended-root",
						]),
						child: what.css([
							"child-slot",
						]),
					}),
				],
				defaults: {},
			},
		);

		const slots = Extended.create();
		expect(slots.root()).toBe("base-root extended-root");
		expect(slots.child()).toBe("child-slot");
	});

	it("handles variant inheritance with new variants", () => {
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
				rules: ({ root, rule, what }) => [
					root({
						root: what.css([
							"base",
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
					variant: [
						"default",
						"primary",
					],
				},
			},
			{
				token: {},
				rules: ({ rule, what }) => [
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
					rule(
						{
							variant: "primary",
						},
						{
							root: what.css([
								"bg-blue-500",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		const slots = Extended.create(() => ({
			variant: {
				size: "lg",
				variant: "primary",
			},
		}));
		expect(slots.root()).toBe("base text-lg bg-blue-500");
	});

	it("handles complex inheritance with all features combined", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
					],
					"color.bg": [
						"default",
					],
				},
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
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
					},
				},
				rules: ({ root, rule, what }) => [
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
				],
				defaults: {
					size: "md",
				},
			},
		);

		const Level1 = Base.extend(
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
							"text-blue-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
					},
				},
				rules: ({ rule, what }) => [
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
					rule(
						{
							variant: "primary",
						},
						{
							root: what.token([
								"color.text.primary",
								"color.bg.primary",
							]),
							label: what.css([
								"font-medium",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
				},
			},
		);

		const Level2 = Level1.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"primary",
						"success",
					],
					"color.bg": [
						"default",
						"primary",
						"success",
					],
					state: [
						"default",
						"loading",
					],
				},
				slot: [
					"root",
					"label",
					"icon",
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
						"success",
					],
					loading: [
						"bool",
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
							"text-blue-600",
						],
						success: [
							"text-green-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						primary: [
							"bg-blue-50",
						],
						success: [
							"bg-green-50",
						],
					},
					state: {
						default: [],
						loading: [
							"animate-pulse",
						],
					},
				},
				rules: ({ rule, what }) => [
					rule(
						{
							variant: "success",
						},
						{
							root: what.token([
								"color.text.success",
								"color.bg.success",
							]),
							icon: what.css([
								"text-green-500",
							]),
						},
					),
					rule(
						{
							loading: true,
						},
						{
							root: what.token([
								"state.loading",
							]),
							label: what.css([
								"opacity-50",
							]),
						},
					),
				],
				defaults: {
					size: "md",
					variant: "default",
					loading: false,
				},
			},
		);

		// Test all levels
		const baseSlots = Base.create();
		expect(baseSlots.root()).toBe("block text-gray-900 bg-white text-base");

		const level1Slots = Level1.create(() => ({
			variant: {
				variant: "primary",
				size: "lg",
			},
		}));
		expect(level1Slots.root()).toBe(
			"block text-lg text-blue-600 bg-blue-50",
		);
		expect(level1Slots.label()).toBe("font-medium");

		const level2Slots = Level2.create(() => ({
			variant: {
				variant: "success",
				size: "sm",
				loading: true,
			},
		}));
		expect(level2Slots.root()).toBe(
			"block text-sm text-green-600 bg-green-50 animate-pulse",
		);
		expect(level2Slots.label()).toBe("opacity-50");
		expect(level2Slots.icon()).toBe("text-green-500");
	});
});
