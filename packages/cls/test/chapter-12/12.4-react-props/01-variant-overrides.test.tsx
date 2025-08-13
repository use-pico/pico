import { render, screen } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { useCls } from "../../../src/react";
import type { Component } from "../../../src/types";

describe("12.4 React Props - Variant Overrides", () => {
	it("should handle cls prop with variant overrides", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
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
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.bg.secondary": [
						"bg-gray-600",
					],
					"color.bg.accent": [
						"bg-purple-600",
					],
					"color.text.primary": [
						"text-white",
					],
					"color.text.secondary": [
						"text-gray-900",
					],
					"color.text.accent": [
						"text-white",
					],
					"spacing.padding.sm": [
						"px-2",
						"py-1",
					],
					"spacing.padding.md": [
						"px-4",
						"py-2",
					],
					"spacing.padding.lg": [
						"px-6",
						"py-3",
					],
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.md",
						]),
						label: what.css([
							"color.text.primary",
						]),
					}),
					def.rule(
						{
							variant: "secondary",
						},
						{
							root: what.css([
								"color.bg.secondary",
								"color.text.secondary",
								"spacing.padding.md",
							]),
							label: what.css([
								"color.text.secondary",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.css([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.css([
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

		const Button: FC<Component<typeof ButtonCls, PropsWithChildren>> = ({
			cls: userCls,
			children,
		}) => {
			const classes = useCls(ButtonCls, userCls);

			if (!classes) {
				return null;
			}

			return (
				<button
					type="button"
					className={classes.root()}
				>
					<span className={classes.label()}>{children}</span>
				</button>
			);
		};

		// Test with variant override
		render(
			<Button
				cls={({ what }) => ({
					variant: what.variant({
						variant: "secondary" as const,
						size: "lg" as const,
					}),
				})}
			>
				Secondary Large Button
			</Button>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Secondary Large Button");
	});
});
