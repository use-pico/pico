import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Preserve Component Props", () => {
	it("should preserve component props and functionality", () => {
		// Create a cls instance
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
						"text-white",
					],
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

		// Create a base component with props
		function Button({
			children,
			disabled,
			...props
		}: {
			children: React.ReactNode;
			disabled?: boolean;
		}) {
			return (
				<button
					type="button"
					disabled={disabled}
					{...props}
				>
					{children}
				</button>
			);
		}

		// Enhance with cls
		const EnhancedButton = withCls(Button, ButtonCls);

		// Render the enhanced component with props
		render(<EnhancedButton disabled>Click me</EnhancedButton>);

		// Should render the button with preserved props
		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
		expect(button).toBeDisabled();

		// Verify that the component is properly enhanced
		expect(EnhancedButton.cls).toBe(ButtonCls);
	});
});
