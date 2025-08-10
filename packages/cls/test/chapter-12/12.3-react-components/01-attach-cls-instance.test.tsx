import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Attach Cls Instance", () => {
	it("should attach cls instance to component", () => {
		// Create a cls instance
		const ButtonCls = cls(
			{
				tokens: {
					"color.bg": [
						"primary",
						"secondary",
						"danger",
					],
					"color.text": [
						"primary",
						"secondary",
						"danger",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
				},
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					color: [
						"primary",
						"secondary",
						"danger",
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
					"color.bg": {
						primary: [
							"bg-blue-600",
						],
						secondary: [
							"bg-gray-600",
						],
						danger: [
							"bg-red-600",
						],
					},
					"color.text": {
						primary: [
							"text-white",
						],
						secondary: [
							"text-white",
						],
						danger: [
							"text-white",
						],
					},
					"spacing.padding": {
						sm: [
							"px-2",
							"py-1",
						],
						md: [
							"px-4",
							"py-2",
						],
						lg: [
							"px-6",
							"py-3",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.md",
						]),
						icon: what.token([
							"color.text.primary",
							"spacing.padding.sm",
						]),
						label: what.token([
							"color.text.primary",
							"spacing.padding.sm",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
					size: "md",
				}),
			}),
		);

		// Create a base component
		function Button({ children, ...props }: { children: React.ReactNode }) {
			return (
				<button
					type="button"
					{...props}
				>
					{children}
				</button>
			);
		}

		// Enhance with cls
		const EnhancedButton = withCls(Button, ButtonCls);

		// Render the enhanced component
		render(<EnhancedButton>Click me</EnhancedButton>);

		// Should render the button
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("Click me");
	});
});
