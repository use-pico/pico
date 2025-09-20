import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - Merge cls Prop with Context", () => {
	it("should merge cls prop with context tokens", () => {
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
								token: [
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
					"size.padding.small",
					"size.padding.medium",
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
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
									"size.padding.medium",
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

		const Button = ({
			children,
			tweak: tweakProp,
			...props
		}: Cls.Props<typeof ButtonCls, PropsWithChildren>) => {
			const { slots } = useCls(ButtonCls, tweakProp);

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

		// Render with context and cls prop override
		render(
			<ClsContext value={ThemeCls}>
				<Button
					tweak={{
						variant: {
							color: "secondary",
							size: "small",
						},
					}}
				>
					Context Button
				</Button>
			</ClsContext>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent("Context Button");
	});
});
