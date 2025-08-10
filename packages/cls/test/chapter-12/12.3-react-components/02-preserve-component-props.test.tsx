import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Preserve Component Props", () => {
	it("should preserve component props and functionality", () => {
		// Create a cls instance
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
							"text-white",
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

		// Create a base component with props
		function Button({
			children,
			onClick,
			disabled,
			...props
		}: {
			children: React.ReactNode;
			onClick?: () => void;
			disabled?: boolean;
		}) {
			return (
				<button
					type="button"
					onClick={onClick}
					disabled={disabled}
					{...props}
				>
					{children}
				</button>
			);
		}

		// Enhance with cls
		const EnhancedButton = withCls(Button, ButtonCls);

		// Mock click handler
		const handleClick = vi.fn();

		// Render the enhanced component with props
		render(
			<EnhancedButton
				onClick={handleClick}
				disabled
			>
				Click me
			</EnhancedButton>,
		);

		// Should render the button with preserved props
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
		expect(button).toBeDisabled();

		// Should handle click events
		button.click();
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
