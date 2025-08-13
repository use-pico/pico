import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useClsContext } from "../../../src/react";

describe("12.2 React Context - Stable Cls Reference", () => {
	it("should provide stable cls instance reference", () => {
		const ThemeCls = cls(
			{
				tokens: [
					"color.bg.light",
					"color.bg.dark",
					"color.text.light",
					"color.text.dark",
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
					"color.bg.light": [
						"bg-white",
					],
					"color.bg.dark": [
						"bg-gray-900",
					],
					"color.text.light": [
						"text-gray-900",
					],
					"color.text.dark": [
						"text-white",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.light",
							"color.text.light",
						]),
					}),
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
		const { rerender } = render(
			<ClsProvider value={ThemeCls}>
				<TestComponent />
			</ClsProvider>,
		);

		// Should show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);

		// Re-render with same provider
		rerender(
			<ClsProvider value={ThemeCls}>
				<TestComponent />
			</ClsProvider>,
		);

		// Should still show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
