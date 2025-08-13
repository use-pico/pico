import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

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
			({ def }) => ({
				token: def.token({
					"color.bg.primary": [
						"bg-blue-600",
					],
					"color.text.primary": [
						"text-white",
					],
				}),
				rules: [],
				defaults: def.defaults({}),
			}),
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
			({ what, def }) => ({
				token: def.token({}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
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
			({ def }) => ({
				token: def.token({
					"color.bg.primary": [
						"bg-red-600",
					],
					"color.text.primary": [
						"text-black",
					],
				}),
				rules: [],
				defaults: def.defaults({}),
			}),
		);

		// Testing Button that uses useCls (hooks into context)
		const Button: FC<{
			children: string;
		}> = ({ children }) => {
			const classes = useCls(ButtonCls);
			return (
				<button
					type="button"
					className={classes.root()}
				>
					{children}
				</button>
			);
		};

		// Provide CustomTheme via ThemeCls.use(CustomThemeCls)
		render(
			<ClsProvider value={ThemeCls.use(CustomThemeCls)}>
				<Button>Click me</Button>
			</ClsProvider>,
		);

		const button = screen.getByRole?.("button");
		expect(button).toBeInTheDocument();
		// Button should pick up overridden tokens from CustomTheme
		expect(button.className).toContain("bg-red-600");
		expect(button.className).toContain("text-black");
		// And should not contain base Theme defaults
		expect(button.className).not.toContain?.("bg-blue-600");
		expect(button.className).not.toContain?.("text-white");
	});
});
