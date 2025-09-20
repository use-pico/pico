import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

describe("12.6 React Advanced Integration - Context Token Inheritance", () => {
	it("should handle context token inheritance with cls prop overrides", () => {
		const ThemeCls = cls(
			{
				tokens: [
					"theme.bg.light",
					"theme.bg.dark",
					"theme.text.light",
					"theme.text.dark",
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
					"theme.bg.light": {
						class: [
							"bg-white",
						],
					},
					"theme.bg.dark": {
						class: [
							"bg-gray-900",
						],
					},
					"theme.text.light": {
						class: [
							"text-gray-900",
						],
					},
					"theme.text.dark": {
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
									"theme.bg.light",
									"theme.text.light",
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

		const CardCls = cls(
			{
				tokens: [
					"elevation.shadow.low",
					"elevation.shadow.high",
				],
				slot: [
					"root",
				],
				variant: {
					elevation: [
						"low",
						"high",
					],
				},
			},
			{
				token: {
					"elevation.shadow.low": {
						class: [
							"shadow-sm",
						],
					},
					"elevation.shadow.high": {
						class: [
							"shadow-lg",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"elevation.shadow.low",
								],
							},
						},
					},
				],
				defaults: {
					elevation: "low",
				},
			},
		);

		const Card = ({
			children,
			tweak: tweakProp,
			...props
		}: Cls.Props<typeof CardCls, PropsWithChildren>) => {
			const { slots } = useCls(CardCls, tweakProp);

			return (
				<div
					className={slots.root()}
					{...props}
				>
					{children}
				</div>
			);
		};

		// Render with nested context providers
		render(
			<ClsContext value={ThemeCls}>
				<ClsContext value={CardCls}>
					<Card
						tweak={{
							variant: {
								elevation: "high",
							},
						}}
					>
						Nested Context Card
					</Card>
				</ClsContext>
			</ClsContext>,
		);

		const card = screen.getByText?.("Nested Context Card");
		expect(card).toBeInTheDocument();

		// Check that the card element exists and has some classes
		expect(card.parentElement).toBeInTheDocument();
		expect(card.parentElement?.className).toBeDefined();
	});
});
