import { render, screen } from "@testing-library/react";
import type { FC } from "react";
import { describe, expect, it } from "vitest";
import { cls } from "../../../src";
import type { Component } from "../../../src/types";

describe("12.4 React Props - Slot Overrides", () => {
	it("should handle cls prop with slot overrides", () => {
		const CardCls = cls(
			{
				tokens: [
					"color.bg.default",
					"color.bg.highlighted",
					"color.text.default",
					"color.text.highlighted",
					"spacing.padding.sm",
					"spacing.padding.md",
					"spacing.padding.lg",
				],
				slot: [
					"root",
					"header",
					"content",
				],
				variant: {
					theme: [
						"default",
						"highlighted",
					],
					size: [
						"sm",
						"md",
						"lg",
					],
				},
			},
			({ what, def }) => ({
				token: def.token({
					"color.bg.default": [
						"bg-white",
					],
					"color.bg.highlighted": [
						"bg-blue-50",
					],
					"color.text.default": [
						"text-gray-900",
					],
					"color.text.highlighted": [
						"text-blue-900",
					],
					"spacing.padding.sm": [
						"p-2",
					],
					"spacing.padding.md": [
						"p-4",
					],
					"spacing.padding.lg": [
						"p-6",
					],
				}),
				rules: [
					def.root({
						root: what.token([
							"color.bg.default",
							"color.text.default",
							"spacing.padding.md",
						]),
						header: what.both(
							[
								"font-bold",
							],
							[
								"color.text.default",
							],
						),
						content: what.token([
							"color.text.default",
						]),
					}),
					def.rule(
						{
							theme: "highlighted",
						},
						{
							root: what.token([
								"color.bg.highlighted",
								"color.text.highlighted",
							]),
							header: what.both(
								[
									"font-bold",
								],
								[
									"color.text.highlighted",
								],
							),
							content: what.token([
								"color.text.highlighted",
							]),
						},
					),
					def.rule(
						{
							size: "sm",
						},
						{
							root: what.token([
								"spacing.padding.sm",
							]),
						},
					),
					def.rule(
						{
							size: "lg",
						},
						{
							root: what.token([
								"spacing.padding.lg",
							]),
						},
					),
				],
				defaults: def.defaults({
					theme: "default",
					size: "md",
				}),
			}),
		);

		const Card: FC<
			Component<typeof CardCls> & {
				title: string;
				children: string;
			}
		> = ({ cls: userCls, title, children }) => {
			const classes = CardCls.create(userCls);
			return (
				<div className={classes.root()}>
					<h3 className={classes.header()}>{title}</h3>
					<div className={classes.content()}>{children}</div>
				</div>
			);
		};

		// Test with slot-specific overrides
		render(
			<Card
				cls={({ what }) => ({
					variant: what.variant({
						theme: "highlighted" as const,
						size: "lg" as const,
					}),
				})}
				title="Test Card"
			>
				Card content
			</Card>,
		);

		const card = screen.getByText?.("Test Card").closest("div");
		expect(card).toBeInTheDocument();
		expect(screen.getByText?.("Card content")).toBeInTheDocument();
	});
});
