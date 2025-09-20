import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.5 React Integration - Theme use() chain token overrides", () => {
	it("should override Button tokens from CustomTheme provided via ThemeCls.use(CustomThemeCls)", () => {
		// Root Theme with tokens only
		const ThemeCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.text.primary",
				],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		// Simple Button extended from Theme; uses Theme tokens in its rules
		const ButtonCls = ThemeCls.extend(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Custom theme that overrides some Theme tokens
		const CustomThemeCls = ThemeCls.extend(
			{
				tokens: [
					"color.bg.primary",
					"color.text.primary",
				],
				slot: [],
				variant: {},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-red-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-black",
						],
					},
				},
				rules: [],
				defaults: {},
			},
		);

		// Testing Button that uses useCls (hooks into context)
		const Button: FC<{
			children: string;
		}> = ({ children }) => {
			const { slots } = useCls(ButtonCls);
			return (
				<button
					type="button"
					className={slots.root()}
				>
					{children}
				</button>
			);
		};

		// Provide CustomTheme via ThemeCls.use(CustomThemeCls)
		render(
			<ClsContext value={ThemeCls.use(CustomThemeCls)}>
				<Button>Click me</Button>
			</ClsContext>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		// Button should pick up overridden tokens from CustomTheme
		expect(button.className).toBe("bg-red-600 text-black");
		// And should not contain base Theme defaults
		expect(button.className).not.toContain?.("bg-blue-600");
		expect(button.className).not.toContain?.("text-white");
	});
});
