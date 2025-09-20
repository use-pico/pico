import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Attach Cls Instance", () => {
	it("should attach cls instance to component", () => {
		// Create a cls instance
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.danger",
					"color.text.primary",
					"color.text.secondary",
					"color.text.danger",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
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
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.bg.danger": {
						class: [
							"bg-red-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-white",
						],
					},
					"color.text.danger": {
						class: [
							"text-white",
						],
					},
					"spacing.padding.sm": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"spacing.padding.md": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"spacing.padding.lg": {
						class: [
							"px-6",
							"py-3",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
								],
							},
							icon: {
								class: [
									"color.text.primary",
									"spacing.padding.sm",
								],
							},
							label: {
								class: [
									"color.text.primary",
									"spacing.padding.sm",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "md",
				},
			},
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
		expect(screen.getByRole?.("button")).toBeInTheDocument();
		expect(screen.getByRole?.("button")).toHaveTextContent("Click me");
	});
});
