import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Component, cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - Merge cls Prop with Context", () => {
	it("should merge cls prop with context tokens", () => {
		const ThemeCls = cls(
			{
				tokens: {
					"theme.bg": [
						"light",
						"dark",
					],
					"theme.text": [
						"light",
						"dark",
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
					"theme.bg": {
						light: [
							"bg-white",
						],
						dark: [
							"bg-gray-900",
						],
					},
					"theme.text": {
						light: [
							"text-gray-900",
						],
						dark: [
							"text-white",
						],
					},
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
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
					],
					"color.text": [
						"primary",
						"secondary",
					],
					"size.padding": [
						"small",
						"medium",
					],
				},
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
					size: [
						"small",
						"medium",
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
					"size.padding": {
						small: [
							"px-2",
							"py-1",
						],
						medium: [
							"px-4",
							"py-2",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"size.padding.medium",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
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

		// Render with context and cls prop override
		render(
			<ClsProvider value={ThemeCls}>
				<Button
					cls={({ what }) => ({
						variant: what.variant({
							color: "secondary" as const,
							size: "small" as const,
						}),
					})}
				>
					Context Button
				</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Context Button");
	});
});
