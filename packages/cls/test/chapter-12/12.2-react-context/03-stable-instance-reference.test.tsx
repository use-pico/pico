import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { ClsContext, useClsContext } from "../../../src/react";

describe("12.2 React Context - ClsProvider - Stable Instance Reference", () => {
	it("should provide stable cls instance reference", () => {
		const SimpleCls = cls(
			{
				tokens: [
					"color.bg.default",
				],
				slot: [
					"root",
				],
				variant: {},
			},
			{
				token: {
					"color.bg.default": {
						class: [
							"bg-gray-100",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								class: [
									"color.bg.default",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		// Test component that checks context reference
		function TestComponent() {
			const contextCls = useClsContext();
			return (
				<div data-testid="reference-test">
					{contextCls === SimpleCls
						? "Same reference"
						: "Different reference"}
				</div>
			);
		}

		// Render with provider
		render(
			<ClsContext value={SimpleCls}>
				<TestComponent />
			</ClsContext>,
		);

		// Should have same reference
		expect(screen.getByTestId?.("reference-test")).toHaveTextContent(
			"Same reference",
		);
	});
});
