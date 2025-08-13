import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useClsContext } from "../../../src/react";

describe("12.2 React Context - Provide Cls Instance", () => {
	it("should provide cls instance through context", () => {
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
			({ what, def }) => ({
				token: def.token({
					"color.bg.light": what.css([
						"bg-white",
					]),
					"color.bg.dark": what.css([
						"bg-gray-900",
					]),
					"color.text.light": what.css([
						"text-gray-900",
					]),
					"color.text.dark": what.css([
						"text-white",
					]),
					"spacing.padding.sm": what.css([
						"p-2",
					]),
					"spacing.padding.md": what.css([
						"p-4",
					]),
					"spacing.padding.lg": what.css([
						"p-6",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.light",
							"color.text.light",
							"spacing.padding.md",
						]),
					}),
					def.rule(
						{
							theme: "dark",
						},
						{
							root: what.css([
								"color.bg.dark",
								"color.text.dark",
							]),
						},
					),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
		);

		// Test component that uses context
		function TestComponent() {
			const contextCls = useClsContext();
			return (
				<div data-testid="context-test">
					{contextCls ? "Context provided" : "No context"}
				</div>
			);
		}

		// Render with provider
		render(
			<ClsProvider value={ThemeCls}>
				<TestComponent />
			</ClsProvider>,
		);

		// Should show that context is provided
		expect(screen.getByTestId?.("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
