import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.5 React Integration - Multiple Context Providers", () => {
	it("should handle multiple context providers correctly", () => {
		// Create base theme cls instance
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
									"p-4",
									"rounded",
								],
								token: [
									"color.bg.light",
									"color.text.light",
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
									"p-4",
									"rounded",
								],
								token: [
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

		// Create nested component that uses context
		const NestedComponent: FC = () => {
			const { slots } = useCls(BaseThemeCls, {
				variant: {
					theme: "dark",
				},
			});

			if (!slots) {
				return null;
			}

			return <div className={slots.root()}>Nested Component</div>;
		};

		// Render with nested context providers
		render(
			<ClsContext value={BaseThemeCls}>
				<div>Outer Context</div>
				<ClsContext value={BaseThemeCls}>
					<NestedComponent />
				</ClsContext>
			</ClsContext>,
		);

		expect(screen.getByText("Outer Context")).toBeInTheDocument();
		expect(screen.getByText("Nested Component")).toBeInTheDocument();

		const nestedComponent = screen.getByText("Nested Component");
		expect(nestedComponent.className).toBe(
			"bg-gray-900 text-white p-4 rounded",
		);
	});
});
