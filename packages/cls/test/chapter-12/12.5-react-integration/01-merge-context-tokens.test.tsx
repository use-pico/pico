import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.5 React Integration - Merge Context Tokens", () => {
	it("should merge context tokens with component configuration", () => {
		// Create theme cls instance
		const ThemeCls = cls(
			{
				tokens: [
					"color.bg.light",
					"color.bg.dark",
					"color.text.light",
					"color.text.dark",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
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
				token: def.token?.({
					"color.bg.light": [
						"bg-white",
					],
					"color.bg.dark": [
						"bg-gray-900",
					],
					"color.text.light": [
						"text-gray-900",
					],
					"color.text.dark": [
						"text-white",
					],
					"spacing.padding.sm": [
						"p-2",
					],
					"spacing.padding.md": [
						"p-4",
					],
					"spacing.padding.lg": [
						"p-6",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.light",
							"color.text.light",
							"spacing.padding.md",
						]),
					}),
					def.rule?.(
						{
							theme: "dark",
						},
						{
							root: what.token?.([
								"color.bg.dark",
								"color.text.dark",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					theme: "light",
				}),
			}),
		);

		// Create button cls instance
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
				],
				slot: [
					"root",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
					],
				},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.bg.secondary": [
						"bg-gray-600",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.secondary": [
						"text-gray-900",
					],
				}),
				rules: [
					def.root?.({
						root: what.token?.([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
					def.rule?.(
						{
							variant: "secondary",
						},
						{
							root: what.token?.([
								"color.bg.secondary",
								"color.text.secondary",
							]),
						},
					),
				],
				defaults: def.defaults?.({
					variant: "primary",
				}),
			}),
		);

		const Button: FC<{
			children: string;
			variant?: "primary" | "secondary";
		}> = ({ children, variant = "primary" }) => {
			const classes = useCls(ButtonCls, ({ what }) => ({
				variant: what.variant?.({
					variant,
				}),
			}));

			if (!classes) {
				return null;
			}

			return (
				<button
					type="button"
					className={classes.root?.()}
				>
					{children}
				</button>
			);
		};

		// Render with context provider
		render(
			<ClsProvider value={ThemeCls}>
				<Button variant="secondary">Click me</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
	});
});
