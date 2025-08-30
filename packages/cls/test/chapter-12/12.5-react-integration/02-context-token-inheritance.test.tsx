import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

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
			({ what, def }) => ({
				token: def.token({
					"color.bg.light": what.css([
						"bg-white",
					]),
					"color.bg.dark": what.css([
						"bg-gray-900",
					]),
					"color.text.light": what.css([
						"text-gray-900",
					]),
					"color.text.dark": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"p-4",
								"rounded",
							],
							[
								"color.bg.light",
								"color.text.light",
							],
						),
					}),
					def.rule(
						{
							theme: "dark",
						},
						{
							root: what.both(
								[
									"p-4",
									"rounded",
								],
								[
									"color.bg.dark",
									"color.text.dark",
								],
							),
						},
					),
				],
				defaults: def.defaults({
					theme: "light",
				}),
			}),
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
			({ what, def }) => ({
				token: def.token({
					"color.accent.blue": what.css([
						"border-blue-500",
					]),
					"color.accent.green": what.css([
						"border-green-500",
					]),
				}),
				rules: [
					def.root({
						root: what.both(
							[
								"p-4",
								"rounded",
							],
							[
								"color.bg.light",
								"color.text.light",
								"color.accent.blue",
							],
						),
					}),
					def.rule(
						{
							theme: "dark",
							accent: "green",
						},
						{
							root: what.both(
								[
									"p-4",
									"rounded",
								],
								[
									"color.bg.dark",
									"color.text.dark",
									"color.accent.green",
								],
							),
						},
					),
				],
				defaults: def.defaults({
					theme: "light",
					accent: "blue",
				}),
			}),
		);

		const TestComponent: FC<{
			variant?: "default" | "highlighted";
		}> = ({ variant = "default" }) => {
			const classes = useCls(ExtendedThemeCls, ({ what }) => ({
				variant: what.variant({
					theme: variant === "highlighted" ? "dark" : "light",
					accent: variant === "highlighted" ? "green" : "blue",
				}),
			}));

			if (!classes) {
				return null;
			}

			return <div className={classes.root()}>Test Component</div>;
		};

		// Render with extended context provider
		render(
			<ClsProvider value={ExtendedThemeCls}>
				<TestComponent variant="highlighted" />
			</ClsProvider>,
		);

		const component = screen.getByText("Test Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe(
			"bg-gray-900 text-white border-green-500 p-4 rounded",
		);
	});
});
