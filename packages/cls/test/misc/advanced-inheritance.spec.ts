import { describe, expect, it } from "vitest";
import { cls } from "../../src/cls";

describe("Advanced Inheritance", () => {
	it("handles conditional inheritance with dynamic token resolution", () => {
		const Base = cls(
			{
				tokens: {
					"primary.text": [
						"default",
						"hover",
					],
					"primary.bg": [
						"default",
						"hover",
					],
					spacing: [
						"compact",
						"comfortable",
					],
				},
				slot: [
					"root",
					"content",
					"actions",
				],
				variant: {
					intent: [
						"info",
						"success",
						"warning",
					],
					density: [
						"compact",
						"comfortable",
					],
					interactive: [
						"bool",
					],
				},
			},
			{
				token: {
					"primary.text": {
						default: [
							"text-blue-700",
						],
						hover: [
							"hover:text-blue-800",
						],
					},
					"primary.bg": {
						default: [
							"bg-blue-50",
						],
						hover: [
							"hover:bg-blue-100",
						],
					},
					spacing: {
						compact: [
							"p-2",
						],
						comfortable: [
							"p-4",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						root: what.token([
							"primary.bg.default",
							"spacing.comfortable",
						]),
						content: what.token([
							"primary.text.default",
						]),
						actions: what.css([
							"mt-3",
							"flex",
							"gap-2",
						]),
					}),
					rule(
						{
							intent: "info",
						},
						{
							root: what.token([
								"primary.bg.default",
							]),
							content: what.token([
								"primary.text.default",
							]),
						},
					),
					rule(
						{
							intent: "success",
						},
						{
							root: what.token([
								"primary.bg.default",
							]),
							content: what.token([
								"primary.text.default",
							]),
						},
					),
					rule(
						{
							intent: "warning",
						},
						{
							root: what.token([
								"primary.bg.default",
							]),
							content: what.token([
								"primary.text.default",
							]),
						},
					),
					rule(
						{
							density: "compact",
						},
						{
							root: what.token([
								"spacing.compact",
							]),
						},
					),
					rule(
						{
							density: "comfortable",
						},
						{
							root: what.token([
								"spacing.comfortable",
							]),
						},
					),
					rule(
						{
							interactive: true,
						},
						{
							root: what.css([
								"cursor-pointer",
								"hover:shadow-md",
								"transition-shadow",
							]),
						},
					),
				],
				defaults: {
					intent: "info",
					density: "comfortable",
					interactive: false,
				},
			},
		);

		const Enhanced = Base.extend(
			{
				tokens: {
					"primary.text": [
						"default",
						"hover",
					],
					"primary.bg": [
						"default",
						"hover",
					],
					"accent.ring": [
						"focus",
					],
					animation: [
						"none",
						"fade",
					],
				},
				slot: [
					"badge",
				],
				variant: {
					intent: [
						"info",
						"success",
						"warning",
						"danger",
					],
					density: [
						"compact",
						"comfortable",
					],
					interactive: [
						"bool",
					],
					animation: [
						"none",
						"fade",
					],
				},
			},
			{
				token: {
					"primary.text": {
						default: [
							"text-green-700",
						],
						hover: [
							"hover:text-green-800",
						],
					},
					"primary.bg": {
						default: [
							"bg-green-50",
						],
						hover: [
							"hover:bg-green-100",
						],
					},
					"accent.ring": {
						focus: [
							"ring-2",
							"ring-green-500",
						],
					},
					animation: {
						none: [],
						fade: [
							"animate-fade-in",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						root: what.css([
							"rounded-lg",
							"border",
						]),
						badge: what.css([
							"inline-flex",
							"items-center",
							"px-2",
							"py-1",
							"text-xs",
							"font-medium",
							"rounded-full",
						]),
					}),
					rule(
						{
							intent: "success",
						},
						{
							root: what.token([
								"primary.bg.default",
								"primary.text.default",
							]),
							badge: what.token([
								"primary.bg.default",
								"primary.text.default",
							]),
						},
					),
					rule(
						{
							intent: "danger",
						},
						{
							root: what.token([
								"primary.bg.default",
								"primary.text.default",
							]),
							badge: what.token([
								"primary.bg.default",
								"primary.text.default",
							]),
						},
					),
					rule(
						{
							animation: "fade",
						},
						{
							root: what.token([
								"animation.fade",
							]),
						},
					),
				],
				defaults: {
					intent: "success",
					density: "comfortable",
					interactive: false,
					animation: "none",
				},
			},
		);

		// Test base component
		const base = Base.create(() => ({
			variant: {
				intent: "info",
				density: "compact",
				interactive: true,
			},
		}));
		expect(base.root()).toBe(
			"bg-blue-50 p-2 cursor-pointer hover:shadow-md transition-shadow",
		);
		expect(base.content()).toBe("text-blue-700");
		expect(base.actions()).toBe("mt-3 flex gap-2");

		// Test enhanced component with new variants
		const enhanced = Enhanced.create(() => ({
			variant: {
				intent: "success",
				density: "comfortable",
				animation: "fade",
			},
		}));
		expect(enhanced.root()).toBe(
			"p-4 rounded-lg border bg-green-50 text-green-700 animate-fade-in",
		);
		expect(enhanced.content()).toBe("text-green-700");
		expect(enhanced.badge()).toBe(
			"inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700",
		);
	});

	it("handles inheritance with conditional slot rendering", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"muted",
					],
					"color.bg": [
						"default",
						"secondary",
					],
					"color.border": [
						"default",
					],
				},
				slot: [
					"root",
					"header",
					"body",
					"footer",
				],
				variant: {
					hasHeader: [
						"bool",
					],
					hasFooter: [
						"bool",
					],
					layout: [
						"vertical",
						"horizontal",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-gray-900",
						],
						muted: [
							"text-gray-600",
						],
					},
					"color.bg": {
						default: [
							"bg-white",
						],
						secondary: [
							"bg-gray-50",
						],
					},
					"color.border": {
						default: [
							"border-gray-200",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						root: what.both(
							[
								"border",
								"rounded-lg",
								"overflow-hidden",
							],
							[
								"color.bg.default",
								"color.border.default",
							],
						),
						header: what.both(
							[
								"px-4",
								"py-3",
								"border-b",
								"font-semibold",
							],
							[
								"color.text.default",
							],
						),
						body: what.css([
							"px-4",
							"py-3",
							"flex-1",
						]),
						footer: what.both(
							[
								"px-4",
								"py-2",
								"border-t",
							],
							[
								"color.bg.secondary",
							],
						),
					}),
					rule(
						{
							hasHeader: false,
						},
						{
							header: what.css([
								"hidden",
							]),
						},
					),
					rule(
						{
							hasFooter: false,
						},
						{
							footer: what.css([
								"hidden",
							]),
						},
					),
					rule(
						{
							layout: "horizontal",
						},
						{
							root: what.css([
								"flex",
								"flex-row",
							]),
							header: what.css([
								"border-b-0",
								"border-r",
								"min-w-32",
							]),
						},
					),
				],
				defaults: {
					hasHeader: true,
					hasFooter: true,
					layout: "vertical",
				},
			},
		);

		const Interactive = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"muted",
					],
					"color.bg": [
						"default",
						"secondary",
					],
					"color.border": [
						"default",
					],
					"accent.ring": [
						"focus",
					],
				},
				slot: [
					"root",
					"header",
					"body",
					"footer",
					"actions",
				],
				variant: {
					hasHeader: [
						"bool",
					],
					hasFooter: [
						"bool",
					],
					layout: [
						"vertical",
						"horizontal",
					],
					interactive: [
						"bool",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-purple-900",
						],
						muted: [
							"text-purple-600",
						],
					},
					"color.bg": {
						default: [
							"bg-purple-50",
						],
						secondary: [
							"bg-purple-100",
						],
					},
					"color.border": {
						default: [
							"border-purple-200",
						],
					},
					"accent.ring": {
						focus: [
							"ring-2",
							"ring-purple-500",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						actions: what.both(
							[
								"px-4",
								"py-2",
								"flex",
								"gap-2",
								"justify-end",
								"border-t",
							],
							[
								"color.bg.secondary",
							],
						),
					}),
					rule(
						{
							interactive: true,
						},
						{
							root: what.css([
								"cursor-pointer",
								"hover:shadow-lg",
								"transition-all",
							]),
						},
					),
				],
				defaults: {
					hasHeader: true,
					hasFooter: true,
					layout: "vertical",
					interactive: false,
				},
			},
		);

		// Test base component with conditional slots
		const baseVertical = Base.create(() => ({
			variant: {
				hasHeader: true,
				hasFooter: false,
				layout: "vertical",
			},
		}));
		expect(baseVertical.header()).toBe(
			"px-4 py-3 border-b font-semibold text-gray-900",
		);
		expect(baseVertical.footer()).toBe(
			"px-4 py-2 border-t bg-gray-50 hidden",
		);

		// Test interactive component with horizontal layout
		const interactiveHorizontal = Interactive.create(() => ({
			variant: {
				hasHeader: true,
				hasFooter: false,
				layout: "horizontal",
				interactive: true,
			},
		}));
		expect(interactiveHorizontal.root()).toBe(
			"border rounded-lg overflow-hidden bg-purple-50 border-purple-200 flex flex-row cursor-pointer hover:shadow-lg transition-all",
		);
		expect(interactiveHorizontal.header()).toBe(
			"px-4 py-3 font-semibold text-purple-900 border-b-0 border-r min-w-32",
		);
		expect(interactiveHorizontal.body()).toBe("px-4 py-3 flex-1");
		expect(interactiveHorizontal.footer()).toBe(
			"px-4 py-2 border-t bg-purple-100 hidden",
		);
		expect(interactiveHorizontal.actions()).toBe(
			"px-4 py-2 flex gap-2 justify-end border-t bg-purple-100",
		);
	});

	it("handles inheritance with dynamic token composition", () => {
		const Base = cls(
			{
				tokens: {
					"color.text": [
						"default",
						"muted",
					],
					"color.bg": [
						"default",
						"muted",
					],
					"size.text": [
						"sm",
						"md",
						"lg",
					],
					"size.padding": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
					"content",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
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
							"text-blue-900",
						],
						muted: [
							"text-blue-700",
						],
					},
					"color.bg": {
						default: [
							"bg-blue-100",
						],
						muted: [
							"bg-blue-50",
						],
					},
					"size.text": {
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
					},
					"size.padding": {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						root: what.both(
							[
								"rounded",
								"font-medium",
							],
							[
								"color.bg.default",
								"size.text.lg",
								"size.padding.lg",
							],
						),
						content: what.token([
							"color.text.default",
						]),
					}),
					rule(
						{
							color: "primary",
						},
						{
							root: what.token([
								"color.bg.default",
								"color.text.default",
							]),
						},
					),
					rule(
						{
							color: "secondary",
						},
						{
							root: what.token([
								"color.bg.muted",
								"color.text.muted",
							]),
						},
					),
					rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"size.text.sm",
								"size.padding.sm",
							]),
						},
					),
					rule(
						{
							size: "md",
						},
						{
							root: what.token([
								"size.text.md",
								"size.padding.md",
							]),
						},
					),
					rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"size.text.lg",
								"size.padding.lg",
							]),
						},
					),
				],
				defaults: {
					color: "primary",
					size: "lg",
				},
			},
		);

		const Enhanced = Base.extend(
			{
				tokens: {
					"color.text": [
						"default",
						"muted",
						"success",
						"danger",
					],
					"color.bg": [
						"default",
						"muted",
						"success",
						"danger",
					],
					"size.text": [
						"sm",
						"md",
						"lg",
						"xl",
					],
					"size.padding": [
						"sm",
						"md",
						"lg",
						"xl",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
				},
				slot: [
					"root",
					"content",
					"icon",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"success",
						"danger",
					],
					size: [
						"sm",
						"md",
						"lg",
						"xl",
					],
					state: [
						"default",
						"hover",
						"active",
						"disabled",
					],
				},
			},
			{
				token: {
					"color.text": {
						default: [
							"text-green-900",
						],
						muted: [
							"text-green-700",
						],
						success: [
							"text-green-900",
						],
						danger: [
							"text-red-900",
						],
					},
					"color.bg": {
						default: [
							"bg-green-100",
						],
						muted: [
							"bg-green-50",
						],
						success: [
							"bg-green-100",
						],
						danger: [
							"bg-red-100",
						],
					},
					"size.text": {
						sm: [
							"text-sm",
						],
						md: [
							"text-base",
						],
						lg: [
							"text-lg",
						],
						xl: [
							"text-xl",
						],
					},
					"size.padding": {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
						xl: [
							"px-8",
							"py-4",
						],
					},
					state: {
						default: [],
						hover: [
							"hover:shadow-md",
						],
						active: [
							"active:shadow-lg",
						],
						disabled: [
							"opacity-50",
							"cursor-not-allowed",
						],
					},
				},
				rules: ({ root, rule, what }) => [
					root({
						icon: what.css([
							"inline-block",
							"align-middle",
						]),
					}),
					rule(
						{
							color: "success",
						},
						{
							root: what.token([
								"color.bg.success",
								"color.text.success",
							]),
						},
					),
					rule(
						{
							color: "danger",
						},
						{
							root: what.token([
								"color.bg.danger",
								"color.text.danger",
							]),
						},
					),
					rule(
						{
							size: "xl",
						},
						{
							root: what.token([
								"size.text.xl",
								"size.padding.xl",
							]),
						},
					),
					rule(
						{
							state: "hover",
						},
						{
							root: what.token([
								"state.hover",
							]),
						},
					),
					rule(
						{
							state: "disabled",
						},
						{
							root: what.token([
								"state.disabled",
							]),
						},
					),
				],
				defaults: {
					color: "success",
					size: "xl",
					state: "default",
				},
			},
		);

		// Test base component
		const basePrimary = Base.create(() => ({
			variant: {
				color: "primary",
				size: "lg",
			},
		}));
		expect(basePrimary.root()).toBe(
			"rounded font-medium bg-blue-100 text-blue-900 text-lg px-6 py-3",
		);
		expect(basePrimary.content()).toBe("text-blue-900");

		// Test enhanced component with new variants
		const enhancedSuccess = Enhanced.create(() => ({
			variant: {
				color: "success",
				size: "xl",
				state: "hover",
			},
		}));
		expect(enhancedSuccess.root()).toBe(
			"rounded font-medium bg-green-100 text-green-900 text-xl px-8 py-4 hover:shadow-md",
		);
		expect(enhancedSuccess.content()).toBe("text-green-900");
		expect(enhancedSuccess.icon()).toBe("inline-block align-middle");

		// Test enhanced component with danger state
		const enhancedDanger = Enhanced.create(() => ({
			variant: {
				color: "danger",
				size: "sm",
				state: "disabled",
			},
		}));
		expect(enhancedDanger.root()).toBe(
			"rounded font-medium text-sm px-2 py-1 bg-red-100 text-red-900 opacity-50 cursor-not-allowed",
		);
		expect(enhancedSuccess.content()).toBe("text-green-900");
	});
});
