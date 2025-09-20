import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { useCls, withCls } from "../../../src/react";

describe("12.6 React Advanced Integration - Combine useCls with HOC", () => {
	it("should combine useCls with withCls HOC", () => {
		const BaseButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
					"size.padding.small",
					"size.padding.medium",
					"size.padding.large",
					"size.text.small",
					"size.text.medium",
					"size.text.large",
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
						"large",
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
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-900",
						],
					},
					"size.padding.small": {
						class: [
							"px-2",
							"py-1",
						],
					},
					"size.padding.medium": {
						class: [
							"px-4",
							"py-2",
						],
					},
					"size.padding.large": {
						class: [
							"px-6",
							"py-3",
						],
					},
					"size.text.small": {
						class: [
							"text-sm",
						],
					},
					"size.text.medium": {
						class: [
							"text-base",
						],
					},
					"size.text.large": {
						class: [
							"text-lg",
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
									"size.padding.medium",
									"size.text.medium",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
					size: "medium",
				},
			},
		);

		const IconButtonCls = cls(
			{
				tokens: [
					"icon.position.left",
					"icon.position.right",
				],
				slot: [
					"root",
					"icon",
					"label",
				],
				variant: {
					iconPosition: [
						"left",
						"right",
					],
				},
			},
			{
				token: {
					"icon.position.left": {
						class: [
							"flex-row",
						],
					},
					"icon.position.right": {
						class: [
							"flex-row-reverse",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"icon.position.left",
								],
							},
							icon: {
								class: [
									"w-4",
									"h-4",
								],
							},
							label: {
								class: [
									"font-medium",
								],
							},
						},
					},
				],
				defaults: {
					iconPosition: "left",
				},
			},
		);

		// Create base button component
		const Button = ({ children, ...props }: any) => (
			<button
				type="button"
				{...props}
			>
				{children}
			</button>
		);

		// Create icon button component that uses useCls
		const IconButton = ({
			children,
			icon,
			...props
		}: Cls.Props<
			typeof IconButtonCls,
			PropsWithChildren & {
				icon: string;
			}
		>) => {
			const { slots: classes } = useCls(IconButtonCls, {
				variant: {
					iconPosition: "left",
				},
			});

			if (!classes) {
				return null;
			}

			return (
				<button
					type="button"
					className={classes.root()}
					{...props}
				>
					<span className={classes.icon()}>{icon}</span>
					<span className={classes.label()}>{children}</span>
				</button>
			);
		};

		// Enhance base button with withCls
		const EnhancedButton = withCls(Button, BaseButtonCls);

		// Render both components
		render(
			<div>
				<EnhancedButton>Base Button</EnhancedButton>
				<IconButton icon="★">Icon Button</IconButton>
			</div>,
		);

		// Should render both buttons
		expect(screen.getByText?.("Base Button")).toBeInTheDocument();
		expect(screen.getByText?.("Icon Button")).toBeInTheDocument();
		expect(screen.getByText?.("★")).toBeInTheDocument();

		// Verify HOC attachment
		expect(EnhancedButton.cls).toBe(BaseButtonCls);
	});
});
