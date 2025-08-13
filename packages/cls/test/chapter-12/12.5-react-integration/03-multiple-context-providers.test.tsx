import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

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

		// Create nested component that uses context
		const NestedComponent: FC = () => {
			const classes = useCls(BaseThemeCls, ({ what }) => ({
				variant: what.variant({
					theme: "dark",
				}),
			}));

			if (!classes) {
				return null;
			}

			return <div className={classes.root()}>Nested Component</div>;
		};

		// Render with nested context providers
		render(
			<ClsProvider value={BaseThemeCls}>
				<div>Outer Context</div>
				<ClsProvider value={BaseThemeCls}>
					<NestedComponent />
				</ClsProvider>
			</ClsProvider>,
		);

		expect(screen.getByText("Outer Context")).toBeInTheDocument();
		expect(screen.getByText("Nested Component")).toBeInTheDocument();

		const nestedComponent = screen.getByText("Nested Component");
		expect(nestedComponent.className).toBe(
			"p-4 rounded bg-gray-900 text-white",
		);
	});
});
