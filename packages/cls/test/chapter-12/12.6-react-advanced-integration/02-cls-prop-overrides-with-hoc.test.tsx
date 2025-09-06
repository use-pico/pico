import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { useCls, withCls } from "../../../src/react";

describe("12.6 React Advanced Integration - cls Prop Overrides with HOC", () => {
	it("should handle cls prop overrides with HOC", () => {
		const BaseButtonCls = cls(
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

		const CustomButtonCls = BaseButtonCls.extend(
			{
				tokens: [
					"color.bg.custom",
					"color.text.custom",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"custom",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.custom": what.css([
						"bg-purple-600",
					]),
					"color.text.custom": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.custom",
							"color.text.custom",
						]),
					}),
				],
				defaults: def.defaults({
					color: "custom",
				}),
			}),
		);

		// Create button component that accepts cls prop
		const Button = ({
			children,
			cls = BaseButtonCls,
			...props
		}: Cls.Props<typeof BaseButtonCls, PropsWithChildren>) => {
			const classes = useCls(cls, ({ what }) => ({
				variant: what.variant({
					color: "primary",
				}),
			}));

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

		// Enhance with withCls
		const EnhancedButton = withCls(Button, BaseButtonCls);

		// Render with default cls
		render(<EnhancedButton>Default Button</EnhancedButton>);

		// Render with custom cls override
		render(
			<EnhancedButton cls={BaseButtonCls.use(CustomButtonCls)}>
				Custom Button
			</EnhancedButton>,
		);

		// Should render both buttons
		expect(screen.getByText?.("Default Button")).toBeInTheDocument();
		expect(screen.getByText?.("Custom Button")).toBeInTheDocument();

		// Verify HOC attachment
		expect(EnhancedButton.cls).toBe(BaseButtonCls);
	});
});
