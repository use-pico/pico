import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.5 React Integration - Context Token Inheritance", () => {
	it("should handle context token inheritance correctly", () => {
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

		// Create extended theme cls instance
		const ExtendedThemeCls = BaseThemeCls.extend(
			{
				tokens: [
					"color.accent.blue",
					"color.accent.green",
				],
				slot: [
					"root",
				],
				variant: {
					accent: [
						"blue",
						"green",
					],
				},
			},
			{
				token: {
					"color.accent.blue": {
						class: [
							"border-blue-500",
						],
					},
					"color.accent.green": {
						class: [
							"border-green-500",
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
									"color.accent.blue",
								],
							},
						},
					},
					{
						match: {
							theme: "dark",
							accent: "green",
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
									"color.accent.green",
								],
							},
						},
					},
				],
				defaults: {
					theme: "light",
					accent: "blue",
				},
			},
		);

		const TestComponent: FC<{
			variant?: "default" | "highlighted";
		}> = ({ variant = "default" }) => {
			const { slots: classes } = useCls(ExtendedThemeCls, {
				variant: {
					theme: variant === "highlighted" ? "dark" : "light",
					accent: variant === "highlighted" ? "green" : "blue",
				},
			});

			if (!classes) {
				return null;
			}

			return <div className={classes.root()}>Test Component</div>;
		};

		// Render with extended context provider
		render(
			<ClsContext value={ExtendedThemeCls}>
				<TestComponent variant="highlighted" />
			</ClsContext>,
		);

		const component = screen.getByText("Test Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe(
			"bg-gray-900 text-white border-green-500 p-4 rounded",
		);
	});
});
