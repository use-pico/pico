import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.5 React Integration - useCls with Context", () => {
	it("should merge context tokens with component configuration", () => {
		// Create theme cls instance
		const ThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"light",
						"dark",
					],
					"color.text": [
						"light",
						"dark",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						light: [
							"bg-white",
						],
						dark: [
							"bg-gray-900",
						],
					},
					"color.text": {
						light: [
							"text-gray-900",
						],
						dark: [
							"text-white",
						],
					},
					"spacing.padding": {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.light",
							"color.text.light",
							"spacing.padding.md",
						]),
					}),
					def.rule(
						{
							theme: "dark",
						},
						{
							root: what.token([
								"color.bg.dark",
								"color.text.dark",
							]),
						},
					),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
		);

		// Create button cls instance
		const ButtonCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
					],
					"color.text": [
						"primary",
						"secondary",
					],
					"border.radius": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
					"label",
				],
				variant: {
					variant: [
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
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
						secondary: [
							"bg-gray-600",
						],
					},
					"color.text": {
						primary: [
							"text-white",
						],
						secondary: [
							"text-gray-900",
						],
					},
					"border.radius": {
						sm: [
							"rounded",
						],
						md: [
							"rounded-md",
						],
						lg: [
							"rounded-lg",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"border.radius.md",
						]),
						label: what.token([
							"color.text.primary",
						]),
					}),
					def.rule(
						{
							variant: "secondary",
						},
						{
							root: what.token([
								"color.bg.secondary",
								"color.text.secondary",
							]),
							label: what.token([
								"color.text.secondary",
							]),
						},
					),
				],
				defaults: def.defaults({
					variant: "primary",
					size: "md",
				}),
			}),
		);

		// Define button component that uses useCls
		const Button: FC<{
			children: string;
			variant?: "primary" | "secondary";
		}> = ({ children, variant = "primary" }) => {
			const classes = useCls(ButtonCls, ({ what }) => ({
				variant: what.variant({
					variant,
				}),
			}));
			return (
				<button
					type="button"
					className={classes.root()}
				>
					<span className={classes.label()}>{children}</span>
				</button>
			);
		};

		// Test with light theme context
		render(
			<ClsProvider value={ThemeCls}>
				<Button variant="secondary">Click me</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Click me");
		// Should use button's own styling, not theme context
		expect(button.className).toBe("rounded-md bg-gray-600 text-gray-900");
	});

	it("should handle context token inheritance correctly", () => {
		// Create base theme cls instance
		const BaseThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"base",
					],
					"color.text": [
						"base",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						base: [
							"bg-gray-100",
						],
					},
					"color.text": {
						base: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.base",
							"color.text.base",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Create component cls instance
		const ComponentCls = cls(
			{
				tokens: {
					"color.bg": [
						"base",
						"component",
					],
					"color.text": [
						"base",
						"component",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
				],
				variant: {
					variant: [
						"default",
						"highlighted",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						base: [
							"bg-gray-100",
						],
						component: [
							"bg-blue-100",
						],
					},
					"color.text": {
						base: [
							"text-gray-900",
						],
						component: [
							"text-blue-900",
						],
					},
					"spacing.padding": {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.base",
							"color.text.base",
							"spacing.padding.md",
						]),
					}),
					def.rule(
						{
							variant: "highlighted",
						},
						{
							root: what.token([
								"color.bg.component",
								"color.text.component",
							]),
						},
					),
				],
				defaults: def.defaults({
					variant: "default",
				}),
			}),
		);

		// Define component that uses useCls
		const TestComponent: FC<{
			variant?: "default" | "highlighted";
		}> = ({ variant = "default" }) => {
			const classes = useCls(ComponentCls, ({ what }) => ({
				variant: what.variant({
					variant,
				}),
			}));
			return <div className={classes.root()}>Component content</div>;
		};

		// Test with base theme context
		render(
			<ClsProvider value={BaseThemeCls}>
				<TestComponent variant="highlighted" />
			</ClsProvider>,
		);

		const div = screen.getByText("Component content");
		expect(div.className).toBe("p-4 bg-blue-100 text-blue-900");
	});

	it("should handle multiple context providers correctly", () => {
		// Create theme cls instances
		const GlobalThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"global",
					],
					"color.text": [
						"global",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						global: [
							"bg-white",
						],
					},
					"color.text": {
						global: [
							"text-black",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.global",
							"color.text.global",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const LocalThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"global",
						"local",
					],
					"color.text": [
						"global",
						"local",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						global: [
							"bg-white",
						],
						local: [
							"bg-blue-50",
						],
					},
					"color.text": {
						global: [
							"text-black",
						],
						local: [
							"text-blue-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.local",
							"color.text.local",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Define component that uses useCls
		const NestedComponent: FC = () => {
			const classes = useCls(LocalThemeCls);
			return <div className={classes.root()}>Nested content</div>;
		};

		// Test with nested providers
		render(
			<ClsProvider value={GlobalThemeCls}>
				<ClsProvider value={LocalThemeCls}>
					<NestedComponent />
				</ClsProvider>
			</ClsProvider>,
		);

		const div = screen.getByText("Nested content");
		expect(div.className).toBe("bg-blue-50 text-blue-900");
	});

	it("should handle context token conflicts correctly", () => {
		// Create cls instances
		const ContextCls = cls(
			{
				tokens: {
					"color.bg": [
						"context",
					],
					"color.text": [
						"context",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						context: [
							"bg-red-100",
						],
					},
					"color.text": {
						context: [
							"text-red-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.context",
							"color.text.context",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const ComponentCls = cls(
			{
				tokens: {
					"color.bg": [
						"context",
						"component",
					],
					"color.text": [
						"context",
						"component",
					],
				},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						context: [
							"bg-red-100",
						],
						component: [
							"bg-green-100",
						],
					},
					"color.text": {
						context: [
							"text-red-900",
						],
						component: [
							"text-green-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.component",
							"color.text.component",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Define component that uses useCls
		const ConflictComponent: FC = () => {
			const classes = useCls(ComponentCls);
			return <div className={classes.root()}>Conflict content</div>;
		};

		// Test with context that has conflicting tokens
		render(
			<ClsProvider value={ContextCls}>
				<ConflictComponent />
			</ClsProvider>,
		);

		const div = screen.getByText("Conflict content");
		// Component should use its own tokens, not context tokens
		expect(div.className).toBe("bg-green-100 text-green-900");
	});
});
