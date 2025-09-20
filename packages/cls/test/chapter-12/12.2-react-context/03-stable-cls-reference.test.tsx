import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useClsContext } from "../../../src/react";

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
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.light",
									"color.text.light",
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
			<ClsContext value={ThemeCls}>
				<TestComponent />
			</ClsContext>,
		);

		// Should show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);

		// Re-render with same provider
		rerender(
			<ClsContext value={ThemeCls}>
				<TestComponent />
			</ClsContext>,
		);

		// Should still show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
