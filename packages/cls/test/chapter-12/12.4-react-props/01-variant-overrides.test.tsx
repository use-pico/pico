import { render, screen } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { useCls } from "../../../src/react";

describe("12.4 React Props - Variant Overrides", () => {
	it("should handle cls prop with variant overrides", () => {
		const ButtonCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.bg.accent",
					"color.text.primary",
					"color.text.secondary",
					"color.text.accent",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
					"label",
				],
				variant: {
					variant: [
						"primary",
						"secondary",
						"accent",
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
					"color.bg.accent": {
						class: [
							"bg-purple-600",
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
					"color.text.accent": {
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
								token: [
									"color.bg.primary",
									"color.text.primary",
									"spacing.padding.md",
								],
							},
							label: {
								token: [
									"color.text.primary",
								],
							},
						},
					},
					{
						match: {
							variant: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
									"spacing.padding.md",
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
							size: "sm",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.sm",
								],
							},
						},
					},
					{
						match: {
							size: "lg",
						},
						slot: {
							root: {
								token: [
									"spacing.padding.lg",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
					size: "md",
				},
			},
		);

		const Button: FC<Cls.Props<typeof ButtonCls, PropsWithChildren>> = ({
			tweak: userTweak,
			children,
		}) => {
			const { slots } = useCls(ButtonCls, userTweak);

			return (
				<button
					type="button"
					className={slots.root()}
				>
					<span className={slots.label()}>{children}</span>
				</button>
			);
		};

		// Test with variant override
		render(
			<Button
				tweak={{
					variant: {
						variant: "secondary" as const,
						size: "lg" as const,
					},
				}}
			>
				Secondary Large Button
			</Button>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Secondary Large Button");
	});
});
