import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useCls } from "../../../src/react";

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
			{
				token: {
					"color.bg.conflict": {
						class: [
							"bg-red-500",
						],
					},
					"color.text.conflict": {
						class: [
							"text-red-100",
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
									"color.bg.conflict",
									"color.text.conflict",
								],
							},
						},
					},
				],
				defaults: {
					theme: "conflict",
				},
			},
		);

		const ConflictComponent: FC = () => {
			const { slots: classes } = useCls(ConflictingThemeCls, {
				variant: {
					theme: "conflict" as const,
				},
			});

			if (!classes) {
				return null;
			}

			return <div className={classes.root()}>Conflict Component</div>;
		};

		// Render with conflicting context provider
		render(
			<ClsContext value={ConflictingThemeCls}>
				<ConflictComponent />
			</ClsContext>,
		);

		const component = screen.getByText("Conflict Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe("bg-red-500 text-red-100 p-4 rounded");
	});
});
