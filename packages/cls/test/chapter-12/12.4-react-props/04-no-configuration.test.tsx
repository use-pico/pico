import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import type { Component } from "../../../src/types";

describe("12.4 React Props - No Configuration", () => {
	it("should handle cls prop with no configuration", () => {
		const TestCls = cls(
			{
				tokens: [
					"color.bg.default",
					"color.text.default",
				],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"default",
					],
				},
			},
			({ what, def }) => ({
				token: def.token?.({
					"color.bg.default": [
						"bg-gray-100",
					],
					"color.text.default": [
						"text-gray-900",
					],
				}),
				rules: [
					def.root?.({
						root: what.both?.(
							[
								"p-4",
								"rounded",
							],
							[
								"color.bg.default",
								"color.text.default",
							],
						),
					}),
				],
				defaults: def.defaults?.({
					theme: "default",
				}),
			}),
		);

		const TestComponent: FC<
			Component<typeof TestCls> & {
				children: string;
			}
		> = ({ cls: userCls, children }) => {
			const classes = TestCls.create?.(userCls);
			return <div className={classes.root?.()}>{children}</div>;
		};

		// Test with no cls prop (uses defaults)
		render(<TestComponent>Default Component</TestComponent>);

		const component = screen.getByText?.("Default Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe(
			"p-4 rounded bg-gray-100 text-gray-900",
		);
	});
});
