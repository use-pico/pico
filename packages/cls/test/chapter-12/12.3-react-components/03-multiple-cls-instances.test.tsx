import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import { withCls } from "../../../src/react";

describe("12.3 React Components - Multiple Cls Instances", () => {
	it("should handle multiple cls instances correctly", () => {
		// Create first cls instance
		const PrimaryCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.text.primary",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.primary": what.css([
						"bg-blue-600",
					]),
					"color.text.primary": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.primary",
							"color.text.primary",
						]),
					}),
				],
				defaults: def.defaults({
					color: "primary",
				}),
			}),
		);

		// Create second cls instance
		const SecondaryCls = cls(
			{
				tokens: [
					"color.bg.secondary",
					"color.text.secondary",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"secondary",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.secondary": what.css([
						"bg-gray-600",
					]),
					"color.text.secondary": what.css([
						"text-white",
					]),
				}),
				rules: [
					def.root({
						root: what.css([
							"color.bg.secondary",
							"color.text.secondary",
						]),
					}),
				],
				defaults: def.defaults({
					color: "secondary",
				}),
			}),
		);

		// Create a base component
		function Button({ children, ...props }: { children: React.ReactNode }) {
			return (
				<button
					type="button"
					{...props}
				>
					{children}
				</button>
			);
		}

		// Enhance with first cls
		const PrimaryButton = withCls(Button, PrimaryCls);

		// Enhance with second cls
		const SecondaryButton = withCls(Button, SecondaryCls);

		// Render both enhanced components
		render(
			<>
				<PrimaryButton>Primary</PrimaryButton>
				<SecondaryButton>Secondary</SecondaryButton>
			</>,
		);

		// Should render both buttons
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
		expect(buttons[0]).toHaveTextContent("Primary");
		expect(buttons[1]).toHaveTextContent("Secondary");
	});
});
