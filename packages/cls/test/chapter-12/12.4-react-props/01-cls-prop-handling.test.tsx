import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import type { Component } from "../../../src/types";

describe("12.4 React Props - cls Prop Handling", () => {
	it("should handle cls prop with variant overrides", () => {
		const ButtonCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
						"accent",
					],
					"color.text": [
						"primary",
						"secondary",
						"accent",
					],
					"spacing.padding": [
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
						"accent",
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
						accent: [
							"bg-purple-600",
						],
					},
					"color.text": {
						primary: [
							"text-white",
						],
						secondary: [
							"text-gray-900",
						],
						accent: [
							"text-white",
						],
					},
					"spacing.padding": {
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
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.md",
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
					def.rule(
						{
							variant: "accent",
						},
						{
							root: what.token([
								"color.bg.accent",
								"color.text.accent",
							]),
							label: what.token([
								"color.text.accent",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.padding.lg",
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

		// Define component that accepts cls prop
		const Button: FC<
			Component<typeof ButtonCls> & {
				children: string;
			}
		> = ({ cls: userCls, children }) => {
			const classes = ButtonCls.create(userCls);
			return (
				<button
					type="button"
					className={classes.root()}
				>
					<span className={classes.label()}>{children}</span>
				</button>
			);
		};

		// Test with cls prop override
		render(
			<Button
				cls={({ what }) => ({
					variant: {
						variant: "secondary",
						size: "lg",
					},
				})}
			>
				Click me
			</Button>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveTextContent("Click me");
		expect(button.className).toBe("bg-gray-600 text-gray-900 px-6 py-3");
	});

	it("should handle cls prop with slot overrides", () => {
		const CardCls = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"highlighted",
					],
					"color.text": [
						"default",
						"highlighted",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
					"border.radius": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
					"header",
					"content",
				],
				variant: {
					variant: [
						"default",
						"highlighted",
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
						default: [
							"bg-white",
						],
						highlighted: [
							"bg-blue-50",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						highlighted: [
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
							"color.bg.default",
							"color.text.default",
							"spacing.padding.md",
							"border.radius.md",
						]),
						header: what.token([
							"color.text.default",
							"spacing.padding.md",
						]),
						content: what.token([
							"color.text.default",
							"spacing.padding.md",
						]),
					}),
					def.rule(
						{
							variant: "highlighted",
						},
						{
							root: what.token([
								"color.bg.highlighted",
								"color.text.highlighted",
							]),
							header: what.token([
								"color.text.highlighted",
							]),
							content: what.token([
								"color.text.highlighted",
							]),
						},
					),
				],
				defaults: def.defaults({
					variant: "default",
					size: "md",
				}),
			}),
		);

		// Define component that accepts cls prop
		const Card: FC<
			Component<typeof CardCls> & {
				title: string;
				children: string;
			}
		> = ({ cls: userCls, title, children }) => {
			const classes = CardCls.create(userCls);
			return (
				<div className={classes.root()}>
					<header className={classes.header()}>{title}</header>
					<main className={classes.content()}>{children}</main>
				</div>
			);
		};

		// Test with cls prop override
		render(
			<Card
				cls={({ what }) => ({
					variant: {
						variant: "highlighted",
					},
					slot: {
						header: what.css([
							"text-lg",
							"font-bold",
						]),
						content: what.css([
							"text-sm",
						]),
					},
				})}
				title="Card Title"
			>
				Card content here
			</Card>,
		);

		const card = screen.getByText("Card Title").closest("div");
		const header = screen.getByText("Card Title");
		const content = screen.getByText("Card content here");

		expect(card?.className).toBe("bg-blue-50 text-blue-900 p-4 rounded-md");
		expect(header.className).toBe("text-blue-900 p-4 text-lg font-bold");
		expect(content.className).toBe("text-blue-900 p-4 text-sm");
	});

	it("should handle cls prop with token overrides", () => {
		// Create the cls instance
		const SimpleCls = cls(
			{
				tokens: {
					"color.bg": [
						"default",
						"custom",
					],
					"color.text": [
						"default",
						"custom",
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
						default: [
							"bg-gray-100",
						],
						custom: [
							"bg-yellow-100",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
						custom: [
							"text-yellow-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Define component that accepts cls prop
		const SimpleComponent: FC<
			Component<typeof SimpleCls> & {
				children: string;
			}
		> = ({ cls: userCls, children }) => {
			const classes = SimpleCls.create(userCls);
			return <div className={classes.root()}>{children}</div>;
		};

		// Test with cls prop token override
		render(
			<SimpleComponent
				cls={({ override }) => ({
					token: override.token({
						"color.bg": {
							custom: [
								"bg-red-100",
							],
						},
					}),
				})}
			>
				Custom styled content
			</SimpleComponent>,
		);

		const div = screen.getByText("Custom styled content");
		expect(div.className).toBe("bg-red-100 text-gray-900");
	});

	it("should handle cls prop with no configuration", () => {
		// Create the cls instance
		const TestCls = cls(
			{
				tokens: {
					"color.bg": [
						"default",
					],
					"color.text": [
						"default",
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
						default: [
							"bg-gray-100",
						],
					},
					"color.text": {
						default: [
							"text-gray-900",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
						]),
					}),
				],
				defaults: {},
			}),
		);

		// Define component that accepts cls prop
		const TestComponent: FC<
			Component<typeof TestCls> & {
				children: string;
			}
		> = ({ cls: userCls, children }) => {
			const classes = TestCls.create(userCls);
			return <div className={classes.root()}>{children}</div>;
		};

		// Test with no cls prop
		render(<TestComponent>Default content</TestComponent>);

		const div = screen.getByText("Default content");
		expect(div.className).toBe("bg-gray-100 text-gray-900");
	});
});
