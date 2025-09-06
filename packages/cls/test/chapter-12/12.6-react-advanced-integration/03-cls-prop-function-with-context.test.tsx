import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - cls Prop Function with Context", () => {
	it("should handle cls prop function with context access", () => {
		const ThemeCls = cls(
			{
				tokens: [
					"theme.bg.light",
					"theme.bg.dark",
					"theme.text.light",
					"theme.text.dark",
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
				token: def.token({
					"theme.bg.light": what.css([
						"bg-white",
					]),
					"theme.bg.dark": what.css([
						"bg-gray-900",
					]),
					"theme.text.light": what.css([
						"text-gray-900",
					]),
					"theme.text.dark": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"theme.bg.light",
							"theme.text.light",
						]),
					}),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
		);

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
					color: [
						"primary",
						"secondary",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-gray-900",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
				}),
			}),
		);

		const Button = ({
			children,
			tweak: tweakProp,
			...props
		}: Cls.Props<typeof ButtonCls, PropsWithChildren>) => {
			const classes = useCls(ButtonCls, tweakProp);

			if (!classes) {
				return null;
			}

			return (
				<button
					type="button"
					className={classes.root()}
					{...props}
				>
					{children}
				</button>
			);
		};

		// Render with cls prop that simply overrides the variant
		// The cls system handles the class selection internally
		render(
			<ClsProvider value={ThemeCls}>
				<Button
					tweak={({ what }) => ({
						variant: what.variant({
							color: "secondary",
						}),
					})}
				>
					Dynamic Button
				</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Dynamic Button");
	});
});
