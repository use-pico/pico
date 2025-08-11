import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Component, cls } from "../../../src";
import { useCls, withCls } from "../../../src/react";

describe("12.6 React Advanced Integration - cls Prop Overrides with HOC", () => {
	it("should handle cls prop overrides with HOC", () => {
		const BaseButtonCls = cls(
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
				},
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

		const CustomButtonCls = BaseButtonCls.extend(
			{
				tokens: {
					"color.bg": [
						"custom",
					],
					"color.text": [
						"custom",
					],
				},
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
					"color.bg": {
						custom: [
							"bg-purple-600",
						],
					},
					"color.text": {
						custom: [
							"text-white",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
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
			tva = BaseButtonCls,
			...props
		}: Component<typeof BaseButtonCls, PropsWithChildren>) => {
			const classes = useCls(tva, ({ what }) => ({
				variant: what.variant({
					color: "primary" as const,
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
			<EnhancedButton tva={BaseButtonCls.use(CustomButtonCls)}>
				Custom Button
			</EnhancedButton>,
		);

		// Should render both buttons
		expect(screen.getByText("Default Button")).toBeInTheDocument();
		expect(screen.getByText("Custom Button")).toBeInTheDocument();

		// Verify HOC attachment
		expect(EnhancedButton.cls).toBe(BaseButtonCls);
	});
});
