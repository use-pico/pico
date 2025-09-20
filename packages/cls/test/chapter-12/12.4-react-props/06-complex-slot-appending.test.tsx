import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import type { Cls } from "../../../src";
import { cls } from "../../../src";

describe("12.4 React Props - Complex Slot Appending", () => {
	it("should handle complex slot appending with tokens and classes", () => {
		const ComponentCls = cls(
			{
				tokens: [
					"color.text.primary",
					"color.bg.primary",
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
					"color.text.primary": {
						class: [
							"text-blue-600",
						],
					},
					"color.bg.primary": {
						class: [
							"bg-blue-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.text.primary",
									"color.bg.primary",
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

		const TestComponent: FC<Cls.Props<typeof ComponentCls>> = ({
			tweak: userTweak,
		}) => {
			// Internal config with both CSS and tokens
			const { slots } = ComponentCls.create(
				userTweak, // userConfigFn
				{
					slot: {
						root: {
							class: [
								"internal-css-class",
							],
							token: [
								"color.text.primary",
							],
						},
					},
				}, // internalConfigFn
			);
			return (
				<div
					className={slots.root()}
					data-testid="component"
				/>
			);
		};

		// User provides additional styling
		render(
			<TestComponent
				tweak={{
					slot: {
						root: {
							class: [
								"user-css-class",
							],
							token: [
								"color.bg.primary",
							],
						},
					},
				}}
			/>,
		);

		const component = screen.getByTestId("component");
		expect(component).toBeInTheDocument();

		// Should have: tokens first, then classes (classes override tokens)
		expect(component.className).toBe(
			"text-blue-600 bg-blue-100 internal-css-class user-css-class",
		);
	});
});
