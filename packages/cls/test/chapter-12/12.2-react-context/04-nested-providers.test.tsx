import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useClsContext } from "../../../src/react";

describe("12.2 React Context - Nested Providers", () => {
	it("should handle nested providers correctly", () => {
		const BaseThemeCls = cls(
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

		const ExtendedThemeCls = cls(
			{
				tokens: [
					"color.bg.light",
					"color.bg.dark",
					"color.bg.accent",
					"color.text.light",
					"color.text.dark",
					"color.text.accent",
				],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"light",
						"dark",
						"accent",
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
					"color.bg.accent": {
						class: [
							"bg-blue-500",
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
					"color.text.accent": {
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

		// Render with nested providers
		render(
			<ClsContext value={BaseThemeCls}>
				<ClsContext value={ExtendedThemeCls}>
					<TestComponent />
				</ClsContext>
			</ClsContext>,
		);

		// Should show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
