import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Component Identity and Type Safety", () => {
	it("should maintain component identity and type safety", () => {
		const TestCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"spacing.padding.small",
					"spacing.padding.medium",
					"spacing.padding.large",
					"border.radius.small",
					"border.radius.medium",
					"border.radius.large",
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
					] as const,
					size: [
						"small",
						"medium",
						"large",
					] as const,
					variant: [
						"default",
						"outlined",
						"ghost",
					] as const,
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
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-200",
						],
					},
					"spacing.padding.small": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.medium": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.large": {
						class: [
							"p-6",
						],
					},
					"border.radius.small": {
						class: [
							"rounded",
						],
					},
					"border.radius.medium": {
						class: [
							"rounded-md",
						],
					},
					"border.radius.large": {
						class: [
							"rounded-lg",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.medium",
									"border.radius.medium",
								],
							},
							icon: {
								class: [
									"w-4",
									"h-4",
								],
								token: [
									"color.text.primary",
								],
							},
							label: {
								class: [
									"font-medium",
								],
								token: [
									"color.text.primary",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
							icon: {
								token: [
									"color.text.secondary",
								],
							},
							label: {
								token: [
									"color.text.secondary",
								],
							},
						},
					},
					{
						match: {
							size: "small",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.small",
								],
							},
							icon: {
								class: [
									"w-3",
									"h-3",
								],
							},
						},
					},
					{
						match: {
							size: "large",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.large",
								],
							},
							icon: {
								class: [
									"w-6",
									"h-6",
								],
							},
						},
					},
					{
						match: {
							variant: "outlined",
						},
						slot: {
							root: {
								class: [
									"border",
									"border-current",
									"bg-transparent",
								],
							},
						},
					},
					{
						match: {
							variant: "ghost",
						},
						slot: {
							root: {
								class: [
									"bg-transparent",
									"hover:bg-opacity-10",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "medium",
					variant: "default",
				},
			},
		);

		interface ButtonProps {
			children: React.ReactNode;
			color?: "primary" | "secondary";
			size?: "small" | "medium" | "large";
			variant?: "default" | "outlined" | "ghost";
			onClick?: () => void;
			disabled?: boolean;
			className?: string;
		}

		const Button = ({ children, ...props }: ButtonProps) => (
			<button
				{...props}
				type="button"
			>
				{children}
			</button>
		);

		const EnhancedButton = withCls(Button, TestCls);

		// Test that the enhanced component maintains the same props interface
		const { container } = render(
			<EnhancedButton
				color="secondary"
				size="large"
				variant="outlined"
				onClick={() => {}}
				disabled={true}
				className="custom-class"
			>
				Test Button
			</EnhancedButton>,
		);

		const button = container.querySelector("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass("custom-class");
		expect(button).toHaveAttribute("disabled");
		expect(button).toHaveAttribute("type", "button");
	});
});
