import { render, screen } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import type { Cls } from "../../../src";
import { cls } from "../../../src";

describe("12.4 React Props - Token Overrides", () => {
	it("should handle cls prop with token overrides", () => {
		const SimpleCls = cls(
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
					"color.text.secondary": what.css([
						"text-gray-900",
					]),
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.primary",
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
						},
					),
				],
				defaults: def.defaults({
					color: "primary",
				}),
			}),
		);

		const SimpleComponent: FC<
			Cls.Props<typeof SimpleCls, PropsWithChildren>
		> = ({ tweak: userTweak, children }) => {
			const classes = SimpleCls.create(userTweak);
			return <div className={classes.root()}>{children}</div>;
		};

		// Test with token overrides
		render(
			<SimpleComponent
				tweak={({ what }) => ({
					variant: what.variant({
						color: "secondary",
					}),
				})}
			>
				Simple Component
			</SimpleComponent>,
		);

		const component = screen.getByText?.("Simple Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe("bg-gray-600 text-gray-900");
	});
});
