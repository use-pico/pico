import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - Merge cls Prop with Context", () => {
	it("should merge cls prop with context tokens", () => {
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
					"size.padding.small",
					"size.padding.medium",
				],
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
					"size.padding.small": what.css([
						"px-2",
						"py-1",
					]),
					"size.padding.medium": what.css([
						"px-4",
						"py-2",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
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
		}: Cls.Props<typeof ButtonCls, PropsWithChildren>) => {
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
							color: "secondary",
							size: "small",
						}),
					})}
				>
					Context Button
				</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Context Button");
	});
});
