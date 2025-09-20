import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - cls Prop Function with Context", () => {
	it("should handle cls prop function with context access", () => {
		const ThemeCls = cls(
			{
				tokens: [
					"theme.bg.light",
					"theme.bg.dark",
					"theme.text.light",
					"theme.text.dark",
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
					"theme.bg.light": {
						class: [
							"bg-white",
						],
					},
					"theme.bg.dark": {
						class: [
							"bg-gray-900",
						],
					},
					"theme.text.light": {
						class: [
							"text-gray-900",
						],
					},
					"theme.text.dark": {
						class: [
							"text-white",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"theme.bg.light",
									"theme.text.light",
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
				],
				defaults: {
					color: "primary",
				},
			},
		);

		const Button = ({
			children,
			tweak,
			...props
		}: Cls.Props<typeof ButtonCls, PropsWithChildren>) => {
			const { slots } = useCls(ButtonCls, tweak);

			return (
				<button
					type="button"
					className={slots.root()}
					{...props}
				>
					{children}
				</button>
			);
		};

		// Render with cls prop that simply overrides the variant
		// The cls system handles the class selection internally
		render(
			<ClsContext value={ThemeCls}>
				<Button
					tweak={{
						variant: {
							color: "secondary",
						},
					}}
				>
					Dynamic Button
				</Button>
			</ClsContext>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Dynamic Button");
	});
});
