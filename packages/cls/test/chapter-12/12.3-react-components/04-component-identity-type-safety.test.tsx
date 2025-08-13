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
						"text-gray-200",
					],
					"spacing.padding.small": [
						"p-2",
					],
					"spacing.padding.medium": [
						"p-4",
					],
					"spacing.padding.large": [
						"p-6",
					],
					"border.radius.small": [
						"rounded",
					],
					"border.radius.medium": [
						"rounded-md",
					],
					"border.radius.large": [
						"rounded-lg",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"spacing.padding.medium",
							"border.radius.medium",
						]),
						icon: what.both("w-4 h-4", [
							"color.text.primary",
						]),
						label: what.both("font-medium", [
							"color.text.primary",
						]),
					}),
					def.rule(
						{
							color: "secondary",
						},
						{
							root: what.token([
								"color.bg.secondary",
								"color.text.secondary",
							]),
							icon: what.token([
								"color.text.secondary",
							]),
							label: what.token([
								"color.text.secondary",
							]),
						},
					),
					def.rule(
						{
							size: "small",
						},
						{
							root: what.token([
								"spacing.padding.small",
							]),
							icon: what.css("w-3 h-3"),
						},
					),
					def.rule(
						{
							size: "large",
						},
						{
							root: what.token([
								"spacing.padding.large",
							]),
							icon: what.css("w-6 h-6"),
						},
					),
					def.rule(
						{
							variant: "outlined",
						},
						{
							root: what.css(
								"border border-current bg-transparent",
							),
						},
					),
					def.rule(
						{
							variant: "ghost",
						},
						{
							root: what.css(
								"bg-transparent hover:bg-opacity-10",
							),
						},
					),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
					variant: "default",
				}),
			}),
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
