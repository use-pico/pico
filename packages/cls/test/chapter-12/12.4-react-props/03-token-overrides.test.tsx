import { render, screen } from "@testing-library/react";
import type { FC, PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import type { Cls } from "../../../src";
import { cls } from "../../../src";

describe("12.4 React Props - Token Overrides", () => {
	it("should handle cls prop with token overrides", () => {
		const SimpleCls = cls(
			{
				tokens: [
					"color.bg.primary",
					"color.bg.secondary",
					"color.text.primary",
					"color.text.secondary",
				],
				slot: [
					"root",
				],
				variant: {
					color: [
						"primary",
						"secondary",
					],
				},
			},
			{
				token: {
					"color.bg.primary": {
						class: [
							"bg-blue-600",
						],
					},
					"color.bg.secondary": {
						class: [
							"bg-gray-600",
						],
					},
					"color.text.primary": {
						class: [
							"text-white",
						],
					},
					"color.text.secondary": {
						class: [
							"text-gray-900",
						],
					},
				},
				rules: [
					{
						slot: {
							root: {
								token: [
									"color.bg.primary",
									"color.text.primary",
								],
							},
						},
					},
					{
						match: {
							color: "secondary",
						},
						slot: {
							root: {
								token: [
									"color.bg.secondary",
									"color.text.secondary",
								],
							},
						},
					},
				],
				defaults: {
					color: "primary",
				},
			},
		);

		const SimpleComponent: FC<
			Cls.Props<typeof SimpleCls, PropsWithChildren>
		> = ({ tweak: userTweak, children }) => {
			const { slots: classes } = SimpleCls.create(userTweak);
			return <div className={classes.root()}>{children}</div>;
		};

		// Test with token overrides
		render(
			<SimpleComponent
				tweak={{
					variant: {
						color: "secondary",
					},
				}}
			>
				Simple Component
			</SimpleComponent>,
		);

		const component = screen.getByText?.("Simple Component");
		expect(component).toBeInTheDocument();
		expect(component.className).toBe("bg-gray-600 text-gray-900");
	});
});
