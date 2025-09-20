import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useClsContext } from "../../../src/react";

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
					"spacing.padding.sm": {
						class: [
							"p-2",
						],
					},
					"spacing.padding.md": {
						class: [
							"p-4",
						],
					},
					"spacing.padding.lg": {
						class: [
							"p-6",
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
									"spacing.padding.md",
								],
							},
						},
					},
					{
						match: {
							theme: "dark",
						},
						slot: {
							root: {
								class: [
									"color.bg.dark",
									"color.text.dark",
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
		render(
			<ClsContext value={ThemeCls}>
				<TestComponent />
			</ClsContext>,
		);

		// Should show that context is provided
		expect(screen.getByTestId?.("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
