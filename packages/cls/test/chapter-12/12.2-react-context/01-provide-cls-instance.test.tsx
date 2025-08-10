import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useClsContext } from "../../../src/react";

describe("12.2 React Context - Provide Cls Instance", () => {
	it("should provide cls instance through context", () => {
		const ThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"light",
						"dark",
					],
					"color.text": [
						"light",
						"dark",
					],
					"spacing.padding": [
						"sm",
						"md",
						"lg",
					],
				},
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
					"color.bg": {
						light: [
							"bg-white",
						],
						dark: [
							"bg-gray-900",
						],
					},
					"color.text": {
						light: [
							"text-gray-900",
						],
						dark: [
							"text-white",
						],
					},
					"spacing.padding": {
						sm: [
							"p-2",
						],
						md: [
							"p-4",
						],
						lg: [
							"p-6",
						],
					},
				}),
				rules: [
					def.root({
						root: what.token([
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
							root: what.token([
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
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
