import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useClsContext } from "../../../src/react";

describe("12.2 React Context - Nested Providers", () => {
	it("should handle nested providers correctly", () => {
		const BaseThemeCls = cls(
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

		const ExtendedThemeCls = cls(
			{
				tokens: {
					"color.bg": [
						"light",
						"dark",
						"accent",
					],
					"color.text": [
						"light",
						"dark",
						"accent",
					],
				},
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
			({ what, def }) => ({
				token: def.token({
					"color.bg": {
						light: [
							"bg-white",
						],
						dark: [
							"bg-gray-900",
						],
						accent: [
							"bg-blue-500",
						],
					},
					"color.text": {
						light: [
							"text-gray-900",
						],
						dark: [
							"text-white",
						],
						accent: [
							"text-white",
						],
					},
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

		// Render with nested providers
		render(
			<ClsProvider value={BaseThemeCls}>
				<ClsProvider value={ExtendedThemeCls}>
					<TestComponent />
				</ClsProvider>
			</ClsProvider>,
		);

		// Should show that context is provided
		expect(screen.getByTestId("context-test")).toHaveTextContent(
			"Context provided",
		);
	});
});
