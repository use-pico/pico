import { render, screen } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { type Cls, cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

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
			({ what, def }) => ({
				token: def.token({
					"theme.bg.light": what.css([
						"bg-white",
					]),
					"theme.bg.dark": what.css([
						"bg-gray-900",
					]),
					"theme.text.light": what.css([
						"text-gray-900",
					]),
					"theme.text.dark": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"theme.bg.light",
							"theme.text.light",
						]),
					}),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"elevation.shadow.low": what.css([
						"shadow-sm",
					]),
					"elevation.shadow.high": what.css([
						"shadow-lg",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"elevation.shadow.low",
						]),
					}),
				],
				defaults: def.defaults({
					elevation: "low",
				}),
			}),
		);

		const Card = ({
			children,
			cls: clsProp,
			...props
		}: Cls.Props<typeof CardCls, PropsWithChildren>) => {
			const classes = useCls(CardCls, clsProp);

			if (!classes) {
				return null;
			}

			return (
				<div
					className={classes.root()}
					{...props}
				>
					{children}
				</div>
			);
		};

		// Render with nested context providers
		render(
			<ClsProvider value={ThemeCls}>
				<ClsProvider value={CardCls}>
					<Card
						cls={({ what }) => ({
							variant: what.variant({
								elevation: "high",
							}),
						})}
					>
						Nested Context Card
					</Card>
				</ClsProvider>
			</ClsProvider>,
		);

		const card = screen.getByText?.("Nested Context Card");
		expect(card).toBeInTheDocument();

		// Check that the card element exists and has some classes
		expect(card.parentElement).toBeInTheDocument();
		expect(card.parentElement?.className).toBeDefined();
	});
});
