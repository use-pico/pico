import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsProvider, useCls } from "../../../src/react";

describe("12.5 React Integration - Context Token Conflicts", () => {
	it("should handle context token conflicts correctly", () => {
		// Create conflicting theme cls instance
		const ConflictingThemeCls = cls(
			{
				tokens: [
					"color.bg.conflict",
					"color.text.conflict",
				],
				slot: [
					"root",
				],
				variant: {
					theme: [
						"conflict",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.conflict": what.css([
						"bg-red-500",
					]),
					"color.text.conflict": what.css([
						"text-red-100",
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
								"color.bg.conflict",
								"color.text.conflict",
							],
						),
					}),
				],
				defaults: def.defaults({
					theme: "conflict",
				}),
			}),
		);

		const ConflictComponent: FC = () => {
			const classes = useCls(ConflictingThemeCls, ({ what }) => ({
				variant: what.variant({
					theme: "conflict" as const,
				}),
			}));

			if (!classes) {
				return null;
			}

			return <div className={classes.root()}>Conflict Component</div>;
		};

		// Render with conflicting context provider
		render(
			<ClsProvider value={ConflictingThemeCls}>
				<ConflictComponent />
			</ClsProvider>,
		);

		const component = screen.getByText("Conflict Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe("bg-red-500 text-red-100 p-4 rounded");
	});
});
