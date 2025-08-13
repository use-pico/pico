import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Component, cls } from "../../../src";
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
						"text-gray-900",
					],
					"size.padding.small": [
						"px-2",
						"py-1",
					],
					"size.padding.medium": [
						"px-4",
						"py-2",
					],
					"size.padding.large": [
						"px-6",
						"py-3",
					],
					"size.text.small": [
						"text-sm",
					],
					"size.text.medium": [
						"text-base",
					],
					"size.text.large": [
						"text-lg",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
							"size.padding.medium",
							"size.text.medium",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
					size: "medium",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"icon.position.left": [
						"flex-row",
					],
					"icon.position.right": [
						"flex-row-reverse",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"icon.position.left",
						]),
						icon: what.css("w-4 h-4"),
						label: what.css("font-medium"),
					}),
				],
				defaults: def.defaults({
					iconPosition: "left",
				}),
			}),
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
		}: Component<
			typeof IconButtonCls,
			PropsWithChildren & {
				icon: string;
			}
		>) => {
			const classes = useCls(IconButtonCls, ({ what }) => ({
				variant: what.variant({
					iconPosition: "left",
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
