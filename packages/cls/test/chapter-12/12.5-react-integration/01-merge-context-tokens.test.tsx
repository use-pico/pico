import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.5 React Integration - Merge Context Tokens", () => {
	it("should merge context tokens with component configuration", () => {
		// Create theme cls instance
		const ThemeCls = cls(
			{
				tokens: [
					"color.bg.light",
					"color.bg.dark",
					"color.text.light",
					"color.text.dark",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {
					"color.bg.light": {
						class: [
							"bg-white",
						],
					},
					"color.bg.dark": {
						class: [
							"bg-gray-900",
						],
					},
					"color.text.light": {
						class: [
							"text-gray-900",
						],
					},
					"color.text.dark": {
						class: [
							"text-white",
						],
					},
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.light",
									"color.text.light",
									"spacing.padding.md",
								],
							},
						},
					},
					{
						match: {
							theme: "dark",
						},
						slot: {
							root: {
								token: [
									"color.bg.dark",
									"color.text.dark",
								],
							},
						},
					},
				],
				defaults: {
					theme: "light",
				},
			},
		);

		// Create button cls instance
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
					variant: [
						"primary",
						"secondary",
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
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.primary",
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
								class: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
						},
					},
				],
				defaults: {
					variant: "primary",
				},
			},
		);

		const Button: FC<{
			children: string;
			variant?: "primary" | "secondary";
		}> = ({ children, variant = "primary" }) => {
			const { slots } = useCls(ButtonCls, {
				variant: {
					variant,
				},
			});

			return (
				<button
					type="button"
					className={slots.root()}
				>
					{children}
				</button>
			);
		};

		// Render with context provider
		render(
			<ClsContext value={ThemeCls}>
				<Button variant="secondary">Click me</Button>
			</ClsContext>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Click me");
	});
});
