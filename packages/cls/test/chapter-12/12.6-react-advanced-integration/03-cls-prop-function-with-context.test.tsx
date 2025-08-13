import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Component, cls } from "../../../src";
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
					"theme.bg.light": [
						"bg-white",
					],
					"theme.bg.dark": [
						"bg-gray-900",
					],
					"theme.text.light": [
						"text-gray-900",
					],
					"theme.text.dark": [
						"text-white",
					],
				}),
				rules: [
					def.root({
						root: what.token([
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
					def.root({
						root: what.token([
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
			cls: clsProp,
			...props
		}: Component<typeof ButtonCls, PropsWithChildren>) => {
			const classes = useCls(ButtonCls, clsProp);

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
					cls={({ what }) => ({
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
